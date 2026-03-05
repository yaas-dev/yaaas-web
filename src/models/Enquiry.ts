import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, default: 'General Enquiry' },
    message: { type: String, required: true },
    type: {
        type: String,
        enum: ['CONTACT', 'ENQUIRY'],
        default: 'CONTACT'
    },
    metadata: {
        artworkId: { type: String },
        artworkTitle: { type: String },
        artistName: { type: String },
        country: { type: String },
    },
    status: {
        type: String,
        enum: ['NEW', 'READ', 'ARCHIVED'],
        default: 'NEW'
    },
}, { timestamps: true });

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
