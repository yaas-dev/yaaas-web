"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ArtCatalogue from '@/components/home/ArtCatalogue';
import EnquiryModal, { Artwork } from '@/components/shared/EnquiryModal';

const artworks: Artwork[] = [
    { id: 1, src: '/images/service_1.png', artist: 'Artist Name', title: 'Title of Piece' },
    { id: 2, src: '/images/service_2.png', artist: 'Artist Name', title: 'Title of Piece' },
    { id: 3, src: '/images/service_3.png', artist: 'Artist Name', title: 'Title of Piece' },
    { id: 4, src: '/images/service_1.png', artist: 'Artist Name', title: 'Title of Piece' },
    { id: 5, src: '/images/service_2.png', artist: 'Artist Name', title: 'Title of Piece' },
    { id: 6, src: '/images/service_3.png', artist: 'Artist Name', title: 'Title of Piece' },
];

export default function CataloguePage() {
    const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);

    return (
        <main className="min-h-screen bg-black flex flex-col pt-32 font-sans">
            {/* First Gold Banner */}
            <div className="w-full bg-[#c1a03a] py-5 px-8 md:px-[10%]">
                <h1 className="text-white text-2xl md:text-3xl font-medium uppercase tracking-widest outline-none">
                    Art Catalogue
                </h1>
            </div>
            <ArtCatalogue />

            {/* Second Gold Banner (Empty) */}
            <div className="w-full bg-[#c1a03a] h-12 md:h-20 mt-10"></div>

            {/* Grid Section */}
            <div className="w-full bg-black py-16 px-4 md:px-12 flex justify-center">
                <div className="grid grid-cols-3 gap-x-3 sm:gap-x-6 md:gap-x-10 lg:gap-x-16 gap-y-8 md:gap-y-16 max-w-[1200px] w-full">
                    {artworks.map((art) => (
                        <div
                            key={art.id}
                            onClick={() => setSelectedArt(art)}
                            className="flex flex-col group cursor-pointer"
                        >
                            <div className="relative w-full aspect-[4/5] md:aspect-[4/3] rounded-lg overflow-hidden mb-2 md:mb-4">
                                <Image
                                    src={art.src}
                                    alt={art.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="33vw"
                                />

                                {/* Overlay Hint */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-1 md:p-2">
                                    <span className="text-white font-bold tracking-widest uppercase border border-white/50 px-2 py-1 md:px-6 md:py-2 text-[8px] sm:text-[10px] md:text-sm text-center">Enquire</span>
                                </div>
                            </div>
                            <div className="flex flex-col pl-1">
                                <span className="text-[#d8b511] font-bold text-[10px] sm:text-xs md:text-[15px] tracking-wide mb-0.5 md:mb-1 leading-tight md:leading-normal">{art.artist}</span>
                                <span className="text-[#d8b511] font-medium text-[8px] sm:text-[10px] md:text-sm tracking-wide leading-tight md:leading-normal">{art.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="w-full bg-black flex justify-center items-center gap-4 pb-32">
                <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#888] flex items-center justify-center text-black hover:bg-[#a0a0a0] transition-colors">
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <div className="flex gap-2 md:gap-3 mx-2">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#c1a03a]"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#888]"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#888]"></div>
                </div>
                <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#888] flex items-center justify-center text-black hover:bg-[#a0a0a0] transition-colors">
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
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