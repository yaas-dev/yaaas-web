import React, { use } from 'react';
import ProjectForm from '@/components/admin/ProjectForm';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { notFound } from 'next/navigation';

async function getProject(id: string) {
    await dbConnect();
    const project = await Project.findById(id);
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const project = use(getProject(unwrappedParams.id));

    if (!project) {
        notFound();
    }

    return <ProjectForm initialData={project} />;
}
