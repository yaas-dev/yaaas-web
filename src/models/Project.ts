import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    title: string;
    category: string;
    description: string;
    mainImage: string;
    galleryImages: string[];
    date: string;
    details: string[];
    featuredOnServices?: boolean;
}

const ProjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    mainImage: { type: String, required: true },
    galleryImages: [{ type: String }],
    date: { type: String },
    details: [{ type: String }],
    featuredOnServices: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
