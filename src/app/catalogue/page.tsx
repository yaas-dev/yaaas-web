import type { Metadata } from "next";

export const metadata: Metadata = { title: "African Art Catalogue — Contemporary Artworks", description: "Explore contemporary African art and discover original paintings, photography, sculpture and works by artists represented by YAAAS.", alternates: { canonical: "/catalogue" } };

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