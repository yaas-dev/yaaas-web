"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UpcomingEvents() {
    return (
        <section className="bg-black text-white py-24 w-full overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header Section */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold tracking-[0.15em] uppercase mb-4 md:mb-6">
                        UPCOMING EVENTS
                    </h2>
                    <div className="w-64 md:w-80 h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* Subtitle */}
                <div className="mb-12 md:mb-16">
                    <p className="text-[15px] md:text-[17px] font-medium tracking-wide text-gray-100">
                        Our previous work includes curating for Papi Wata, Mr Eazi and more.
                    </p>
                </div>

                {/* Image Placeholders (Stacked Horizontally) */}
                <div className="flex flex-col w-full mb-16 shadow-2xl">
                    <motion.div 
                        className="w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[2.5/1] bg-gray-800 flex items-center justify-center border-b-[4px] border-black"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Replace with actual top image e.g. <Image src="..." fill className="object-cover" /> */}
                        <span className="text-gray-400 font-bold tracking-widest text-sm text-center px-4">TOP HORIZONTAL IMAGE PLACEHOLDER</span>
                    </motion.div>

                    <motion.div 
                        className="w-full aspect-[4/3] sm:aspect-[2/1] md:aspect-[2.5/1] bg-gray-800 flex items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                         {/* Replace with actual bottom image e.g. <Image src="..." fill className="object-cover" /> */}
                         <span className="text-gray-400 font-bold tracking-widest text-sm text-center px-4">BOTTOM HORIZONTAL IMAGE PLACEHOLDER</span>
                    </motion.div>
                </div>

                {/* Button Section */}
                <div className="flex justify-center flex-col items-center">
                    <Link
                        href="/gallery"
                        className="bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded font-extrabold text-[12px] md:text-[14px] tracking-[0.15em] hover:bg-gray-200 transition-all uppercase shadow-lg text-center"
                    >
                        VIEW FULL GALLERY
                    </Link>
                </div>
            </div>
        </section>
    );
}
