"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogClientProps {
    initialPosts: any[];
}

export default function BlogClient({ initialPosts }: BlogClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 9;

    const filteredPosts = useMemo(() => {
        return initialPosts.filter(post => 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.contentBlurb?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [initialPosts, searchQuery]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    return (
        <main className="min-h-screen bg-black flex flex-col pt-32 font-sans text-white pb-20">
            {/* Header Banner */}
            <div className="w-full bg-[#c1a03a] py-8 md:py-12 mb-12 shadow-2xl">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <h1 className="text-white text-3xl md:text-[64px] uppercase tracking-widest">BLOG</h1>
                    
                    {/* Search Bar */}
                    <div className="relative w-full md:w-[400px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                        <input
                            type="text"
                            placeholder="SEARCH ARTICLES..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full bg-black/20 border border-white/20 rounded-sm py-4 pl-12 pr-4 text-white text-xs tracking-widest outline-none focus:border-white transition-all uppercase"
                        />
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                        {paginatedPosts.map((post) => (
                            <Link href={`/news/${post._id}`} key={post._id} className="flex flex-col group cursor-pointer w-full max-w-[450px] mx-auto">
                                <span className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mb-4">{post.category || 'NEWS'}</span>
                                <h4 className="text-[#FDDA2F] font-bold text-lg md:text-xl tracking-wide leading-tight mb-6 h-[60px] overflow-hidden uppercase group-hover:brightness-125 transition-all">
                                    {post.title}
                                </h4>
                                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/5 opacity-80 group-hover:opacity-100 shadow-2xl">
                                    <Image 
                                        src={post.image} 
                                        alt={post.title} 
                                        fill 
                                        className="object-cover" 
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                                </div>
                                <p className="text-white/70 font-light text-sm md:text-base tracking-wide leading-relaxed line-clamp-3 text-justify">
                                    {post.contentBlurb}
                                </p>
                                <div className="mt-6 flex items-center gap-3 w-fit group/btn">
                                    <span className="text-[#FDDA2F] text-[10px] uppercase tracking-[0.2em] font-bold">Read More</span>
                                    <div className="w-6 h-[1px] bg-[#FDDA2F] transition-all duration-300 group-hover/btn:w-12"></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 flex flex-col items-center gap-6">
                        <Search size={48} className="text-white/10" />
                        <p className="text-white/30 text-xl tracking-widest uppercase italic">No articles found matching "{searchQuery}"</p>
                        <button 
                            onClick={() => setSearchQuery('')}
                            className="text-[#FDDA2F] border border-[#FDDA2F]/30 px-8 py-3 text-xs tracking-widest font-bold uppercase hover:bg-[#FDDA2F] hover:text-black transition-all"
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-6 mt-24">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FDDA2F] hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-xs tracking-[0.3em] font-bold text-white/50">
                            PAGE <span className="text-[#FDDA2F]">{currentPage}</span> OF {totalPages}
                        </span>
                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FDDA2F] hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-white"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
