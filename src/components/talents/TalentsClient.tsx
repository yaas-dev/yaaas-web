"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Eye, Ear } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import TalentCarousel from '@/components/shared/TalentCarousel';
import EnquiryModal from '@/components/shared/EnquiryModal';
import ContactSection from '../home/ContactSection';

interface TalentsClientProps {
    initialTalents: any[];
}

function TalentsContent({ initialTalents }: TalentsClientProps) {
    const [selectedArt, setSelectedArt] = useState<any | null>(null);
    const [activeFilter, setActiveFilter] = useState('ALL');
    const searchParams = useSearchParams();

    useEffect(() => {
        const category = searchParams.get('category');
        if (category && ['VISUAL', 'SONIC'].includes(category.toUpperCase())) {
            setActiveFilter(category.toUpperCase());
        }
    }, [searchParams]);

    const filteredTalents = useMemo(() => {
        if (activeFilter === 'ALL') return initialTalents;
        return initialTalents.filter(talent => talent.category === activeFilter);
    }, [activeFilter, initialTalents]);

    return (
        <main className="min-h-screen bg-[#F1EFE8] flex flex-col pt-24 font-sans text-[#171717]">

            <div className="w-full bg-transparent py-6 md:py-8 mt-5 z-10">
                <div className="px-6 md:px-32">
                    <h1 className="text-[#171717] text-3xl md:text-[64px] uppercase tracking-widest">YAAAS CREATIVES</h1>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="w-full md:mx-16 px-6 md:px-12 relative z-20 -mt-8">

                {/* Filters Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 my-16 md:mr-20 border-b border-black/10 pb-8">
                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => setActiveFilter('ALL')}
                            className={`text-[10px] md:text-xs font-bold tracking-[0.2em] px-8 py-3 uppercase transition-all min-w-[100px] ${activeFilter === 'ALL' ? 'bg-[#B59431] text-black border border-[#B59431]' : 'bg-transparent text-[#171717] border border-black/20 hover:border-[#B59431]'}`}
                        >
                            All
                        </button>
                        {initialTalents.some(t => t.category === 'VISUAL') && (
                            <button
                                onClick={() => setActiveFilter('VISUAL')}
                                className={`text-[10px] md:text-xs font-bold tracking-[0.2em] px-8 py-3 uppercase transition-all min-w-[100px] ${activeFilter === 'VISUAL' ? 'bg-[#B59431] text-black border border-[#B59431]' : 'bg-transparent text-[#171717] border border-black/20 hover:border-[#B59431]'}`}
                            >
                                Visual
                            </button>
                        )}
                        {initialTalents.some(t => t.category === 'SONIC') && (
                            <button
                                onClick={() => setActiveFilter('SONIC')}
                                className={`text-[10px] md:text-xs font-bold tracking-[0.2em] px-8 py-3 uppercase transition-all min-w-[100px] ${activeFilter === 'SONIC' ? 'bg-[#B59431] text-black border border-[#B59431]' : 'bg-transparent text-[#171717] border border-black/20 hover:border-[#B59431]'}`}
                            >
                                Sonic
                            </button>
                        )}
                    </div>

                    {/* Icons Section matching the design screenshot */}
                    <div className="flex items-center gap-6 text-[#B59431]">
                        <AnimatePresence mode="wait">
                            {(activeFilter === 'ALL' || activeFilter === 'SONIC') && (
                                <motion.div
                                    key="ear"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 0.8, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative w-8 h-8 md:w-14 md:h-14">
                                        <Image
                                            src="/images/ear.png"
                                            alt="Ear"
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 32px, 56px"
                                        />
                                    </div>
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
                                    <div className="relative w-8 h-8 md:w-14 md:h-14">
                                        <Image
                                            src="/images/eye.png"
                                            alt="Eye"
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 768px) 32px, 56px"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-3 md:grid-cols-4 gap-x-3 sm:gap-x-6 md:gap-x-12 lg:gap-x-16 gap-y-8 md:gap-y-16 w-full mb-16 min-h-[400px]">
                    {filteredTalents.map((talent) => (
                        <Link
                            href={`/talents/${talent.slug}`}
                            key={talent._id}
                            className="flex flex-col group cursor-pointer"
                        >
                            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] rounded-lg overflow-hidden mb-2 md:mb-4 bg-white/5">
                                <Image
                                    src={talent.headshot}
                                    alt={talent.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="33vw"
                                />

                                {/* Overlay Hint */}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <span className="text-white text-[8px] sm:text-[10px] md:text-sm font-bold tracking-widest uppercase border border-black/100 px-2 md:px-6 py-2 text-center">View Profile</span>
                                </div>
                            </div>
                            <div className="flex flex-col pl-1">
                                <span className="text-[#B59431] font-bold text-[10px] sm:text-xs md:text-[15px] tracking-wide mb-0.5 md:mb-1 truncate uppercase">{talent.name}</span>
                                <span className="text-[#B59431]/80 font-medium text-[9px] sm:text-[10px] md:text-sm tracking-wide truncate uppercase">{talent.type}</span>
                            </div>
                        </Link>
                    ))}

                    {/* Empty State */}
                    {filteredTalents.length === 0 && (
                        <div className="col-span-3 flex flex-col items-center justify-center py-20 text-[#77746D] italic">
                            No talents found in this category.
                        </div>
                    )}
                </div>
            </div>

            <ContactSection />

            <EnquiryModal
                isOpen={!!selectedArt}
                onClose={() => setSelectedArt(null)}
                artwork={selectedArt}
            />
        </main>
    );
}

export default function TalentsClient({ initialTalents }: TalentsClientProps) {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#B59431] border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <TalentsContent initialTalents={initialTalents} />
        </Suspense>
    );
}
