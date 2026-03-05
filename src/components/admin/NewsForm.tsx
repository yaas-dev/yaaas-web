"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNews, updateNews } from '@/actions/newsActions';
import ImageUpload from './ImageUpload';
import { Save, ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';

interface NewsFormProps {
    initialData?: any;
}

export default function NewsForm({ initialData }: NewsFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = !!initialData;

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        date: initialData?.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
        image: initialData?.image || '',
        contentBlurb: initialData?.contentBlurb || '',
        fullContent: initialData?.fullContent || '',
        category: initialData?.category || 'NEWS',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing) {
                await updateNews(initialData._id, formData);
            } else {
                await createNews(formData);
            }
            router.push('/admin/news');
            router.refresh();
        } catch (error) {
            console.error("Operation failed:", error);
            alert("Failed to save news post.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <Link href="/admin/news" className="text-[10px] text-[#B59431] uppercase tracking-[0.2em] font-bold flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft size={12} />
                        Back to News List
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-[0.1em]">
                        {isEditing ? 'Edit News Post' : 'Compose News Post'}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#B59431] text-black px-10 py-4 rounded-sm font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center gap-3 disabled:opacity-50"
                >
                    <Save size={16} />
                    {isLoading ? 'Publishing...' : (isEditing ? 'Update Post' : 'Publish Post')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left: Metadata */}
                <div className="lg:col-span-1 flex flex-col gap-8">
                    <ImageUpload
                        label="Featured Image"
                        folder="news"
                        value={formData.image}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                    />

                    <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Publish Date</label>
                            <input
                                required
                                type="text"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="bg-black border border-white/10 p-3 text-xs text-white outline-none focus:border-[#B59431] transition-colors"
                                placeholder="e.g. 15 DEC 2024"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Category</label>
                            <input
                                required
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="bg-black border border-white/10 p-3 text-xs text-white outline-none focus:border-[#B59431] transition-colors"
                                placeholder="e.g. EXHIBITION, INSIGHTS"
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-sm flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Article Title</label>
                            <input
                                required
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="bg-black border border-white/10 p-4 text-lg font-bold text-white outline-none focus:border-[#B59431] transition-colors"
                                placeholder="Headline goes here..."
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Short Blurb (Catalog View)</label>
                            <textarea
                                required
                                rows={2}
                                value={formData.contentBlurb}
                                onChange={(e) => setFormData({ ...formData, contentBlurb: e.target.value })}
                                className="bg-black border border-white/10 p-4 text-sm text-white/60 outline-none focus:border-[#B59431] transition-colors italic"
                                placeholder="A short preview sentence..."
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Full Article Content</label>
                            <textarea
                                required
                                rows={12}
                                value={formData.fullContent}
                                onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
                                className="bg-black border border-white/10 p-4 text-sm text-white/80 outline-none focus:border-[#B59431] transition-colors leading-relaxed"
                                placeholder="Write the full story..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
