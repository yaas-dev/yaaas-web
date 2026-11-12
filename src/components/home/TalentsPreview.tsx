"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
// import { Eye, Ear } from "lucide-react";

interface TalentsPreviewProps {
    initialTalents?: any[];
    settings?: any;
}

export default function TalentsPreview({ initialTalents = [], settings }: TalentsPreviewProps) {
    const talents = useMemo(() => {
        // Find latest talent for each category
        const latestVisual = initialTalents.find(t => t.category === 'VISUAL');
        const latestSonic = initialTalents.find(t => t.category === 'SONIC');

        return [
            {
                title: "Visual Artists",
                image: settings?.creativesVisualImage || latestVisual?.headshot || "/images/talents/photography.png",
                href: "/talents?category=VISUAL",
                icon: '/images/eye.png'
            },
            {
                title: "Sonic Artists",
                image: settings?.creativesSonicImage || latestSonic?.headshot || "/images/talents/painting.png",
                href: "/talents?category=SONIC",
                icon: '/images/ear.png'
            }
        ];
    }, [initialTalents, settings]);

    return (
        <section id="talents" className="bg-[#F1EFE8] py-14 md:py-20 overflow-hidden">
            <div className="mx-auto max-w-7xl px-5 md:px-8">

                {/* Section Header */}
                <div className="w-full relative mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.1em] uppercase text-[#171717] mb-2">
                        YAAAS CREATIVES
                    </h2>
                    <div className="w-20 h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* Talents Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {talents.map((talent, index) => {
                        const Icon = talent.icon;
                        return (
                            <Link
                                key={index}
                                href={talent.href}
                                className="group relative w-full aspect-[4/3] sm:aspect-[5/4] max-h-[440px] min-h-[260px] overflow-hidden rounded-lg block shadow-sm border border-black/5 bg-[#111]"
                            >
                                <Image
                                    src={talent.image}
                                    alt={talent.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                                />
                                {/* Overlay to dim the image for text contrast */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                                {/* Top Right Icon - Unified Container */}
                                <div className="absolute top-4 right-4 md:top-8 md:right-8 z-30 p-3 md:p-4">
                                    <div className="relative w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16">
                                        <Image
                                            src={talent.icon}
                                            alt={talent.title}
                                            fill
                                            className="object-contain transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                </div>

                                {/* Category Text */}
                                <div className="absolute inset-0 flex items-center justify-center p-4 z-20">
                                    <h3 className="text-[#FDDA2F] text-sm sm:text-xl md:text-2xl font-black tracking-[0.18em] text-center uppercase drop-shadow-md">
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
