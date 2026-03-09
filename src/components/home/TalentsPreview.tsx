"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
// import { Eye, Ear } from "lucide-react";

const talents = [
    {
        title: "Visual Artists",
        image: "/images/talents/photography.png",
        href: "/talents",
        icon: '/images/eye.png'
    },
    {
        title: "Sonic Artists",
        image: "/images/talents/painting.png",
        href: "/talents",
        icon: '/images/ear.png'
    }
];

export default function TalentsPreview() {
    return (
        <section id="talents" className="lg:min-h-screen bg-black overflow-hidden flex flex-col justify-center">
            <div className="flex flex-col w-full mx-auto">

                {/* Section Header */}
                <div className="w-full relative pt-4 md:pt-8 mb-8 md:mb-12 z-50">
                    <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-[0.15em] uppercase text-white mb-2 ml-[10%]">
                        THE YAAAS CREATIVES
                    </h2>
                    <div className="w-[75%] md:w-[30%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* Talents Grid */}
                <div className="grid grid-cols-2 gap-4 md:gap-8 px-4 md:px-10 lg:px-20 mb-8 flex-1 min-h-0">
                    {talents.map((talent, index) => {
                        const Icon = talent.icon;
                        return (
                            <Link
                                key={index}
                                href={talent.href}
                                className="group relative w-full h-[40vh] md:h-[60vh] lg:h-[75vh] min-h-[300px] overflow-hidden rounded-2xl block shadow-xl border border-white/5 bg-[#111]"
                            >
                                <Image
                                    src={talent.image}
                                    alt={talent.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                                />
                                {/* Overlay to dim the image for text contrast */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                                {/* Top Right Icon */}
                                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
                                    <Image src={talent.icon} alt={talent.title} width={50} height={50} className="w-10 h-10 md:w-full md:h-20" />
                                </div>

                                {/* Category Text */}
                                <div className="absolute inset-0 flex items-center justify-center p-4 z-20">
                                    <h3 className="text-[#FDDA2F] text-sm sm:text-xl md:text-2xl font-black tracking-[0.25em] text-center uppercase drop-shadow-md">
                                        {talent.title}
                                    </h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
