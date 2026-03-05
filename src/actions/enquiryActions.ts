'use server';

import dbConnect from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import nodemailer from 'nodemailer';
import { revalidatePath } from 'next/cache';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function submitEnquiry(formData: any) {
    try {
        await dbConnect();

        const { name, email, subject, message, type, metadata } = formData;

        // 1. Save to Database
        const enquiry = await Enquiry.create({
            name,
            email,
            subject: subject || 'General Enquiry',
            message,
            type: type || 'CONTACT',
            metadata: metadata || {},
            status: 'NEW'
        });

        // 2. Send Email Notification if SMTP configured
        if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
            try {
                await transporter.sendMail({
                    from: `"YAAAS Notifications" <${process.env.SMTP_USER}>`,
                    to: process.env.ADMIN_NOTIFICATION_EMAIL || process.env.SMTP_USER,
                    replyTo: email,
                    subject: `New ${type === 'ENQUIRY' ? 'Artwork Enquiry' : 'Contact Message'}: ${subject || name}`,
                    text: `New message from ${name} (${email})\nSubject: ${subject || 'N/A'}\nMessage: ${message}`,
                    html: `
                        <div style="font-family: sans-serif; padding: 20px; color: #333;">
                            <h2 style="color: #B59431;">New Message from YAAAS Website</h2>
                            <p><strong>Type:</strong> ${type}</p>
                            <p><strong>From:</strong> ${name} (${email})</p>
                            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
                            <p><strong>Message:</strong></p>
                            <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #B59431;">
                                ${message.replace(/\n/g, '<br/>')}
                            </div>
                            ${metadata?.artworkId ? `
                                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                                    <p><strong>Artwork Details:</strong></p>
                                    <p>Title: ${metadata.artworkTitle}</p>
                                    <p>Artist: ${metadata.artistName}</p>
                                </div>
                            ` : ''}
                        </div>
                    `
                });
            } catch (emailError) {
                console.error('Failed to send email notification:', emailError);
                // We still returned success because the DB part worked
            }
        }

        revalidatePath('/admin/enquiries');
        return { success: true, id: enquiry._id };
    } catch (error: any) {
        console.error('Error submitting enquiry:', error);
        return { success: false, error: error.message };
    }
}

export async function getEnquiries() {
    try {
        await dbConnect();
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(enquiries));
    } catch (error) {
        console.error('Error fetching enquiries:', error);
        return [];
    }
}

export async function updateEnquiryStatus(id: string, status: string) {
    try {
        await dbConnect();
        await Enquiry.findByIdAndUpdate(id, { status });
        revalidatePath('/admin/enquiries');
        return { success: true };
    } catch (error) {
        console.error('Error updating enquiry status:', error);
        return { success: false };
    }
}

export async function deleteEnquiry(id: string) {
    try {
        await dbConnect();
        await Enquiry.findByIdAndDelete(id);
        revalidatePath('/admin/enquiries');
        return { success: true };
    } catch (error) {
        console.error('Error deleting enquiry:', error);
        return { success: false };
    }
}
