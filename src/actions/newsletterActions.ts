'use server';

import { randomBytes } from 'crypto';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';
import Settings from '@/models/Settings';
import { revalidatePath } from 'next/cache';

export const DEFAULT_NEWSLETTER_SETTINGS = {
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

export async function subscribeToNewsletter(input: { email?: string; firstName?: string; consent?: boolean; website?: string }) {
    try {
        // Honeypot field: real visitors leave this blank.
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
        const existing = await NewsletterSubscriber.findOne({ email });
        if (existing?.status === 'SUBSCRIBED') return { success: true, alreadySubscribed: true };

        const now = new Date();
        if (existing) {
            existing.firstName = firstName || existing.firstName;
            existing.status = 'SUBSCRIBED';
            existing.consent = true;
            existing.consentedAt = now;
            existing.unsubscribedAt = undefined;
            await existing.save();
        } else {
            await NewsletterSubscriber.create({
                email,
                firstName,
                status: 'SUBSCRIBED',
                consent: true,
                consentedAt: now,
                source: 'website_popup',
                unsubscribeToken: randomBytes(24).toString('hex'),
            });
        }

        revalidatePath('/admin/newsletter');
        return { success: true };
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
        await NewsletterSubscriber.findByIdAndUpdate(id, {
            status,
            unsubscribedAt: status === 'UNSUBSCRIBED' ? new Date() : null,
        });
        revalidatePath('/admin/newsletter');
        return { success: true };
    } catch (error) {
        console.error('Error updating subscriber:', error);
        return { success: false, error: 'Could not update subscriber.' };
    }
}
