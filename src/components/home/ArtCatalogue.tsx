"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import EnquiryModal, { Artwork } from '@/components/shared/EnquiryModal';

const cardLayouts = [
    { x: "-200%", scale: 0.5, zIndex: 0, opacity: 0 },
    { x: "-140%", scale: 0.7, zIndex: 10, opacity: 0.5 },
    { x: "-75%", scale: 0.85, zIndex: 20, opacity: 0.8 },
    { x: "0%", scale: 1.15, zIndex: 50, opacity: 1 },    // The main central card
    { x: "75%", scale: 0.85, zIndex: 20, opacity: 0.8 },
    { x: "140%", scale: 0.7, zIndex: 10, opacity: 0.5 },
    { x: "200%", scale: 0.5, zIndex: 0, opacity: 0 },
];

const initialCardData: Artwork[] = [
    { id: 1, src: '/images/service_1.png', artist: 'Artist Name', title: 'Abstract Blue' },
    { id: 2, src: '/images/service_2.png', artist: 'Artist Name', title: 'Golden Hour' },
    { id: 3, src: '/images/service_3.png', artist: 'Artist Name', title: 'Ocean Deep' },
    { id: 4, src: '/images/service_1.png', artist: 'Artist Name', title: 'Modern Flux' },
    { id: 5, src: '/images/service_2.png', artist: 'Artist Name', title: 'Urban Edge' },
    { id: 6, src: '/images/service_3.png', artist: 'Artist Name', title: 'Digital Media' },
    { id: 7, src: '/images/service_1.png', artist: 'Artist Name', title: 'Mixed Media' },
];

const ArtCatalogue = () => {
    const [cards, setCards] = useState(initialCardData);
    const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);

    useEffect(() => {
        // Pause carousel when modal is open
        if (selectedArt) return;

        const interval = setInterval(() => {
            setCards((prevItems) => {
                const newItems = [...prevItems];
                const firstItem = newItems.shift();
                if (firstItem) newItems.push(firstItem);
                return newItems;
            });
        }, 2500); // 2.5s interval

        return () => clearInterval(interval);
    }, [selectedArt]);

    return (
        <section id="catalogue" className="bg-black py-4 overflow-hidden relative flex flex-col justify-center">

            {/* Stacked Gallery Container */}
            <div className="relative w-full max-w-[1400px] mx-auto flex items-center justify-center mt-2 h-[450px] md:h-[600px]">

                <AnimatePresence>
                    {cards.map((item, index) => {
                        const layout = cardLayouts[index];
                        const isCenter = index === 3;

                        return (
                            <motion.div
                                key={item.id}
                                className="absolute bg-white w-[160px] h-[240px] sm:w-[220px] sm:h-[320px] md:w-[280px] md:h-[400px] p-2 md:p-3 shadow-2xl border-[4px] cursor-pointer"
                                style={{ zIndex: layout.zIndex }}
                                animate={{
                                    opacity: layout.opacity,
                                    x: layout.x,
                                    scale: layout.scale,
                                    borderColor: isCenter ? "#00B7FF" : "transparent",
                                    boxShadow: isCenter ? "0 0 40px 10px rgba(0,183,255,0.3)" : "0 20px 25px -5px rgba(0,0,0,0.5)",
                                }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                onClick={() => setSelectedArt(item)}
                            >
                                <div className={`w-full h-full border border-black/30 bg-black relative overflow-hidden backdrop-blur-sm`}>
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 33vw"
                                    />

                                    {/* Side card dark overlay */}
                                    {!isCenter && (
                                        <div className="absolute inset-0 bg-black/50 mix-blend-overlay transition-opacity duration-700"></div>
                                    )}

                                    {/* Button overlay shown only on center card */}
                                    <AnimatePresence>
                                        {isCenter && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ delay: 0.3, duration: 0.4 }}
                                                className="absolute inset-0 flex items-center justify-center z-10 bg-black/10 hover:bg-black/30 transition-colors"
                                            >
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedArt(item);
                                                    }}
                                                    className="bg-white text-black px-6 py-3 rounded font-extrabold text-[#000] text-xs tracking-[0.15em] hover:bg-[#ebf8ff] uppercase shadow-2xl transition-colors"
                                                >
                                                    ENQUIRE
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
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
        </section>
    );
};

export default ArtCatalogue;
