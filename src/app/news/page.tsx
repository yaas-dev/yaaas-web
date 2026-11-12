import type { Metadata } from "next";

export const metadata: Metadata = { title: "African Art News & Exhibitions", description: "The latest exhibitions, artist stories, cultural projects and news from YAAAS Agency and the wider African creative scene.", alternates: { canonical: "/news" } };

import React from 'react';
import { getNewsPosts } from '@/actions/newsActions';
import NewsClient from '@/components/news/NewsClient';

export default async function NewsPage() {
    // Fetch live news from MongoDB
    const newsPosts = await getNewsPosts();

    return (
        <NewsClient newsPosts={newsPosts} />
    );
}

