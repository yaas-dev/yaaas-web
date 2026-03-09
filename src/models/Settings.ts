import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
    heroBackground: {
        type: 'image' | 'video';
        src: string;
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
    }
}, { timestamps: true });

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema);
