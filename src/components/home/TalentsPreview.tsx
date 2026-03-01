"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const talents = [
    {
        title: "Visual Artists",
        image: "/images/talents/photography.png",
        href: "/talents/photography"
    },
    {
        title: "Sonic Artists",
        image: "/images/talents/painting.png",
        href: "/talents/painting"
    }
];

export default function TalentsPreview() {
    return (
        <section id="talents" className="py-24 bg-black">
            <div className="">

                {/* Section Header */}
                <div className="w-full relative pt-12 md:pt-24 mb-16 md:mb-24 z-50">
                    <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold tracking-[0.15em] uppercase text-white mb-4 md:mb-6 ml-[10%]">
                        THE YAAAS TALENTS
                    </h2>
                    <div className="w-[75%] md:w-[30%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* Talents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-10 mb-16">
                    {talents.map((talent, index) => (
                        <Link
                            key={index}
                            href={talent.href}
                            className="group relative h-[700px] md:h-[800px] overflow-hidden rounded-xl block shadow-xl border border-white/5"
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
            </div>
        </section>
    );
}
