import type { Metadata } from "next";

export const metadata: Metadata = { title: "African Artists — Visual & Sonic Talent", description: "Meet the visual and sonic artists represented by YAAAS Agency, championing creative voices from Africa and its diaspora.", alternates: { canonical: "/talents" } };

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

