"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import EnquiryModal from '@/components/shared/EnquiryModal';
import { ChevronLeft, ChevronRight } from "lucide-react";

const cardLayouts = [
    { x: "-200%", scale: 0.5, zIndex: 0, opacity: 0 },
    { x: "-140%", scale: 0.7, zIndex: 10, opacity: 0.5 },
    { x: "-75%", scale: 0.85, zIndex: 20, opacity: 0.8 },
    { x: "0%", scale: 1.15, zIndex: 50, opacity: 1 },    // The main central card
    { x: "75%", scale: 0.85, zIndex: 20, opacity: 0.8 },
    { x: "140%", scale: 0.7, zIndex: 10, opacity: 0.5 },
    { x: "200%", scale: 0.5, zIndex: 0, opacity: 0 },
];

interface ArtCatalogueProps {
    initialArtworks?: any[];
}

const ArtCatalogue = ({ initialArtworks = [] }: ArtCatalogueProps) => {
    // We need exactly 7 items for the 3D rotating layout defined by cardLayouts.
    // If we have fewer than 7, we repeat items. If more, we take the first 7.
    const normalizedArtworks = useMemo(() => {
        const visualArtworks = initialArtworks.filter(art =>
            ['painting', 'photography', 'sculpture'].includes(art.medium)
        );

        if (visualArtworks.length === 0) return [];
        let items = [...visualArtworks];
        while (items.length < 7) {
            items = [...items, ...visualArtworks];
        }
        return items.slice(0, 7);
    }, [initialArtworks]);

    const [cards, setCards] = useState(normalizedArtworks);
    const [selectedArt, setSelectedArt] = useState<any | null>(null);

    const slideNext = () => {
        setCards((prevItems) => {
            const newItems = [...prevItems];
            const firstItem = newItems.shift();
            if (firstItem) newItems.push(firstItem);
            return newItems;
        });
    };

    const slidePrev = () => {
        setCards((prevItems) => {
            const newItems = [...prevItems];
            const lastItem = newItems.pop();
            if (lastItem) newItems.unshift(lastItem);
            return newItems;
        });
    };

    // Synchronize local state with props when they change
    useEffect(() => {
        setCards(normalizedArtworks);
    }, [normalizedArtworks]);

    useEffect(() => {
        // Pause carousel when modal is open or if no cards
        if (selectedArt || cards.length === 0) return;

        const interval = setInterval(slideNext, 2500); // 2.5s interval

        return () => clearInterval(interval);
    }, [selectedArt, cards.length]);

    if (cards.length === 0) {
        return null; // Don't show the component if no art
    }

    return (
        <div className="bg-black overflow-hidden relative flex flex-col justify-center w-full h-[520px] group">

            {/* Stacked Gallery Container */}
            <div className="relative w-full md:max-w-[1200px] mx-auto flex items-center justify-center h-[280px] md:h-[520px]">
                {/* Navigation Arrows */}
                <button
                    onClick={(e) => { e.stopPropagation(); slidePrev(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-[60] p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); slideNext(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-[60] p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                >
                    <ChevronRight size={24} />
                </button>

                <AnimatePresence>
                    {cards.map((item, index) => {
                        const layout = cardLayouts[index];
                        const isCenter = index === 3;

                        return (
                            <motion.div
                                key={`${item._id}-${index}`}
                                className="absolute w-[250px] h-[240px] sm:w-[220px] sm:h-[320px] md:w-[500px] md:h-[500px] cursor-pointer"
                                style={{ zIndex: layout.zIndex }}
                                animate={{
                                    opacity: layout.opacity,
                                    x: layout.x,
                                    scale: layout.scale,
                                    borderColor: isCenter ? "transparent" : "transparent",
                                    // boxShadow: isCenter ? "0 0 40px 10px rgba(253,218,47,0.3)" : "0 20px 25px -5px rgba(0,0,0,0.5)",
                                }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                onClick={() => setSelectedArt(item)}
                            >
                                <div className={`w-full h-full bg-black relative overflow-hidden `}>
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 968px) 50vw, 50vw"
                                    />

                                    {/* Side card dark overlay */}
                                    {!isCenter && (
                                        <div className="absolute inset-0 bg-black/50 mix-blend-overlay transition-opacity duration-700"></div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            <EnquiryModal
                isOpen={!!selectedArt}
                onClose={() => setSelectedArt(null)}
                artwork={selectedArt}
            />
        </div>
    );
};

export default ArtCatalogue;

