"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ArtCatalogue from '@/components/home/ArtCatalogue';
import EnquiryModal from '@/components/shared/EnquiryModal';
import ContactSection from '../home/ContactSection';

interface CatalogueClientProps {
    initialArtworks: any[];
}

export default function CatalogueClient({ initialArtworks }: CatalogueClientProps) {
    const [selectedArt, setSelectedArt] = useState<any | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 9;
    const filters = ['all', 'painting', 'photography', 'sculpture'];

    const filteredArtworks = initialArtworks
        .filter(art => {
            const isVisual = ['painting', 'photography', 'sculpture'].includes(art.medium);
            if (activeFilter === 'all') return isVisual;
            return art.medium === activeFilter;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
            if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
            return 0;
        });

    const totalPages = Math.ceil(filteredArtworks.length / ITEMS_PER_PAGE);
    const paginatedArtworks = filteredArtworks.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    // Reset to page 1 when filter or sort changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [activeFilter, sortBy]);

    const handlePrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));

    return (
        <main className="min-h-screen bg-black flex flex-col pt-32 font-sans">
            {/* First Gold Banner */}
            <div className="w-full bg-[#c1a03a] py-5 px-8 md:px-[10%] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-white text-2xl md:text-[64px] uppercase tracking-widest outline-none">
                    Art Catalogue
                </h1>

                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <label className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Sort By</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-black/20 border border-white/20 text-white text-xs p-2 uppercase tracking-widest outline-none focus:border-white transition-colors appearance-none"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="title-asc">Title A-Z</option>
                        <option value="title-desc">Title Z-A</option>
                    </select>
                </div>
            </div>

            {/* Filters Section */}
            <div className="w-full bg-black py-8 border-b border-white/5 flex justify-center px-4 overflow-x-auto">
                <div className="flex gap-4 md:gap-8">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all pb-2 border-b-2 ${activeFilter === filter
                                ? 'text-[#B59431] border-[#B59431]'
                                : 'text-white/40 border-transparent hover:text-white'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Section */}
            <div className="w-full bg-black py-16 px-4 md:px-12 flex justify-center">
                <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-x-6 md:gap-x-10 lg:gap-x-16 gap-y-12 md:gap-y-20 max-w-[1200px] w-full items-start">
                    {paginatedArtworks.map((art) => (
                        <div
                            key={art._id}
                            onClick={() => setSelectedArt(art)}
                            className="flex flex-col group cursor-pointer"
                        >
                            <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden mb-4 md:mb-6 bg-white/5 border border-white/5 group-hover:border-[#B59431]/40 transition-all shadow-2xl">
                                <Image
                                    src={art.src}
                                    alt={art.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />

                                {/* Overlay Hint */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-4">
                                    <span className="text-white font-bold tracking-[0.3em] uppercase border border-white/50 px-8 py-3 text-xs text-center backdrop-blur-sm">Enquire</span>
                                </div>

                                {/* Medium Badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="text-[8px] bg-black/60 backdrop-blur-md text-white/80 px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">
                                        {art.medium}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center px-2">
                                <span className="text-[#B59431] font-bold text-[10px] md:text-xs tracking-[0.2em] mb-2 leading-tight uppercase">{art.artistName}</span>
                                <span className="text-white font-bold text-sm md:text-lg tracking-widest leading-tight uppercase group-hover:text-[#B59431] transition-colors">{art.title}</span>
                            </div>
                        </div>
                    ))}

                    {paginatedArtworks.length === 0 && (
                        <div className="col-span-full py-40 text-center text-white/20 italic text-xs tracking-[0.3em] uppercase">
                            No pieces found in the {activeFilter !== 'all' ? activeFilter : 'collection'}.
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="w-full bg-black flex justify-center items-center gap-6 pb-32">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white hover:bg-[#B59431] hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-[#111] disabled:hover:text-white"
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    <div className="flex items-center gap-4">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#B59431]">
                            Page {currentPage} <span className="text-white/20 mx-2">/</span> {totalPages}
                        </span>
                    </div>

                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white hover:bg-[#B59431] hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-[#111] disabled:hover:text-white"
                    >
                        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                </div>
            )}

            <ContactSection />

            {/* Shared Modal Overlay */}
            <EnquiryModal
                isOpen={!!selectedArt}
                onClose={() => setSelectedArt(null)}
                artwork={selectedArt}
            />
        </main>
    );
}
