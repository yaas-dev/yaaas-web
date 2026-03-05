import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { getTalentBySlug } from '@/actions/talentActions';
import TalentProfileClient from '@/components/talents/TalentProfileClient';

export default function SingleTalentPage({ params }: { params: Promise<{ slug: string }> }) {
    const unwrappedParams = use(params);
    const artist = use(getTalentBySlug(unwrappedParams.slug.toLowerCase()));

    if (!artist) {
        notFound();
    }

    return (
        <TalentProfileClient artist={artist} />
    );
}

