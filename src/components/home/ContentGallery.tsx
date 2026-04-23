"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";

interface ContentGalleryProps {
    contents?: any[];
}

export default function ContentGallery({ contents = [] }: ContentGalleryProps) {
    const contentSlides = contents.map((content) => (
        <div key={content._id} className="w-full h-full flex flex-col md:flex-row gap-6 lg:gap-12 items-center bg-[#0d0d0c] rounded-2xl overflow-hidden border border-white/5">
            {/* Image Side */}
            <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden group">
                <Image
                    src={content.mainImage}
                    alt={content.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-8 md:py-0 text-left h-full">
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-[#B59431] text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold">{content.category}</span>
                </div>

                <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-playfair font-bold mb-6 leading-tight uppercase tracking-widest">
                    {content.title}
                </h3>

                <p className="text-gray-400 text-sm md:text-base tracking-wide leading-relaxed mb-10 max-w-lg line-clamp-3">
                    {content.description}
                </p>
            </div>
        </div>
    ));

    return (
        <section id="projects" className="lg:min-h-screen bg-black overflow-hidden flex flex-col justify-center">
            <div className="flex flex-col h-full w-[100%] mx-auto">

                {/* Section Header */}
                <div className="w-full relative pt-4 md:pt-8 mb-8 md:mb-12 z-50">
                    <h2 className="text-2xl md:text-4xl lg:text-[44px] font-normal tracking-[0.15em] uppercase text-white mb-2 ml-[10%]">
                        YAAAS CONTENTS
                    </h2>
                    <div className="w-[75%] md:w-[32%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* Contents Carousel */}
                <div className="w-full h-[60vh] min-h-[450px] md:h-[70vh] mb-8 relative">
                    {contents.length > 0 ? (
                        <Carousel
                            items={contentSlides}
                            autoPlay={true}
                            interval={6000}
                            showArrows={true}
                            showDots={true}
                        />

                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 italic uppercase tracking-widest text-xs border border-white/5 rounded-2xl mx-10">
                            No contents featured yet.
                        </div>
                    )}
                </div>
                <Link
                    href={`/contents`}
                    className="group flex items-center justify-end gap-3 mr-4"
                >
                    <span className="text-white text-xs uppercase tracking-[0.2em] font-bold group-hover:text-[#B59431] transition-colors">
                        View All Contents
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform text-white text-xs uppercase tracking-[0.2em] font-bold">→</span>
                </Link>
            </div>
        </section>
    );
}

