import React from 'react';
import { getArtworks } from '@/actions/catalogueActions';
import CatalogueClient from '@/components/catalogue/CatalogueClient';

export default async function CataloguePage() {
    // Fetch live artworks from MongoDB
    const artworks = await getArtworks();

    return (
        <CatalogueClient initialArtworks={artworks} />
    );
}