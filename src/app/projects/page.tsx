import React from 'react';
import { getProjects } from '@/actions/projectActions';
import ProjectsClient from '@/components/projects/ProjectsClient';

export default async function ProjectsPage() {
    // Fetch live projects from MongoDB
    const projects = await getProjects();

    return (
        <ProjectsClient projects={projects} />
    );
}

