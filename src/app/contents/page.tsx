import React from 'react';
import { getProjects } from '@/actions/projectActions';
import ContentsClient from '@/components/contents/ContentsClient';

export default async function ContentsPage() {
    // Fetch live contents
    const projects = await getProjects();

    return (
        <ContentsClient initialContents={projects} />
    );
}
