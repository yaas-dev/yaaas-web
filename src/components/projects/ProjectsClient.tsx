"use client";

import React, { useState, useMemo } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectsClientProps {
    initialProjects: any[];
    initialBlogs: any[];
}

type FilterType = 'all' | 'projects' | 'blogs';

export default function ProjectsClient({ initialProjects, initialBlogs }: ProjectsClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');

    const filteredProjects = useMemo(() => {
        return initialProjects.filter(project =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [initialProjects, searchQuery]);

    const filteredBlogs = useMemo(() => {
        return initialBlogs.filter(blog =>
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.contentBlurb?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [initialBlogs, searchQuery]);

    const showProjects = activeFilter === 'all' || activeFilter === 'projects';
    const showBlogs = activeFilter === 'all' || activeFilter === 'blogs';

    const hasResults = (showProjects && filteredProjects.length > 0) || (showBlogs && filteredBlogs.length > 0);

    return (
        <main className="min-h-screen bg-black flex flex-col pt-32 font-sans text-white pb-20">
            {/* Gold Header Banner */}
            <div className="w-full bg-[#c1a03a] py-8 md:py-12 mb-12 shadow-2xl">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <h1 className="text-white text-3xl md:text-[64px] uppercase tracking-widest font-bold">PROJECTS</h1>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-[401px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                        <input
                            type="text"
                            placeholder="SEARCH EVERYTHING..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/20 border border-white/20 rounded-sm py-4 pl-12 pr-4 text-white text-xs tracking-widest outline-none focus:border-white transition-all uppercase placeholder:text-white/30"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                {/* Filter Controls */}
                <div className="flex items-center gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide">
                    <Filter className="text-[#B59431] mr-2 shrink-0" size={18} />
                    {(['all', 'projects', 'blogs'] as FilterType[]).map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-8 py-2 text-[10px] font-bold tracking-[0.3em] uppercase transition-all whitespace-nowrap border ${activeFilter === f
                                ? 'bg-[#FDDA2F] text-black border-[#FDDA2F]'
                                : 'text-white/40 border-white/10 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {hasResults ? (
                        <div className="space-y-32">
                            {/* Projects Section */}
                            {showProjects && filteredProjects.length > 0 && (
                                <motion.section
                                    key="projects-section"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-12"
                                >
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-2xl font-bold uppercase tracking-[0.4em] text-[#FDDA2F]">Case Studies</h2>
                                        <div className="flex-grow h-[1px] bg-white/10"></div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                                        {filteredProjects.map((project, index) => (
                                            <Link href={`/projects/${project._id}`} key={project._id}>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                                    className="group relative"
                                                >
                                                    <div className="relative aspect-[16/9] overflow-hidden bg-white/5 rounded-sm">
                                                        <img
                                                            src={project.mainImage}
                                                            alt={project.title}
                                                            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                                            <span className="px-8 py-4 border border-white text-white uppercase tracking-[0.3em] text-[10px] font-bold bg-white/10 backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                                                View Full Case
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-8">
                                                        <p className="text-[#FDDA2F] text-[10px] uppercase tracking-[0.3em] font-bold mb-3">{project.category}</p>
                                                        <h3 className="text-3xl font-bold uppercase tracking-wider text-white group-hover:text-[#FDDA2F] transition-colors leading-tight italic font-serif">
                                                            {project.title}
                                                        </h3>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.section>
                            )}

                            {/* Blogs Section */}
                            {showBlogs && filteredBlogs.length > 0 && (
                                <motion.section
                                    key="blogs-section"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-12"
                                >
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-2xl font-bold uppercase tracking-[0.4em] text-[#FDDA2F]">Blog</h2>
                                        <div className="flex-grow h-[1px] bg-white/10"></div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                        {filteredBlogs.map((blog, index) => (
                                            <Link href={`/news/${blog._id}`} key={blog._id}>
                                                <motion.div
                                                    initial={{ opacity: 0, y: 30 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                                    className="group flex flex-col h-full bg-white/[0.02] border border-white/5 p-6 hover:bg-white/[0.05] transition-all rounded-sm"
                                                >
                                                    <div className="relative aspect-[4/3] overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 rounded-sm">
                                                        {blog.image && (
                                                            <Image
                                                                src={blog.image}
                                                                alt={blog.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-4">{blog.category || 'INSIGHTS'}</p>
                                                    <h4 className="text-xl font-bold text-[#FDDA2F] tracking-wide mb-6 uppercase group-hover:brightness-125 transition-all line-clamp-2">
                                                        {blog.title}
                                                    </h4>
                                                    <p className="text-white/70 text-sm tracking-wide leading-relaxed line-clamp-3 mb-8">
                                                        {blog.contentBlurb}
                                                    </p>
                                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
                                                        <span className="text-[#FDDA2F] text-[10px] uppercase tracking-[0.2em] font-bold">READ ARTICLE</span>
                                                        <div className="w-6 h-[1px] bg-[#FDDA2F] group-hover:w-12 transition-all"></div>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.section>
                            )}
                        </div>
                    ) : (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-40 text-center flex flex-col items-center gap-6"
                        >
                            <Search size={48} className="text-white/10" />
                            <p className="text-white/30 text-xl tracking-[0.3em] uppercase italic">
                                No results found for "{searchQuery}"
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                                className="text-[#FDDA2F] border border-[#FDDA2F]/30 px-8 py-3 text-xs tracking-widest font-bold uppercase hover:bg-[#FDDA2F] hover:text-black transition-all"
                            >
                                Clear All Search
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </main>
    );
}
