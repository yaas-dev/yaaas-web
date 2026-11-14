import mongoose, { Schema } from 'mongoose';

const NewsletterSubscriberSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
    firstName: { type: String, trim: true, maxlength: 80, default: '' },
    status: { type: String, enum: ['SUBSCRIBED', 'UNSUBSCRIBED'], default: 'SUBSCRIBED', index: true },
    consent: { type: Boolean, required: true, default: false },
    consentedAt: { type: Date },
    unsubscribedAt: { type: Date },
    source: { type: String, default: 'website_popup' },
    unsubscribeToken: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.models.NewsletterSubscriber || mongoose.model('NewsletterSubscriber', NewsletterSubscriberSchema);
