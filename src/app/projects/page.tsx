import React from 'react';
import { getProjects } from '@/actions/projectActions';
import { getNewsPosts } from '@/actions/newsActions';
import ProjectsClient from '@/components/projects/ProjectsClient';

export default async function ProjectsPage() {
    // Fetch live projects and blog posts
    const [projects, newsPosts] = await Promise.all([
        getProjects(),
        getNewsPosts()
    ]);

    return (
        <ProjectsClient initialProjects={projects} initialBlogs={newsPosts} />
    );
}
