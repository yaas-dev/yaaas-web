import mongoose, { Schema, Document } from 'mongoose';

export interface ICollaboration extends Document {
    title: string;
    description: string;
    images: string[];
}

const CollaborationSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Collaboration || mongoose.model<ICollaboration>('Collaboration', CollaborationSchema);
