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
}, { timestamps: true });

export default mongoose.models.Talent || mongoose.model<ITalent>('Talent', TalentSchema);
