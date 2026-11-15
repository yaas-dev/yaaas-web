import type { Metadata } from "next";

export const metadata: Metadata = { title: "African Art Catalogue — Contemporary Artworks", description: "Explore contemporary African art and discover original paintings, photography, sculpture and works by artists represented by YAAAS.", alternates: { canonical: "/catalogue" } };

import React from 'react';
import { getArtworks } from '@/actions/catalogueActions';
import { getTalentBySlug } from '@/actions/talentActions';
import CatalogueClient from '@/components/catalogue/CatalogueClient';

export default async function CataloguePage({ searchParams }: { searchParams: Promise<{ artist?: string }> }) {
    const [{ artist: artistSlug }, artworks] = await Promise.all([searchParams, getArtworks()]);
    const artist = artistSlug ? await getTalentBySlug(artistSlug.toLowerCase()) : null;

    return (
        <CatalogueClient initialArtworks={artworks} initialArtistName={artist?.name || ''} />
    );
}