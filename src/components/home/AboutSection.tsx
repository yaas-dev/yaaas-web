"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ServiceAccordion, { Service } from "@/components/ServiceAccordion";

interface AboutSectionProps {
    services: Service[];
}

const AboutSection = ({ services }: AboutSectionProps) => {
    const displayServices = services?.length > 0 ? services : [];

    return (
        <section className="relative w-full overflow-hidden bg-[#F7F6F1] text-[#171717] py-16 md:py-24">
            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center gap-8 lg:gap-16">
                    <div className="flex flex-col justify-center">
                        <div className="mb-6 md:mb-8">
                            <h2 className="text-2xl md:text-4xl lg:text-[44px] font-normal tracking-[0.15em] uppercase mb-2">
                                WE ARE YAAAS
                            </h2>
                            <div className="w-[75%] md:w-[50%] h-[4px] md:h-[6px] bg-[#B59431]" />
                        </div>
                        <p className="text-lg md:text-xl lg:text-2xl text-[#55534E] leading-relaxed font-normal max-w-2xl">
                            YAAAS is an independent African creative agency working across contemporary art, artist representation and cultural programming. We represent visual and sonic artists, build creative brands, and develop exhibitions, cultural experiences and partnerships that connect African talent with audiences and opportunities across the continent and diaspora.
                        </p>
                    </div>

                    <div className="relative w-full max-w-[480px] aspect-square mx-auto lg:ml-auto">
                        <Image
                            src="/images/about2.png"
                            alt="Golden Stool, a symbol of African heritage and creative identity"
                            width={900}
                            height={900}
                            className="object-contain drop-shadow-[0_0_50px_rgba(253,218,47,0.15)]"
                            priority
                        />
                    </div>
                </div>

                <div id="services" className="mt-14 md:mt-20 pt-10 md:pt-14 border-t border-[#171717]/15">
                    <div className="mb-6 md:mb-8">
                        <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#8A7028] mb-3">
                            WHAT WE DO
                        </p>
                        <h2 className="text-2xl md:text-4xl lg:text-[44px] font-normal tracking-[0.12em] uppercase mb-2">
                            YAAAS SERVICES
                        </h2>
                        <div className="w-[75%] md:w-[30%] h-[4px] md:h-[6px] bg-[#B59431]" />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7 }}
                        className="w-full"
                    >
                        <ServiceAccordion services={displayServices} allowToggle={false} isLinkOnly={true} />
                        <div className="mt-8 flex justify-end">
                            <Link
                                href="/services"
                                className="text-[#8A7028] text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase hover:text-[#171717] transition-colors flex items-center gap-2 group"
                            >
                                Explore All Services
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;