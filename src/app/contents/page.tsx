import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cultural Projects & Creative Experiences", description: "Discover YAAAS projects, exhibitions, collaborations and cultural experiences across Africa and its diaspora.", alternates: { canonical: "/contents" } };

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
