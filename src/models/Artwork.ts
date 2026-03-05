import mongoose, { Schema, Document } from 'mongoose';

export interface IArtwork extends Document {
    src: string;
    artistName: string; // Redundant but helpful for quick display
    talentId: mongoose.Types.ObjectId;
    title: string;
}

const ArtworkSchema: Schema = new Schema({
    src: { type: String, required: true },
    artistName: { type: String, required: true },
    talentId: { type: Schema.Types.ObjectId, ref: 'Talent', required: true },
    title: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Artwork || mongoose.model<IArtwork>('Artwork', ArtworkSchema);
