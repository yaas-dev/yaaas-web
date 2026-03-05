"use client";

import React, { useState, use } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Globe, ChevronLeft } from 'lucide-react';
import EnquiryModal, { Artwork } from '@/components/shared/EnquiryModal';

// --- API MOCK DATA ---
// Plan: Later this will be replaced with an async fetch(API_URL) inside Server Component.
// For now, we mock the exact structure requested for 'Eolia' to build the UI against.
const mockArtistDatabase: Record<string, any> = {
    'eolia': {
        id: 'eolia',
        name: 'EOLIA',
        type: '[ THE VISUAL ]',
        headshot: '/images/talents/painting.png', // Fallback, using our talent images
        bio: [
            "In a deliberately restricted blue color palette, Eolia creates serene paintings that draw the viewer in and invite them to pause, breathe and escape.",
            "In the intimacy of her Kamara studio, Eolia has developed her very own techniques in a style that can be described as figurative abstraction. With great attention to detail, the self-taught artist layers paper, fabric, and found materials into cohesive compositions that represent the fragmented aspects of life: our memories, experiences, and sensibilities."
        ],
        socials: {
            x: '#',
            instagram: '#',
            linkedin: '#',
            website: '#',
        },
        artworks: [
            { id: 101, src: '/images/service_1.png', artist: 'EOLIA', title: 'Serene Blue I' },
            { id: 102, src: '/images/service_2.png', artist: 'EOLIA', title: 'Kamara Abstraction' },
            { id: 103, src: '/images/service_3.png', artist: 'EOLIA', title: 'Memory Fragments' },
            { id: 104, src: '/images/service_1.png', artist: 'EOLIA', title: 'Blue Shift II' },
            { id: 105, src: '/images/service_2.png', artist: 'EOLIA', title: 'Figurative Details' },
            { id: 106, src: '/images/service_3.png', artist: 'EOLIA', title: 'Sensibility Depth' },
        ]
    }
};

export default function SingleTalentPage({ params }: { params: Promise<{ slug: string }> }) {
    const unwrappedParams = use(params);
    // Look up artist in mock DB. If not found, 404.
    const artist = mockArtistDatabase[unwrappedParams.slug.toLowerCase()];

    // Fallback if missing route
    if (!artist) {
        notFound();
    }

    const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);

    return (
        <main className="min-h-screen bg-black flex flex-col pt-24 font-sans text-white">

            {/* Split Hero Bio Section */}
            <div className="w-full max-w-[1400px] mx-auto flex flex-col pt-10 md:pt-16 px-6 md:px-12 mb-24">

                {/* Back Button */}
                <div className="mb-8">
                    <Link href="/talents" className="inline-flex items-center text-[#d8b511] font-bold tracking-widest text-xs uppercase hover:text-white transition-colors">
                        <ChevronLeft size={16} className="mr-2" />
                        Back to Talents
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left: Portrait/Feature Image */}
                    <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] overflow-hidden rounded-sm border border-white/10 shadow-2xl">
                        <Image
                            src={artist.headshot}
                            alt={`${artist.name} Portrait`}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>

                    {/* Right: Artist Meta & Bio */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-[#d8b511] text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-widest leading-none mb-2">
                            {artist.name}
                        </h1>
                        <p className="text-white/60 text-xs md:text-sm tracking-[0.3em] font-bold uppercase mb-10">
                            {artist.type}
                        </p>

                        <div className="flex flex-col gap-6 text-[#e0e0e0] font-light text-sm md:text-base leading-relaxed max-w-[600px] mb-12">
                            {artist.bio.map((paragraph: string, index: number) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        {/* Social Icons Row */}
                        <div className="flex items-center gap-6 text-white/70">
                            {artist.socials.x && (
                                <a href={artist.socials.x} target="_blank" rel="noreferrer" className="hover:text-[#d8b511] transition-colors">
                                    <Twitter size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {artist.socials.instagram && (
                                <a href={artist.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-[#d8b511] transition-colors">
                                    <Instagram size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {artist.socials.linkedin && (
                                <a href={artist.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#d8b511] transition-colors">
                                    <Linkedin size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {artist.socials.website && (
                                <a href={artist.socials.website} target="_blank" rel="noreferrer" className="hover:text-[#d8b511] transition-colors">
                                    <Globe size={20} strokeWidth={1.5} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-Header Title */}
            <div className="w-full flex justify-center mb-16 border-t border-white/10 pt-16">
                <div className="max-w-[1400px] w-full px-6 md:px-12">
                    <h2 className="text-white text-3xl md:text-4xl font-bold tracking-[0.15em] mb-4">
                        ART CATALOGUE
                    </h2>
                    {/* Unique Gold Line Accent */}
                    <div className="h-1 w-[160px] md:w-[240px] bg-[#d8b511]"></div>
                </div>
            </div>

            {/* Custom Art Catalogue Grid (Inherited logic from full catalogue) */}
            <div className="w-full bg-black px-4 md:px-12 flex justify-center pb-32">
                <div className="grid grid-cols-3 gap-x-3 sm:gap-x-6 md:gap-x-10 lg:gap-x-16 gap-y-8 md:gap-y-16 max-w-[1200px] w-full">
                    {artist.artworks.map((art: Artwork) => (
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

            {/* Reused Enquiry Modal */}
            <EnquiryModal
                isOpen={!!selectedArt}
                onClose={() => setSelectedArt(null)}
                artwork={selectedArt as Artwork}
            />

        </main>
    );
}
