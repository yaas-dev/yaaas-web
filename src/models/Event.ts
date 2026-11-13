import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
    title: string;
    date: string;
    location: string;
    description: string;
    image: string;
    link: string;
    published: boolean;
}

const EventSchema: Schema = new Schema({
    title: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    location: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    link: { type: String, default: '' },
    published: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);
