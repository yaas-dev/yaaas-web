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
        <div key={content._id} className="w-full h-full flex flex-col md:flex-row gap-6 lg:gap-12 items-center bg-white rounded-2xl overflow-hidden border border-black/10 shadow-sm">
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

                <h3 className="text-[#171717] text-2xl md:text-3xl lg:text-4xl font-playfair font-bold mb-6 leading-tight uppercase tracking-widest">
                    {content.title}
                </h3>

                <p className="text-[#66635D] text-sm md:text-base tracking-wide leading-relaxed mb-10 max-w-lg line-clamp-3">
                    {content.description}
                </p>
            </div>
        </div>
    ));

    return (
        <section id="projects" className="bg-[#F7F6F1] py-14 md:py-20 overflow-hidden">
            <div className="mx-auto max-w-7xl w-full px-5 md:px-8">

                {/* Section Header */}
                <div className="w-full relative mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.1em] uppercase text-[#171717] mb-2">
                        SELECTED PROJECTS
                    </h2>
                    <div className="w-20 h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* Contents Carousel */}
                <div className="w-full h-[420px] md:h-[480px] mb-5 relative">
                    {contents.length > 0 ? (
                        <Carousel
                            items={contentSlides}
                            autoPlay={true}
                            interval={6000}
                            showArrows={true}
                            showDots={true}
                        />

                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-black/30 italic uppercase tracking-widest text-xs border border-black/10 rounded-2xl mx-10">
                            No projects featured yet.
                        </div>
                    )}
                </div>
                <Link
                    href={`/contents`}
                    className="group flex items-center justify-end gap-3"
                >
                    <span className="text-[#171717] text-xs uppercase tracking-[0.2em] font-bold group-hover:text-[#B59431] transition-colors">
                        View All Projects
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform text-[#171717] text-xs uppercase tracking-[0.2em] font-bold">→</span>
                </Link>
            </div>
        </section>
    );
}

