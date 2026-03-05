import React, { use } from 'react';
import TalentForm from '@/components/admin/TalentForm';
import dbConnect from '@/lib/mongodb';
import Talent from '@/models/Talent';
import { notFound } from 'next/navigation';

async function getTalent(id: string) {
    await dbConnect();
    const talent = await Talent.findById(id);
    if (!talent) return null;
    return JSON.parse(JSON.stringify(talent));
}

export default function EditTalentPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const talent = use(getTalent(unwrappedParams.id));

    if (!talent) {
        notFound();
    }

    return <TalentForm initialData={talent} />;
}
