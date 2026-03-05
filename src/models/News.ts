import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
    title: string;
    date: string;
    image: string;
    contentBlurb: string;
    fullContent: string;
    category: string;
}

const NewsSchema: Schema = new Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    contentBlurb: { type: String, required: true },
    fullContent: { type: String, required: true },
    category: { type: String, default: 'NEWS' },
}, { timestamps: true });

export default mongoose.models.News || mongoose.model<INews>('News', NewsSchema);
