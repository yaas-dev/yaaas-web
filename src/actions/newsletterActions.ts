'use server';

import { randomBytes } from 'crypto';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';
import Settings from '@/models/Settings';
import { revalidatePath } from 'next/cache';
import { registerBrevoUnsubscribeWebhook, syncBrevoContact, verifyBrevoConnection } from '@/lib/brevo';

const DEFAULT_NEWSLETTER_SETTINGS = {
    enabled: true,
    eyebrow: 'THE YAAAS EDIT',
    heading: 'Stay close to African creativity.',
    description: "A little of what we're seeing, making and bringing together. Discover artists, exhibitions, projects and ideas from across Africa and its diaspora.",
    buttonText: 'Count me in',
    image: '',
    delaySeconds: 10,
    dismissalDays: 30,
    consentText: 'By subscribing, you agree to receive occasional updates from YAAAS. Unsubscribe anytime.',
    footerText: 'NOISE FROM THE CONTINENT. STRAIGHT TO YOUR INBOX.',
};

function cleanNewsletterSettings(input: any) {
    const defaults = DEFAULT_NEWSLETTER_SETTINGS;
    const text = (value: unknown, fallback: string, max: number) =>
        typeof value === 'string' ? value.trim().slice(0, max) : fallback;

    return {
        enabled: input?.enabled === true,
        eyebrow: text(input?.eyebrow, defaults.eyebrow, 80),
        heading: text(input?.heading, defaults.heading, 140),
        description: text(input?.description, defaults.description, 500),
        buttonText: text(input?.buttonText, defaults.buttonText, 50),
        image: text(input?.image, defaults.image, 1000),
        delaySeconds: Math.min(60, Math.max(5, Number(input?.delaySeconds) || defaults.delaySeconds)),
        dismissalDays: input?.dismissalDays === 0 ? 0 : [7, 14, 30].includes(Number(input?.dismissalDays)) ? Number(input.dismissalDays) : defaults.dismissalDays,
        consentText: text(input?.consentText, defaults.consentText, 300),
        footerText: text(input?.footerText, defaults.footerText, 120),
    };
}

export async function getNewsletterSettings() {
    await dbConnect();
    const settings = await Settings.findOne({}).select('newsletter').lean();
    return { ...DEFAULT_NEWSLETTER_SETTINGS, ...(settings as any)?.newsletter };
}

export async function updateNewsletterSettings(input: any) {
    const session = await auth();
    if (!session?.user) return { success: false, error: 'Unauthorized' };

    try {
        await dbConnect();
        const newsletter = cleanNewsletterSettings(input);
        await Settings.findOneAndUpdate({}, { $set: { newsletter } }, { upsert: true, new: true, setDefaultsOnInsert: true });
        revalidatePath('/');
        revalidatePath('/admin/newsletter');
        return { success: true };
    } catch (error) {
        console.error('Error updating newsletter settings:', error);
        return { success: false, error: 'Could not save newsletter settings.' };
    }
}

async function syncSubscriberToBrevo(subscriber: any, allowResubscribe = false) {
    try {
        const result = await syncBrevoContact({
            email: subscriber.email,
            firstName: subscriber.firstName,
            status: subscriber.status,
            subscribedAt: subscriber.consentedAt,
            unsubscribedAt: subscriber.unsubscribedAt,
            allowResubscribe,
        });
        await NewsletterSubscriber.updateOne(
            { _id: subscriber._id },
            { $set: {
                brevoSyncStatus: result.configured ? 'SYNCED' : 'NOT_CONFIGURED',
                brevoSyncedAt: result.configured ? new Date() : undefined,
                brevoSyncError: '',
            } }
        );
        return result;
    } catch (error: any) {
        await NewsletterSubscriber.updateOne(
            { _id: subscriber._id },
            { $set: {
                brevoSyncStatus: 'ERROR',
                brevoSyncError: String(error?.message || 'Brevo sync failed').slice(0, 500),
            } }
        );
        console.error('Brevo newsletter sync failed:', error);
        return { configured: true, synced: false };
    }
}

export async function subscribeToNewsletter(input: { email?: string; firstName?: string; consent?: boolean; website?: string }) {
    try {
        if (input.website) return { success: true };
        const email = String(input.email || '').trim().toLowerCase();
        const firstName = String(input.firstName || '').trim().slice(0, 80);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
            return { success: false, error: 'Please enter a valid email address.' };
        }
        if (input.consent !== true) {
            return { success: false, error: 'Please confirm that you agree to receive YAAAS updates.' };
        }

        await dbConnect();
        let subscriber = await NewsletterSubscriber.findOne({ email });
        const alreadySubscribed = subscriber?.status === 'SUBSCRIBED';
        const now = new Date();

        if (subscriber) {
            if (subscriber.status !== 'SUBSCRIBED') {
                subscriber.firstName = firstName || subscriber.firstName;
                subscriber.status = 'SUBSCRIBED';
                subscriber.consent = true;
                subscriber.consentedAt = now;
                subscriber.unsubscribedAt = undefined;
                await subscriber.save();
            }
        } else {
            subscriber = await NewsletterSubscriber.create({
                email,
                firstName,
                status: 'SUBSCRIBED',
                consent: true,
                consentedAt: now,
                source: 'website_popup',
                unsubscribeToken: randomBytes(24).toString('hex'),
            });
        }

        await syncSubscriberToBrevo(subscriber, !alreadySubscribed);
        revalidatePath('/admin/newsletter');
        return { success: true, alreadySubscribed };
    } catch (error: any) {
        if (error?.code === 11000) return { success: true, alreadySubscribed: true };
        console.error('Error subscribing to newsletter:', error);
        return { success: false, error: 'Something went wrong. Please try again.' };
    }
}

export async function getNewsletterSubscribers() {
    const session = await auth();
    if (!session?.user) return [];

    try {
        await dbConnect();
        const subscribers = await NewsletterSubscriber.find({})
            .sort({ createdAt: -1 })
            .select('email firstName status consentedAt unsubscribedAt source unsubscribeToken createdAt')
            .lean();
        return JSON.parse(JSON.stringify(subscribers));
    } catch (error) {
        console.error('Error fetching newsletter subscribers:', error);
        return [];
    }
}

export async function setNewsletterSubscriberStatus(id: string, status: 'SUBSCRIBED' | 'UNSUBSCRIBED') {
    const session = await auth();
    if (!session?.user) return { success: false, error: 'Unauthorized' };
    if (!['SUBSCRIBED', 'UNSUBSCRIBED'].includes(status)) return { success: false, error: 'Invalid status' };

    try {
        await dbConnect();
        const subscriber = await NewsletterSubscriber.findById(id);
        if (!subscriber) return { success: false, error: 'Subscriber not found.' };
        subscriber.status = status;
        subscriber.unsubscribedAt = status === 'UNSUBSCRIBED' ? new Date() : undefined;
        if (status === 'SUBSCRIBED') {
            subscriber.consent = true;
            subscriber.consentedAt = new Date();
        }
        await subscriber.save();
        await syncSubscriberToBrevo(subscriber, status === 'SUBSCRIBED');
        revalidatePath('/admin/newsletter');
        return { success: true };
    } catch (error) {
        console.error('Error updating subscriber:', error);
        return { success: false, error: 'Could not update subscriber.' };
    }
}

export async function connectBrevoAndSyncSubscribers() {
    const session = await auth();
    if (!session?.user) return { success: false, error: 'Unauthorized' };

    try {
        if (!process.env.BREVO_API_KEY || !process.env.BREVO_LIST_ID) {
            return { success: false, error: 'Please add BREVO_API_KEY and BREVO_LIST_ID to Vercel environment variables first.' };
        }

        // Verify the API key and target list independently of webhook configuration.
        const list = await verifyBrevoConnection();
        await dbConnect();
        const subscribers = await NewsletterSubscriber.find({}).sort({ createdAt: 1 });
        let synced = 0;
        let failed = 0;

        for (const subscriber of subscribers) {
            const result = await syncSubscriberToBrevo(subscriber);
            if (result.synced) synced += 1;
            else if (result.configured) failed += 1;
        }

        // A webhook problem must never prevent the contact import/sync from completing.
        let webhookWarning = '';
        try {
            await registerBrevoUnsubscribeWebhook();
        } catch (error: any) {
            webhookWarning = String(error?.message || 'Could not configure the Brevo unsubscribe webhook.').slice(0, 400);
            console.warn('Brevo contact sync completed, but unsubscribe webhook setup needs attention:', error);
        }

        revalidatePath('/admin/newsletter');
        return { success: true, synced, failed, total: subscribers.length, listName: list.name, webhookWarning };
    } catch (error: any) {
        console.error('Brevo connection failed:', error);
        return { success: false, error: String(error?.message || 'Could not connect Brevo.') };
    }
}
