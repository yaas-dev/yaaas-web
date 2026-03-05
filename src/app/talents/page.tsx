import React from 'react';
import { getTalents } from '@/actions/talentActions';
import TalentsClient from '@/components/talents/TalentsClient';

export default async function TalentsPage() {
    // Fetch live talents from MongoDB
    const talents = await getTalents();

    return (
        <TalentsClient initialTalents={talents} />
    );
}

