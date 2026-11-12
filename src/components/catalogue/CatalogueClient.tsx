
"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import EnquiryModal from '@/components/shared/EnquiryModal';
import ContactSection from '../home/ContactSection';

interface CatalogueClientProps {
    initialArtworks: any[];
}

export default function CatalogueClient({ initialArtworks }: CatalogueClientProps) {
    const [selectedArt, setSelectedArt] = useState<any | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [selectedArtist, setSelectedArtist] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [visibleCount, setVisibleCount] = useState(12);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const ITEMS_PER_PAGE = 12;

    // Dynamically derive categories
    const categories = useMemo(() => {
        const mediums = initialArtworks
            .filter(art =>
                ['painting', 'photography', 'sculpture'].includes(art.medium)
            )
            .map(art => art.medium);

        return ['all', ...Array.from(new Set(mediums))];
    }, [initialArtworks]);

    // Dynamically derive artists
    const artists = useMemo(() => {
        const uniqueArtists = Array.from(
            new Set(initialArtworks.map(art => art.artistName))
        )
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b));

        return ['all', ...uniqueArtists];
    }, [initialArtworks]);

    // Filter and sort artworks
    const filteredArtworks = useMemo(() => {
        return initialArtworks
            .filter(art => {
                const isVisual = [
                    'painting',
                    'photography',
                    'sculpture'
                ].includes(art.medium);

                const matchesMedium =
                    activeFilter === 'all'
                        ? isVisual
                        : art.medium === activeFilter;

                const matchesArtist =
                    selectedArtist === 'all' ||
                    art.artistName === selectedArtist;

                return matchesMedium && matchesArtist;
            })
            .sort((a, b) => {
                const dateA = a.date
                    ? new Date(a.date).getTime()
                    : new Date(a.createdAt).getTime();

                const dateB = b.date
                    ? new Date(b.date).getTime()
                    : new Date(b.createdAt).getTime();

                if (sortBy === 'newest') return dateB - dateA;
                if (sortBy === 'oldest') return dateA - dateB;
                if (sortBy === 'title-asc') {
                    return a.title.localeCompare(b.title);
                }
                if (sortBy === 'title-desc') {
                    return b.title.localeCompare(a.title);
                }

                return 0;
            });
    }, [initialArtworks, activeFilter, selectedArtist, sortBy]);

    // Only display the artworks currently loaded
    const displayedArtworks = filteredArtworks.slice(0, visibleCount);

    // Reset displayed artworks when filters change
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
    }, [activeFilter, selectedArtist, sortBy]);

    // Automatically load more artworks when scrolling down
    useEffect(() => {
        const currentElement = loadMoreRef.current;

        if (!currentElement || visibleCount >= filteredArtworks.length) {
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    setVisibleCount(previous =>
                        Math.min(
                            previous + ITEMS_PER_PAGE,
                            filteredArtworks.length
                        )
                    );
                }
            },
            {
                rootMargin: '300px',
            }
        );

        observer.observe(currentElement);

        return () => observer.disconnect();
    }, [visibleCount, filteredArtworks.length]);

    return (
        <main className="min-h-screen bg-black flex flex-col pt-32 font-sans">

            {/* First Gold Banner */}
            <div className="w-full bg-[#c1a03a] py-5 px-8 md:px-[10%] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-white text-2xl md:text-[64px] uppercase tracking-widest outline-none">
                    Art Catalogue
                </h1>

                <div className="flex flex-row md:flex-row gap-4 w-full md:w-auto">

                    {/* Artist Filter */}
                    <div className="flex flex-col gap-2 w-full md:w-auto min-w-[140px]">
                        <label className="text-white/60 text-[10px] uppercase tracking-widest font-bold">
                            Artist
                        </label>

                        <select
                            value={selectedArtist}
                            onChange={e => setSelectedArtist(e.target.value)}
                            className="bg-black/20 border border-white/20 text-white text-xs p-2 uppercase tracking-widest outline-none focus:border-white transition-colors appearance-none"
                        >
                            <option value="all">All Artists</option>
                            {artists
                                .filter(artist => artist !== 'all')
                                .map(artist => (
                                    <option key={artist} value={artist}>
                                        {artist}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Sort By Filter */}
                    <div className="flex flex-col gap-2 w-full md:w-auto min-w-[140px]">
                        <label className="text-white/60 text-[10px] uppercase tracking-widest font-bold">
                            Sort By
                        </label>

                        <select
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value)}
                            className="bg-black/20 border border-white/20 text-white text-xs p-2 uppercase tracking-widest outline-none focus:border-white transition-colors appearance-none"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="title-asc">Title A-Z</option>
                            <option value="title-desc">Title Z-A</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="w-full bg-black py-8 border-b border-white/5 flex justify-center px-4 overflow-x-auto">
                <div className="flex gap-4 md:gap-8">
                    {categories.map((filter: string) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] transition-all pb-2 border-b-2 ${
                                activeFilter === filter
                                    ? 'text-[#B59431] border-[#B59431]'
                                    : 'text-white/40 border-transparent hover:text-white'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Artwork Grid */}
            <div className="w-full bg-black py-16 px-4 md:px-16">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-10 lg:gap-x-16 gap-y-12 md:gap-y-20 w-full items-start">

                    {displayedArtworks.map(art => (
                        <div
                            key={art._id}
                            onClick={() => setSelectedArt(art)}
                            className="flex flex-col group cursor-pointer"
                        >
                            <div className="relative w-full aspect-[4/5] rounded-sm overflow-hidden mb-4 md:mb-6 bg-white/5 border border-white/5 group-hover:border-[#FDDA2F]/40 transition-all shadow-2xl">
                                <Image
                                    src={art.src}
                                    alt={art.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />

                                {/* Overlay Hint */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-4">
                                    <span className="text-white font-bold tracking-[0.3em] uppercase border border-white/50 px-8 py-3 text-xs text-center backdrop-blur-sm">
                                        Enquire
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center text-center px-2 mb-4 md:mb-3">
                                <span className="text-[#FDDA2F] font-bold text-sm md:text-lg tracking-widest leading-tight uppercase group-hover:brightness-125 transition-all">
                                    {art.title}
                                </span>
                            </div>

                            <div className="flex flex-col items-center text-center px-2">
                                <span className="text-white/80 font-medium text-[10px] md:text-xs tracking-[0.2em] leading-tight uppercase">
                                    {art.artistName}{' '}
                                    {art.year
                                        ? `(${art.year}, ${art.medium})`
                                        : `(${art.medium})`}
                                </span>
                            </div>
                        </div>
                    ))}

                    {displayedArtworks.length === 0 && (
                        <div className="col-span-full py-40 text-center text-white/20 italic text-xs tracking-[0.3em] uppercase">
                            No pieces found{' '}
                            {selectedArtist !== 'all'
                                ? `by ${selectedArtist}`
                                : ''}{' '}
                            in the{' '}
                            {activeFilter !== 'all'
                                ? activeFilter
                                : 'collection'}.
                        </div>
                    )}
                </div>

                {/* Infinite Scroll Trigger */}
                {visibleCount < filteredArtworks.length && (
                    <div
                        ref={loadMoreRef}
                        className="w-full py-8 text-center text-white/40 text-xs uppercase tracking-widest"
                    >
                        Scroll to explore more
                    </div>
                )}

                {/* End of Collection */}
                {filteredArtworks.length > 0 &&
                    visibleCount >= filteredArtworks.length && (
                        <div className="w-full py-8 text-center text-white/20 text-xs uppercase tracking-widest">
                            You've reached the end of the collection
                        </div>
                    )}
            </div>

            <ContactSection />

            {/* Enquiry Modal */}
            <EnquiryModal
                isOpen={!!selectedArt}
                onClose={() => setSelectedArt(null)}
                artwork={selectedArt}
            />
        </main>
    );
}
