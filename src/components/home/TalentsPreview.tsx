"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const talents = [
    {
        title: "PHOTOGRAPHY",
        image: "/images/talents/photography.png",
        href: "/talents/photography"
    },
    {
        title: "PAINTING",
        image: "/images/talents/painting.png",
        href: "/talents/painting"
    },
    {
        title: "MUSIC",
        image: "/images/talents/music.png",
        href: "/talents/music"
    },
    {
        title: "STRING ART & SCULPTING",
        image: "/images/talents/sculpting.png",
        href: "/talents/sculpting"
    }
];

export default function TalentsPreview() {
    return (
        <section id="talents" className="py-24 bg-black">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Section Header */}
                <div className="mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold tracking-[0.15em] uppercase text-white mb-4 md:mb-6">
                        YAAAS TALENTS
                    </h2>
                    <div className="w-64 md:w-80 h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* Talents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {talents.map((talent, index) => (
                        <Link
                            key={index}
                            href={talent.href}
                            className="group relative h-[400px] md:h-[500px] overflow-hidden rounded-xl block shadow-xl border border-white/5"
                        >
                            <Image
                                src={talent.image}
                                alt={talent.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />

                            {/* Category Text */}
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <h3 className="text-[#B59431] text-xl md:text-2xl font-black tracking-[0.25em] text-center uppercase drop-shadow-2xl">
                                    {talent.title}
                                </h3>
                            </div>

                            {/* Box Shadow border effect */}
                            <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-[#B59431]/60 transition-colors duration-500 rounded-xl" />
                        </Link>
                    ))}
                </div>

                {/* View Details Button */}
                <div className="flex justify-center">
                    <Link
                        href="/talents"
                        className="bg-white text-black px-10 py-4 rounded font-extrabold text-[12px] md:text-[14px] tracking-[0.15em] hover:bg-gray-200 transition-all uppercase shadow-lg text-center"
                    >
                        VIEW TALENTS
                    </Link>
                </div>
            </div>
        </section>
    );
}
