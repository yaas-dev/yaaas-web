import mongoose, { Schema, Document } from 'mongoose';

export interface IArtwork extends Document {
    src: string;
    artistName: string; // Redundant but helpful for quick display
    talentId: mongoose.Types.ObjectId;
    title: string;
    medium: 'painting' | 'photography' | 'sculpture' | 'release' | 'event';
}

const ArtworkSchema: Schema = new Schema({
    src: { type: String, required: true },
    artistName: { type: String, required: true },
    talentId: { type: Schema.Types.ObjectId, ref: 'Talent', required: true },
    title: { type: String, required: true },
    medium: {
        type: String,
        enum: ['painting', 'photography', 'sculpture', 'release', 'event'],
        required: true,
        default: 'painting'
    },
}, { timestamps: true });

// Check if the model exists and delete it to force reload with new schema in development
if (mongoose.models && mongoose.models.Artwork) {
    delete (mongoose as any).models.Artwork;
}

export default mongoose.model<IArtwork>('Artwork', ArtworkSchema);
