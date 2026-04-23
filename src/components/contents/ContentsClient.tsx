"use client";

import React, { useState, useMemo } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentsClientProps {
    initialContents: any[];
}

export default function ContentsClient({ initialContents }: ContentsClientProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredContents = useMemo(() => {
        return initialContents.filter(content =>
            content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            content.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [initialContents, searchQuery]);

    const hasResults = filteredContents.length > 0;

    return (
        <main className="min-h-screen bg-black flex flex-col pt-32 font-sans text-white pb-20">
            {/* Gold Header Banner */}
            <div className="w-full bg-[#c1a03a] py-8 md:py-8 mb-12 shadow-2xl">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <h1 className="text-white text-3xl md:text-[64px] uppercase tracking-widest font-normal">CONTENTS</h1>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-[401px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                        <input
                            type="text"
                            placeholder="SEARCH CONTENTS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/20 border border-white/20 rounded-sm py-4 pl-12 pr-4 text-white text-xs tracking-widest outline-none focus:border-white transition-all uppercase placeholder:text-white/30"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <AnimatePresence mode="wait">
                    {hasResults ? (
                        <div className="space-y-32">
                            {/* Contents Section */}
                            <motion.section
                                key="contents-section"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-12"
                            >
                                <div className="flex items-center gap-4">
                                    <h2 className="text-2xl font-bold uppercase tracking-[0.4em] text-[#FDDA2F]">Case Studies</h2>
                                    <div className="flex-grow h-[1px] bg-white/10"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                    {filteredContents.map((content, index) => (
                                        <Link href={`/contents/${content._id}`} key={content._id}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                                className="group flex flex-col h-full bg-white/[0.02] border border-white/5 p-6 hover:bg-white/[0.05] transition-all rounded-sm"
                                            >
                                                <div className="relative aspect-[4/3] overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 rounded-sm">
                                                    <Image
                                                        src={content.mainImage}
                                                        alt={content.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-4">{content.category}</p>
                                                <h4 className="text-xl font-bold text-[#FDDA2F] tracking-wide mb-6 uppercase group-hover:brightness-125 transition-all line-clamp-2">
                                                    {content.title}
                                                </h4>
                                                <p className="text-white/70 text-sm tracking-wide leading-relaxed line-clamp-3 mb-8">
                                                    {content.description}
                                                </p>
                                                <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
                                                    <span className="text-[#FDDA2F] text-[10px] uppercase tracking-[0.2em] font-bold">EXPLORE CONTENT</span>
                                                    <div className="w-6 h-[1px] bg-[#FDDA2F] group-hover:w-12 transition-all"></div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.section>
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
                                No contents found for "{searchQuery}"
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); }}
                                className="text-[#FDDA2F] border border-[#FDDA2F]/30 px-8 py-3 text-xs tracking-widest font-bold uppercase hover:bg-[#FDDA2F] hover:text-black transition-all"
                            >
                                Clear Search
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
