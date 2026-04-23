import React, { use } from 'react';
import ContentForm from '@/components/admin/ContentForm';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { notFound } from 'next/navigation';

async function getContent(id: string) {
    await dbConnect();
    const project = await Project.findById(id);
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
}

export default function EditContentPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const project = use(getContent(unwrappedParams.id));

    if (!project) {
        notFound();
    }

    return <ContentForm initialData={project} />;
}
