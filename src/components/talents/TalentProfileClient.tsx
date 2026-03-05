"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Globe, ChevronLeft } from 'lucide-react';
import EnquiryModal from '@/components/shared/EnquiryModal';

interface TalentProfileClientProps {
    artist: any;
}

export default function TalentProfileClient({ artist }: TalentProfileClientProps) {
    const [selectedArt, setSelectedArt] = useState<any | null>(null);

    return (
        <main className="min-h-screen bg-black flex flex-col pt-24 font-sans text-white">

            {/* Split Hero Bio Section */}
            <div className="w-full max-w-[1400px] mx-auto flex flex-col pt-10 md:pt-16 px-6 md:px-12 mb-24">

                {/* Back Button */}
                <div className="mb-8">
                    <Link href="/talents" className="inline-flex items-center text-[#FDDA2F] font-bold tracking-widest text-xs uppercase hover:text-white transition-colors">
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
                        <h1 className="text-[#FDDA2F] text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-widest leading-none mb-2">
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
                            {artist.socials?.x && (
                                <a href={artist.socials.x} target="_blank" rel="noreferrer" className="hover:text-[#FDDA2F] transition-colors">
                                    <Twitter size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {artist.socials?.instagram && (
                                <a href={artist.socials.instagram} target="_blank" rel="noreferrer" className="hover:text-[#FDDA2F] transition-colors">
                                    <Instagram size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {artist.socials?.linkedin && (
                                <a href={artist.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#FDDA2F] transition-colors">
                                    <Linkedin size={20} strokeWidth={1.5} />
                                </a>
                            )}
                            {artist.socials?.website && (
                                <a href={artist.socials.website} target="_blank" rel="noreferrer" className="hover:text-[#FDDA2F] transition-colors">
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
                    <div className="h-1 w-[160px] md:w-[240px] bg-[#FDDA2F]"></div>
                </div>
            </div>

            {/* Custom Art Catalogue Grid */}
            <div className="w-full bg-black px-4 md:px-12 flex justify-center pb-32">
                <div className="grid grid-cols-3 gap-x-3 sm:gap-x-6 md:gap-x-10 lg:gap-x-16 gap-y-8 md:gap-y-16 max-w-[1200px] w-full">
                    {artist.artworks?.map((art: any) => (
                        <div
                            key={art._id}
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
                                <span className="text-[#FDDA2F] font-bold text-[10px] sm:text-xs md:text-[15px] tracking-wide mb-0.5 md:mb-1 leading-tight md:leading-normal uppercase">{art.artistName}</span>
                                <span className="text-[#FDDA2F] font-medium text-[8px] sm:text-[10px] md:text-sm tracking-wide leading-tight md:leading-normal uppercase">{art.title}</span>
                            </div>
                        </div>
                    ))}

                    {(!artist.artworks || artist.artworks.length === 0) && (
                        <div className="col-span-3 py-20 text-center text-white/20 italic text-sm tracking-widest uppercase">
                            No artworks currently listed for this artist.
                        </div>
                    )}
                </div>
            </div>

            {/* Reused Enquiry Modal */}
            <EnquiryModal
                isOpen={!!selectedArt}
                onClose={() => setSelectedArt(null)}
                artwork={selectedArt}
            />

        </main>
    );
}
