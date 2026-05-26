"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Twitter, Instagram, Linkedin, Globe, ChevronLeft } from 'lucide-react';
import EnquiryModal from '@/components/shared/EnquiryModal';
import ContactSection from '../home/ContactSection';

interface TalentProfileClientProps {
    artist: any;
}

export default function TalentProfileClient({ artist }: TalentProfileClientProps) {
    const [selectedArt, setSelectedArt] = useState<any | null>(null);

    const isSonic = artist.category === 'SONIC';

    // Filter artworks based on category
    const releases = artist.artworks?.filter((art: any) => art.medium === 'release') || [];
    const events = artist.artworks?.filter((art: any) => art.medium === 'event') || [];
    const visualArtworks = artist.artworks || [];

    return (
        <main className="min-h-screen bg-black flex flex-col pt-24 font-sans text-white">

            {/* Split Hero Bio Section */}
            <div className="w-full max-w-[1400px] mx-auto flex flex-col pt-10 md:pt-16 px-6 md:px-12 mb-24">

                {/* Back Button */}
                <div className="mb-8">
                    <Link href="/talents" className="inline-flex items-center text-[#FDDA2F] font-bold tracking-widest text-xs uppercase hover:text-white transition-colors">
                        <ChevronLeft size={16} className="mr-2" />
                        Back to Creatives
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
                                    < Twitter size={20} strokeWidth={1.5} />
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

                        {/* Stream & Work Links */}
                        {artist.musicLinks && artist.musicLinks.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-8">
                                {artist.musicLinks.map((link: any, index: number) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-[#FDDA2F] text-black px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                                        {link.platform}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            {!isSonic ? (
                <>
                    {/* Visual Artist Layout: Art Catalogue */}
                    <div className="w-full flex justify-center mb-16 border-t border-white/10 pt-16">
                        <div className="max-w-[1400px] w-full px-6 md:px-12">
                            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-[0.15em] mb-4">
                                ART CATALOGUE
                            </h2>
                            <div className="h-1 w-[160px] md:w-[240px] bg-[#FDDA2F]"></div>
                        </div>
                    </div>

                    <div className="w-full bg-black px-4 md:px-12 flex justify-center pb-32">
                        <div className="grid grid-cols-3 gap-x-3 sm:gap-x-6 md:gap-x-10 lg:gap-x-16 gap-y-8 md:gap-y-16 max-w-[1200px] w-full">
                            {visualArtworks.map((art: any) => (
                                <div
                                    key={art._id}
                                    onClick={() => {
                                        if (art.externalLink) {
                                            window.open(art.externalLink, '_blank');
                                        } else {
                                            setSelectedArt(art);
                                        }
                                    }}
                                    className="flex flex-col group cursor-pointer"
                                >
                                    <div className="flex flex-col items-start px-1 mb-2 md:mb-4">
                                        <span className="text-[#FDDA2F] font-bold text-[10px] sm:text-xs md:text-[15px] tracking-wide leading-tight md:leading-normal uppercase group-hover:brightness-125 transition-all">{art.title}</span>
                                    </div>

                                    <div className="relative w-full aspect-[4/5] md:aspect-[4/3] rounded-sm overflow-hidden mb-2 md:mb-4 bg-white/5 border border-white/5 group-hover:border-[#FDDA2F]/30 transition-all">
                                        <Image
                                            src={art.src}
                                            alt={art.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="33vw"
                                        />
                                        {art.externalLink && (
                                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all z-10">
                                                <Globe size={14} className="text-[#FDDA2F]" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-1 md:p-2">
                                            <span className="text-white font-bold tracking-widest uppercase border border-white/50 px-2 py-1 md:px-6 md:py-2 text-[8px] sm:text-[10px] md:text-sm text-center">
                                                {art.externalLink ? 'View' : 'Enquire'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col pl-1">
                                        <span className="text-white font-medium text-[8px] sm:text-[10px] md:text-sm tracking-wide leading-tight md:leading-normal uppercase">
                                            {art.artistName} {art.year ? `(${art.year}, ${art.medium})` : `(${art.medium})`}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {visualArtworks.length === 0 && (
                                <div className="col-span-3 py-20 text-center text-white/20 italic text-sm tracking-widest uppercase">
                                    No artworks currently listed for this artist.
                                </div>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* Sonic Artist Layout: Releases & Events */}

                    {/* Latest Releases Section */}
                    <div className="w-full flex justify-center mb-16 border-t border-white/10 pt-16">
                        <div className="max-w-[1400px] w-full px-6 md:px-12">
                            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-[0.15em] mb-4">
                                LATEST RELEASES
                            </h2>
                            <div className="h-1 w-[160px] md:w-[240px] bg-[#FDDA2F]"></div>
                        </div>
                    </div>

                    <div className="w-full bg-black px-4 md:px-12 flex justify-center mb-24">
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-x-6 md:gap-x-12 gap-y-12 max-w-[1000px] w-full">
                            {releases.map((art: any) => (
                                <div
                                    key={art._id}
                                    onClick={() => {
                                        if (art.externalLink) {
                                            window.open(art.externalLink, '_blank');
                                        } else {
                                            setSelectedArt(art);
                                        }
                                    }}
                                    className="flex flex-col group cursor-pointer items-start"
                                >
                                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-white/5 border border-white/10 shadow-2xl">
                                        <Image
                                            src={art.src}
                                            alt={art.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="50vw"
                                        />
                                        {art.externalLink && (
                                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all">
                                                <Globe size={14} className="text-[#FDDA2F]" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[#FDDA2F] font-bold text-xs md:text-sm tracking-widest mb-1 uppercase">{art.artistName}</span>
                                        <span className="text-white font-bold text-sm md:text-lg tracking-widest uppercase">{art.title}</span>
                                    </div>
                                </div>
                            ))}
                            {releases.length === 0 && (
                                <div className="col-span-2 py-20 text-center text-white/20 italic text-sm tracking-widest uppercase">
                                    No releases listed yet.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Events Section */}
                    <div className="w-full flex justify-center mb-16 pt-16">
                        <div className="max-w-[1400px] w-full px-6 md:px-12">
                            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-[0.15em] mb-4">
                                RECENT EVENTS
                            </h2>
                            <div className="h-1 w-[160px] md:w-[240px] bg-[#FDDA2F]"></div>
                        </div>
                    </div>

                    <div className="w-full bg-black px-4 md:px-12 flex flex-col items-center gap-12 pb-32">
                        <div className="max-w-[1200px] w-full flex flex-col gap-12">
                            {events.map((art: any) => (
                                <div key={art._id} className="w-full flex flex-col md:flex-row gap-6 lg:gap-12 items-center bg-[#0d0d0c] rounded-2xl overflow-hidden border border-white/5 relative group transition-all duration-500 hover:border-white/10">
                                    {/* Image Side */}
                                    <div className="w-full md:w-1/2 h-[250px] md:h-[400px] relative overflow-hidden">
                                        <Image
                                            src={art.src}
                                            alt={art.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                    </div>

                                    {/* Content Side */}
                                    <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-8 md:py-0 text-left h-full">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-[#FDDA2F] text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold">Event</span>
                                        </div>

                                        <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight uppercase tracking-[0.15em]">
                                            {art.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm md:text-base tracking-wide leading-relaxed mb-10 max-w-lg line-clamp-3">
                                            {art.description || "An exclusive event showcasing the unique sound and performance art of our represented talent."}
                                        </p>

                                        <div
                                            onClick={() => {
                                                if (art.externalLink) {
                                                    window.open(art.externalLink, '_blank');
                                                } else {
                                                    setSelectedArt(art);
                                                }
                                            }}
                                            className="group/btn flex items-center gap-3 w-fit cursor-pointer"
                                        >
                                            <span className="text-white text-xs uppercase tracking-[0.2em] font-bold group-hover/btn:text-[#FDDA2F] transition-colors">
                                                {art.externalLink ? 'Listen / View' : 'View Event'}
                                            </span>
                                            <div className="w-8 h-[1px] bg-white group-hover/btn:bg-[#FDDA2F] transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {events.length === 0 && (
                                <div className="py-20 text-center text-white/20 italic text-sm tracking-widest uppercase">
                                    No recent events listed yet.
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            <ContactSection />

            {/* Reused Enquiry Modal */}
            <EnquiryModal
                isOpen={!!selectedArt}
                onClose={() => setSelectedArt(null)}
                artwork={selectedArt}
            />

        </main>
    );
}
