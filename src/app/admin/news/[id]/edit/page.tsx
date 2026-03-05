import React, { use } from 'react';
import NewsForm from '@/components/admin/NewsForm';
import dbConnect from '@/lib/mongodb';
import News from '@/models/News';
import { notFound } from 'next/navigation';

async function getNewsPost(id: string) {
    await dbConnect();
    const post = await News.findById(id);
    if (!post) return null;
    return JSON.parse(JSON.stringify(post));
}

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const post = use(getNewsPost(unwrappedParams.id));

    if (!post) {
        notFound();
    }

    return <NewsForm initialData={post} />;
}
