import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
    heroBackground: {
        type: 'image' | 'video';
        src: string;
    };
    servicesHeaderImage?: string;
    creativesVisualImage?: string;
    creativesSonicImage?: string;
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
    servicesHeaderImage: {
        type: String,
        default: ''
    },
    creativesVisualImage: {
        type: String,
        default: ''
    },
    creativesSonicImage: {
        type: String,
        default: ''
    }
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
