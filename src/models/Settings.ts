import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
    heroBackground: {
        type: 'image' | 'video';
        src: string;
    };
    servicesHeaderImage?: string;
    creativesVisualImage?: string;
    creativesSonicImage?: string;
    homepageContent?: Record<string, string>;
    newsletter?: {
        enabled: boolean;
        eyebrow: string;
        heading: string;
        description: string;
        buttonText: string;
        image: string;
        delaySeconds: number;
        dismissalDays: number;
        consentText: string;
        footerText: string;
    };
}

const SettingsSchema: Schema = new Schema({
    heroBackground: {
        type: {
            type: String,
            enum: ['image', 'video'],
            default: 'image'
        },
        src: {
            type: String,
            default: '/images/hero.png'
        }
    },
    servicesHeaderImage: { type: String, default: '' },
    creativesVisualImage: { type: String, default: '' },
    creativesSonicImage: { type: String, default: '' },
    homepageContent: {
        type: Schema.Types.Mixed,
        default: {}
    },
    newsletter: {
        enabled: { type: Boolean, default: true },
        eyebrow: { type: String, default: 'THE YAAAS EDIT' },
        heading: { type: String, default: 'Stay close to African creativity.' },
        description: { type: String, default: "A little of what we're seeing, making and bringing together. Discover artists, exhibitions, projects and ideas from across Africa and its diaspora." },
        buttonText: { type: String, default: 'Count me in' },
        image: { type: String, default: '' },
        delaySeconds: { type: Number, default: 10 },
        dismissalDays: { type: Number, default: 30 },
        consentText: { type: String, default: 'By subscribing, you agree to receive occasional updates from YAAAS. Unsubscribe anytime.' },
        footerText: { type: String, default: 'NOISE FROM THE CONTINENT. STRAIGHT TO YOUR INBOX.' },
    },
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
