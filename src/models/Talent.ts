import mongoose, { Schema, Document } from 'mongoose';

export interface ITalent extends Document {
    slug: string;
    name: string;
    type: string; // e.g., '[ THE VISUAL ]' or '[ THE SONIC ]'
    category: 'VISUAL' | 'SONIC';
    headshot: string;
    bio: string[];
    socials: {
        x?: string;
        instagram?: string;
        linkedin?: string;
        website?: string;
    };
    musicLinks?: {
        platform: string;
        url: string;
    }[];
}

const TalentSchema: Schema = new Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, enum: ['VISUAL', 'SONIC'], required: true },
    headshot: { type: String, required: true },
    bio: [{ type: String }],
    socials: {
        x: { type: String },
        instagram: { type: String },
        linkedin: { type: String },
        website: { type: String },
    },
    musicLinks: [{
        platform: { type: String },
        url: { type: String }
    }],
}, { timestamps: true });

// Check if the model exists and delete it to force reload with new schema in development
if (mongoose.models && mongoose.models.Talent) {
    delete (mongoose as any).models.Talent;
}

export default mongoose.model<ITalent>('Talent', TalentSchema);
