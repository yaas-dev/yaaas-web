"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Eye, Ear } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TalentCarousel from '@/components/shared/TalentCarousel';
import EnquiryModal, { Artwork } from '@/components/shared/EnquiryModal';

// Extend Artwork type for this page to include category
interface Talent extends Artwork {
    category: 'VISUAL' | 'SONIC';
}

const talentsData: Talent[] = [
    { id: 1, src: '/images/service_1.png', artist: 'Artist Name', title: 'Title of Piece', category: 'VISUAL' },
    { id: 2, src: '/images/service_2.png', artist: 'Artist Name', title: 'Title of Piece', category: 'SONIC' },
    { id: 3, src: '/images/service_3.png', artist: 'Artist Name', title: 'Title of Piece', category: 'VISUAL' },
    { id: 4, src: '/images/service_1.png', artist: 'Artist Name', title: 'Title of Piece', category: 'SONIC' },
    { id: 5, src: '/images/service_2.png', artist: 'Artist Name', title: 'Title of Piece', category: 'VISUAL' },
    { id: 6, src: '/images/service_3.png', artist: 'Artist Name', title: 'Title of Piece', category: 'SONIC' },
];

export default function TalentsPage() {
    const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
    const [activeFilter, setActiveFilter] = useState('ALL');

    const filteredTalents = useMemo(() => {
        if (activeFilter === 'ALL') return talentsData;
        return talentsData.filter(talent => talent.category === activeFilter);
    }, [activeFilter]);

    return (
        <main className="min-h-screen bg-black flex flex-col pt-24 font-sans">

            {/* Top Carousel Section with Curved Pattern Background */}
            <div className="w-full relative overflow-hidden py-16" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='curved-pattern' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 50 Q 25 25 50 50 T 100 50' fill='none' stroke='%233a3015' stroke-width='2' opacity='0.5'/%3E%3Cpath d='M0 70 Q 25 45 50 70 T 100 70' fill='none' stroke='%233a3015' stroke-width='2' opacity='0.5'/%3E%3Cpath d='M0 30 Q 25 5 50 30 T 100 30' fill='none' stroke='%233a3015' stroke-width='2' opacity='0.5'/%3E%3Cpath d='M0 90 Q 25 65 50 90 T 100 90' fill='none' stroke='%233a3015' stroke-width='2' opacity='0.5'/%3E%3Cpath d='M0 10 Q 25 -15 50 10 T 100 10' fill='none' stroke='%233a3015' stroke-width='2' opacity='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23curved-pattern)' /%3E%3C/svg%3E")`,
                backgroundSize: '300px 300px',
                backgroundPosition: 'center',
            }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-0"></div>
                <div className="absolute inset-0 bg-black/40 z-0"></div>

                <div className="relative z-10">
                    <TalentCarousel />
                </div>

                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 relative z-20 -mt-8">

                {/* Heading */}
                <div className="flex flex-col mb-12">
                    <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-[0.15em] mb-4">
                        THE YAAAS CREATIVES
                    </h1>
                    <div className="h-1.5 w-[200px] md:w-[350px] bg-[#B59431]"></div>
                </div>

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-white/10 pb-8">
                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setActiveFilter('ALL')}
                            className={`text-[10px] md:text-xs font-bold tracking-[0.2em] px-8 py-3 uppercase transition-all min-w-[100px] ${activeFilter === 'ALL' ? 'bg-[#FDDA2F] text-black border border-[#FDDA2F]' : 'bg-transparent text-white border border-white/30 hover:border-[#FDDA2F]'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveFilter('VISUAL')}
                            className={`text-[10px] md:text-xs font-bold tracking-[0.2em] px-8 py-3 uppercase transition-all min-w-[100px] ${activeFilter === 'VISUAL' ? 'bg-[#FDDA2F] text-black border border-[#FDDA2F]' : 'bg-transparent text-white border border-white/30 hover:border-[#FDDA2F]'}`}
                        >
                            Visual
                        </button>
                        <button
                            onClick={() => setActiveFilter('SONIC')}
                            className={`text-[10px] md:text-xs font-bold tracking-[0.2em] px-8 py-3 uppercase transition-all min-w-[100px] ${activeFilter === 'SONIC' ? 'bg-[#FDDA2F] text-black border border-[#FDDA2F]' : 'bg-transparent text-white border border-white/30 hover:border-[#FDDA2F]'}`}
                        >
                            Sonic
                        </button>
                    </div>

                    {/* Icons Section matching the design screenshot */}
                    <div className="flex items-center gap-6 text-[#FDDA2F]">
                        <AnimatePresence mode="wait">
                            {(activeFilter === 'ALL' || activeFilter === 'SONIC') && (
                                <motion.div
                                    key="ear"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 0.8, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Ear className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
                                </motion.div>
                            )}
                            {(activeFilter === 'ALL' || activeFilter === 'VISUAL') && (
                                <motion.div
                                    key="eye"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 0.8, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Eye className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-3 gap-x-3 sm:gap-x-6 md:gap-x-12 lg:gap-x-16 gap-y-8 md:gap-y-16 w-full mb-16 min-h-[400px]">
                    {filteredTalents.map((art) => (
                        <Link
                            href="/talents/eolia"
                            key={art.id}
                            className="flex flex-col group cursor-pointer"
                        >
                            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-lg overflow-hidden mb-2 md:mb-4 bg-white/5">
                                <Image
                                    src={art.src}
                                    alt={art.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="33vw"
                                />

                                {/* Overlay Hint */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="text-white text-[8px] sm:text-[10px] md:text-sm font-bold tracking-widest uppercase border border-white/50 px-2 md:px-6 py-2 text-center">View Profile</span>
                                </div>
                            </div>
                            <div className="flex flex-col pl-1">
                                <span className="text-[#FDDA2F] font-bold text-[10px] sm:text-xs md:text-[15px] tracking-wide mb-0.5 md:mb-1 truncate uppercase">{art.artist}</span>
                                <span className="text-[#FDDA2F]/80 font-medium text-[9px] sm:text-[10px] md:text-sm tracking-wide truncate uppercase">{art.title}</span>
                            </div>
                        </Link>
                    ))}

                    {/* Empty State */}
                    {filteredTalents.length === 0 && (
                        <div className="col-span-3 flex flex-col items-center justify-center py-20 text-white/40 italic">
                            No talents found in this category.
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="w-full flex justify-center items-center gap-4 pb-32">
                    <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#333] flex items-center justify-center text-white/60 hover:bg-[#FDDA2F] hover:text-black transition-colors">
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <div className="flex gap-2 md:gap-3 mx-2">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FDDA2F]"></div>
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#333]"></div>
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#333]"></div>
                    </div>
                    <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#333] flex items-center justify-center text-white/60 hover:bg-[#FDDA2F] hover:text-black transition-colors">
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            <EnquiryModal
                isOpen={!!selectedArt}
                onClose={() => setSelectedArt(null)}
                artwork={selectedArt as Artwork}
            />
        </main>
    );
}
