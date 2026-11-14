import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import NewsletterSubscriber from '@/models/NewsletterSubscriber';

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
        const status = subscriber ? 'success' : 'inactive';
        return NextResponse.redirect(new URL(`/newsletter/unsubscribe?status=${status}`, request.url));
    } catch (error) {
        console.error('Newsletter unsubscribe failed:', error);
        return NextResponse.redirect(new URL('/newsletter/unsubscribe?status=error', request.url));
    }
}
