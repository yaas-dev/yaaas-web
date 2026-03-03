"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import TalentCarousel from '@/components/shared/TalentCarousel';
import EnquiryModal, { Artwork } from '@/components/shared/EnquiryModal';

const talentsData: Artwork[] = [
    { id: 1, src: '/images/service_1.png', artist: 'Artist Name', title: 'Title of Piece' },
    { id: 2, src: '/images/service_2.png', artist: 'Artist Name', title: 'Title of Piece' },
    { id: 3, src: '/images/service_3.png', artist: 'Artist Name', title: 'Title of Piece' },
    { id: 4, src: '/images/service_1.png', artist: 'Artist Name', title: 'Title of Piece' },
    { id: 5, src: '/images/service_2.png', artist: 'Artist Name', title: 'Title of Piece' },
    { id: 6, src: '/images/service_3.png', artist: 'Artist Name', title: 'Title of Piece' },
];

export default function TalentsPage() {
    const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
    const [activeFilter, setActiveFilter] = useState('ALL');

    return (
        <main className="min-h-screen bg-black flex flex-col pt-24 font-sans">

            {/* Top Carousel Section with Curved Pattern Background */}
            <div className="w-full relative overflow-hidden py-16" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='curved-pattern' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0 50 Q 25 25 50 50 T 100 50' fill='none' stroke='%233a3015' stroke-width='2' opacity='0.5'/%3E%3Cpath d='M0 70 Q 25 45 50 70 T 100 70' fill='none' stroke='%233a3015' stroke-width='2' opacity='0.5'/%3E%3Cpath d='M0 30 Q 25 5 50 30 T 100 30' fill='none' stroke='%233a3015' stroke-width='2' opacity='0.5'/%3E%3Cpath d='M0 90 Q 25 65 50 90 T 100 90' fill='none' stroke='%233a3015' stroke-width='2' opacity='0.5'/%3E%3Cpath d='M0 10 Q 25 -15 50 10 T 100 10' fill='none' stroke='%233a3015' stroke-width='2' opacity='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23curved-pattern)' /%3E%3C/svg%3E")`,
                backgroundSize: '300px 300px',
                backgroundPosition: 'center',
            }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-0"></div>
                <div className="absolute inset-0 bg-black/40 z-0"></div> {/* Extra dimming for contrast */}

                <div className="relative z-10">
                    <TalentCarousel />
                </div>

                {/* Fade layer at bottom of carousel section */}
                <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 relative z-20 -mt-8">

                {/* Heading */}
                <div className="flex flex-col mb-12">
                    <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-[0.15em] mb-4">
                        The Yaaas Talents
                    </h1>
                    {/* Gold Underline corresponding specifically to the width of the heading */}
                    <div className="h-1 w-[200px] md:w-[350px] bg-[#d8b511]"></div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mb-16 border-b border-white/10 pb-8">
                    <button
                        onClick={() => setActiveFilter('ALL')}
                        className={`text-xs md:text-sm font-bold tracking-widest px-8 py-3 uppercase transition-all ${activeFilter === 'ALL' ? 'bg-[#d8b511] text-black border border-[#d8b511]' : 'bg-transparent text-white border border-white/30 hover:border-[#d8b511]'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setActiveFilter('VISUAL')}
                        className={`text-xs md:text-sm font-bold tracking-widest px-8 py-3 uppercase transition-all ${activeFilter === 'VISUAL' ? 'bg-[#d8b511] text-black border border-[#d8b511]' : 'bg-transparent text-white border border-white/30 hover:border-[#d8b511]'}`}
                    >
                        Visual
                    </button>
                    <button
                        onClick={() => setActiveFilter('SONIC')}
                        className={`text-xs md:text-sm font-bold tracking-widest px-8 py-3 uppercase transition-all ${activeFilter === 'SONIC' ? 'bg-[#d8b511] text-black border border-[#d8b511]' : 'bg-transparent text-white border border-white/30 hover:border-[#d8b511]'}`}
                    >
                        Sonic
                    </button>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-12 md:gap-y-16 w-full mb-16">
                    {talentsData.map((art) => (
                        <Link
                            href="/talents/eolia"
                            key={art.id}
                            className="flex flex-col group cursor-pointer"
                        >
                            <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
                                <Image
                                    src={art.src}
                                    alt={art.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                {/* Overlay Hint */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="text-white font-bold tracking-widest uppercase border border-white/50 px-6 py-2">View Profile</span>
                                </div>
                            </div>
                            <div className="flex flex-col pl-1">
                                <span className="text-[#d8b511] font-bold text-sm md:text-[15px] tracking-wide mb-1">{art.artist}</span>
                                <span className="text-[#d8b511] font-medium text-xs md:text-sm tracking-wide">{art.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="w-full flex justify-center items-center gap-4 pb-32">
                    <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#888] flex items-center justify-center text-black hover:bg-[#a0a0a0] transition-colors">
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <div className="flex gap-2 md:gap-3 mx-2">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#d8b511]"></div>
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#888]"></div>
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#888]"></div>
                    </div>
                    <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#888] flex items-center justify-center text-black hover:bg-[#a0a0a0] transition-colors">
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            </div>

            {/* Shared Modal Overlay */}
            <EnquiryModal
                isOpen={!!selectedArt}
                onClose={() => setSelectedArt(null)}
                artwork={selectedArt as Artwork}
            />
        </main>
    );
}
