import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
    title: string;
    description: string;
    image: string;
    number: string;
    slug?: string;
}

const ServiceSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    number: { type: String },
    slug: { type: String },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);
