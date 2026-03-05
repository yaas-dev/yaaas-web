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

