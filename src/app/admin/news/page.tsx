"use client";

import React, { useEffect, useState } from 'react';
import { getNewsPosts, deleteNews } from '@/actions/newsActions';
import { Plus, Edit2, Trash2, FileText, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewsAdminPage() {
    const [news, setNews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadNews();
    }, []);

    async function loadNews() {
        setIsLoading(true);
        try {
            const data = await getNewsPosts();
            setNews(data);
        } catch (error) {
            console.error("Failed to load news:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (confirm("Are you sure you want to delete this news post?")) {
            await deleteNews(id);
            loadNews();
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase tracking-[0.1em]">Latest News</h1>
                    <p className="text-white/40 text-sm tracking-wide">Publish and manage updates, interviews, and press releases.</p>
                </div>
                <Link
                    href="/admin/news/new"
                    className="w-full sm:w-auto bg-[#B59431] text-black px-6 py-3 rounded-sm font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center justify-center gap-3"
                >
                    <Plus size={16} />
                    New News Post
                </Link>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59431]">Article</th>
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59431] hidden sm:table-cell">Date</th>
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59431] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} className="p-12 text-center text-white/20 text-xs italic tracking-widest">
                                        Fetching latest news...
                                    </td>
                                </tr>
                            ) : news.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-12 text-center text-white/20 text-xs italic tracking-widest">
                                        No news posts yet. Start by creating one.
                                    </td>
                                </tr>
                            ) : (
                                news.map((item) => (
                                    <tr key={item._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-12 h-8 md:w-16 md:h-10 rounded-sm overflow-hidden border border-white/10 flex-shrink-0 bg-black">
                                                    {item.image ? (
                                                        <Image
                                                            src={item.image}
                                                            alt={item.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-white/20">
                                                            <FileText size={16} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold tracking-wider text-white group-hover:text-[#B59431] transition-colors truncate max-w-[200px] md:max-w-[400px]">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-[10px] text-white/40 uppercase tracking-widest truncate max-w-[200px] md:max-w-[400px]">{item.contentBlurb}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 hidden sm:table-cell">
                                            <div className="flex items-center gap-2 text-white/60 text-xs tracking-widest uppercase">
                                                <Calendar size={12} />
                                                {item.date}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center justify-end gap-1 md:gap-3">
                                                <Link
                                                    href={`/admin/news/${item._id}/edit`}
                                                    className="p-2 text-white/20 hover:text-[#B59431] transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="p-2 text-white/20 hover:text-red-500 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-white/5">
                    {isLoading ? (
                        <div className="p-12 text-center text-white/20 text-xs italic tracking-widest">
                            Fetching latest news...
                        </div>
                    ) : news.length === 0 ? (
                        <div className="p-12 text-center text-white/20 text-xs italic tracking-widest">
                            No news posts yet.
                        </div>
                    ) : (
                        news.map((item) => (
                            <div key={item._id} className="p-6 flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-16 h-10 rounded-sm overflow-hidden border border-white/10 flex-shrink-0 bg-black">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                                <FileText size={16} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-grow min-w-0">
                                        <span className="text-sm font-bold tracking-wider text-white truncate">
                                            {item.title}
                                        </span>
                                        <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest">
                                            <Calendar size={10} />
                                            {item.date}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <Link
                                        href={`/admin/news/${item._id}/edit`}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 text-[#B59431]/60 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:text-[#B59431] transition-colors"
                                    >
                                        <Edit2 size={14} />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-2.5 bg-red-500/10 text-red-500/40 rounded-sm hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
