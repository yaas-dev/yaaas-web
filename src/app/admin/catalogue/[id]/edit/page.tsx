import React, { use } from 'react';
import ArtworkForm from '@/components/admin/ArtworkForm';
import dbConnect from '@/lib/mongodb';
import Artwork from '@/models/Artwork';
import { notFound } from 'next/navigation';

async function getArtwork(id: string) {
    await dbConnect();
    const artwork = await Artwork.findById(id);
    if (!artwork) return null;
    return JSON.parse(JSON.stringify(artwork));
}

export default function EditArtworkPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const artwork = use(getArtwork(unwrappedParams.id));

    if (!artwork) {
        notFound();
    }

    return <ArtworkForm initialData={artwork} />;
}
