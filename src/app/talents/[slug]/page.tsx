import React, { use } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTalentBySlug } from '@/actions/talentActions';
import TalentProfileClient from '@/components/talents/TalentProfileClient';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const artist = await getTalentBySlug(slug.toLowerCase());
    if (!artist) return { title: 'Artist not found', robots: { index: false, follow: false } };

    const bio = Array.isArray(artist.bio) ? artist.bio.join(' ') : '';
    const description = bio.replace(/\s+/g, ' ').slice(0, 155) ||
        `Discover ${artist.name}, a ${String(artist.category || 'creative').toLowerCase()} artist represented by YAAAS Agency.`;

    return {
        title: `${artist.name} — African Artist Profile`,
        description,
        alternates: { canonical: `/talents/${artist.slug}` },
        openGraph: {
            type: 'profile',
            title: `${artist.name} | YAAAS Agency`,
            description,
            images: artist.headshot ? [{ url: artist.headshot, alt: artist.name }] : undefined,
        },
    };
}

export default function SingleTalentPage({ params }: Props) {
    const unwrappedParams = use(params);
    const artist = use(getTalentBySlug(unwrappedParams.slug.toLowerCase()));

    if (!artist) notFound();

    return <TalentProfileClient artist={artist} />;
}
