import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';
import { syncBrevoContact } from '@/lib/brevo';

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token');
    if (!token || !/^[a-f0-9]{48}$/.test(token)) {
        return NextResponse.redirect(new URL('/newsletter/unsubscribe?status=invalid', request.url));
    }

    try {
        await dbConnect();
        const subscriber = await NewsletterSubscriber.findOneAndUpdate(
            { unsubscribeToken: token, status: 'SUBSCRIBED' },
            { status: 'UNSUBSCRIBED', unsubscribedAt: new Date() },
            { new: true }
        );
        if (subscriber) {
            try {
                const sync = await syncBrevoContact({ email: subscriber.email, firstName: subscriber.firstName, status: 'UNSUBSCRIBED', unsubscribedAt: subscriber.unsubscribedAt });
                await NewsletterSubscriber.updateOne({ _id: subscriber._id }, { $set: { brevoSyncStatus: sync.configured ? 'SYNCED' : 'NOT_CONFIGURED', brevoSyncedAt: sync.configured ? new Date() : undefined, brevoSyncError: '' } });
            } catch (syncError: any) {
                await NewsletterSubscriber.updateOne({ _id: subscriber._id }, { $set: { brevoSyncStatus: 'ERROR', brevoSyncError: String(syncError?.message || 'Brevo sync failed').slice(0, 500) } });
                console.error('Brevo unsubscribe sync failed:', syncError);
            }
        }
        const status = subscriber ? 'success' : 'inactive';
        return NextResponse.redirect(new URL(`/newsletter/unsubscribe?status=${status}`, request.url));
    } catch (error) {
        console.error('Newsletter unsubscribe failed:', error);
        return NextResponse.redirect(new URL('/newsletter/unsubscribe?status=error', request.url));
    }
}
