"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const stackItems = [
    { id: 'l3', x: "-180%", scale: 0.65, zIndex: 10, frame: 'bg-white', art: 'bg-gradient-to-br from-cyan-300 to-blue-400' },
    { id: 'l2', x: "-120%", scale: 0.75, zIndex: 20, frame: 'bg-[#FFF2D0]', art: 'bg-gradient-to-br from-purple-800 to-indigo-900' },
    { id: 'l1', x: "-60%", scale: 0.85, zIndex: 30, frame: 'bg-white', art: 'bg-gradient-to-br from-slate-900 to-blue-900' },
    { id: 'r1', x: "60%", scale: 0.85, zIndex: 30, frame: 'bg-white', art: 'bg-gradient-to-br from-blue-500 to-cyan-500' },
    { id: 'r2', x: "120%", scale: 0.75, zIndex: 20, frame: 'bg-white', art: 'bg-gradient-to-br from-blue-700 to-blue-400' },
    { id: 'r3', x: "180%", scale: 0.65, zIndex: 10, frame: 'bg-white', art: 'bg-gradient-to-br from-blue-800 to-[#B59431]' },
];

const ArtCatalogue = () => {
    return (
        <section id="catalogue" className="bg-black py-24 overflow-hidden relative min-h-[80vh] flex flex-col justify-center">
            {/* Header Section */}
            <div className="w-full absolute top-12 md:top-24 left-0 z-50">
                <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold tracking-[0.15em] uppercase text-white mb-4 md:mb-6 ml-[10%]">
                    ART CATALOGUE
                </h2>
                <div className="w-[75%] md:w-[45%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
            </div>

            {/* Stacked Gallery Container */}
            <div className="relative w-full max-w-[1400px] mx-auto flex items-center justify-center mt-32 h-[400px] md:h-[600px]">

                {/* Background Cards */}
                {stackItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className={`absolute ${item.frame} w-[160px] h-[240px] sm:w-[220px] sm:h-[320px] md:w-[280px] md:h-[400px] p-2 md:p-4 shadow-2xl`}
                        style={{ zIndex: item.zIndex }}
                        initial={{ opacity: 0, x: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, x: item.x, scale: item.scale }}
                        transition={{ duration: 0.8, delay: 0.1 * index, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className={`w-full h-full border border-black/30 ${item.art} relative overflow-hidden opacity-90 backdrop-blur-sm`}>
                        </div>
                    </motion.div>
                ))}

                {/* Central Featured Card */}
                <motion.div
                    className="relative z-50 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[460px] md:h-[460px] border-[5px] border-[#00B7FF] shadow-[0_0_40px_10px_rgba(0,183,255,0.3)] bg-[#9BA7AC] p-6 lg:p-10 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* The Actual Art Container */}
                    <div className="relative w-full h-full border border-black shadow-2xl overflow-hidden bg-gradient-to-br from-teal-500 via-cyan-700 to-blue-900">
                        {/* Blur overlay to perfectly mimic the foggy center art in reference */}
                        <div className="absolute inset-0 backdrop-blur-[6px] bg-white/10"></div>
                        <div className="absolute inset-0 bg-teal-900 mix-blend-overlay opacity-50"></div>
                    </div>

                    {/* View Catalogue ButtonOverlay */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <Link
                            href="/catalogue"
                            className="bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded font-extrabold text-xs md:text-sm tracking-[0.15em] hover:bg-gray-100 transition-all uppercase shadow-2xl"
                        >
                            VIEW CATALOGUE
                        </Link>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default ArtCatalogue;
