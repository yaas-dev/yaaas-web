import React from 'react';
import CollaborationForm from '@/components/admin/CollaborationForm';
import { getCollaborations } from '@/actions/collaborationActions';
import dbConnect from '@/lib/mongodb';
import Collaboration from '@/models/Collaboration';
import { notFound } from 'next/navigation';

export default async function EditCollaborationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();
    const collaboration = await Collaboration.findById(id);

    if (!collaboration) {
        notFound();
    }

    return (
        <div className="max-w-[1200px] mx-auto">
            <CollaborationForm initialData={JSON.parse(JSON.stringify(collaboration))} />
        </div>
    );
}
