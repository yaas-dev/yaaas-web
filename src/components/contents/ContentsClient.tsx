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
        <main className="min-h-screen bg-[#F1EFE8] flex flex-col pt-32 font-sans text-[#171717] pb-20">
            {/* Gold Header Banner */}
            <div className="w-full bg-[#F1EFE8] py-8 md:py-8 mb-12 shadow-2xl">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <h1 className="text-[#171717] text-3xl md:text-[64px] uppercase tracking-widest font-normal">CONTENTS</h1>

                    {/* Search Bar */}
                    <div className="relative w-full md:w-[401px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#77746D]" size={18} />
                        <input
                            type="text"
                            placeholder="SEARCH CONTENTS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/70 border border-black/15 rounded-sm py-4 pl-12 pr-4 text-[#171717] text-xs tracking-widest outline-none focus:border-white transition-all uppercase placeholder:text-[#77746D]"
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
                                    <h2 className="text-2xl font-bold uppercase tracking-[0.4em] text-[#B59431]">Case Studies</h2>
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
                                                className="group flex flex-col h-full bg-white/60 border border-black/10 p-6 hover:bg-white/[0.05] transition-all rounded-sm"
                                            >
                                                <div className="relative aspect-[4/3] overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 rounded-sm">
                                                    <Image
                                                        src={content.mainImage}
                                                        alt={content.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <p className="text-[#77746D] text-[10px] tracking-[0.2em] uppercase mb-4">{content.category}</p>
                                                <h4 className="text-xl font-bold text-[#B59431] tracking-wide mb-6 uppercase group-hover:brightness-125 transition-all line-clamp-2">
                                                    {content.title}
                                                </h4>
                                                <p className="text-[#55534E] text-sm tracking-wide leading-relaxed line-clamp-3 mb-8">
                                                    {content.description}
                                                </p>
                                                <div className="mt-auto pt-6 border-t border-black/10 flex items-center gap-3">
                                                    <span className="text-[#B59431] text-[10px] uppercase tracking-[0.2em] font-bold">EXPLORE CONTENT</span>
                                                    <div className="w-6 h-[1px] bg-[#B59431] group-hover:w-12 transition-all"></div>
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
                            <p className="text-[#77746D] text-xl tracking-[0.3em] uppercase italic">
                                No contents found for "{searchQuery}"
                            </p>
                            <button
                                onClick={() => { setSearchQuery(''); }}
                                className="text-[#B59431] border border-[#B59431]/30 px-8 py-3 text-xs tracking-widest font-bold uppercase hover:bg-[#B59431] hover:text-black transition-all"
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
