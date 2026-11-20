import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';

export async function POST(request: NextRequest) {
    const token = process.env.BREVO_WEBHOOK_TOKEN;
    const authorization = request.headers.get('authorization');
    if (!token || authorization !== `Bearer ${token}`) {
        return NextResponse.json({ success: false }, { status: 401 });
    }

    try {
        const payload = await request.json();
        const events = Array.isArray(payload) ? payload : [payload];
        await dbConnect();

        let updated = 0;
        for (const event of events) {
            if (event?.event !== 'unsubscribed' || typeof event?.email !== 'string') continue;
            const email = event.email.trim().toLowerCase();
            if (!email) continue;

            const result = await NewsletterSubscriber.updateOne(
                { email },
                { $set: { status: 'UNSUBSCRIBED', unsubscribedAt: new Date() } }
            );
            if (result.modifiedCount > 0) updated += 1;
        }

        return NextResponse.json({ success: true, updated });
    } catch (error) {
        console.error('Brevo newsletter webhook failed:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
