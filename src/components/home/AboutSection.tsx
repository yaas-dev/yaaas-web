"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Service } from "@/components/ServiceAccordion";

interface AboutSectionProps {
    services: Service[];
}

const AboutSection = ({ services }: AboutSectionProps) => {
    const displayServices = services?.length > 0 ? services : [];

    return (
        <section className="relative w-full overflow-hidden bg-[#F7F6F1] text-[#171717] py-10 md:py-14">
            <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-5 lg:gap-10">
                    <div className="flex flex-col justify-center">
                        <div className="mb-4 md:mb-5">
                            <h2 className="text-2xl md:text-4xl lg:text-[40px] font-normal tracking-[0.13em] uppercase mb-2">
                                WE ARE YAAAS
                            </h2>
                            <div className="w-28 md:w-48 h-[4px] bg-[#B59431]" />
                        </div>
                        <p className="text-base md:text-lg lg:text-xl text-[#55534E] leading-relaxed font-normal max-w-2xl">
                            YAAAS is an independent African creative agency working across contemporary art, artist representation and cultural programming. We represent visual and sonic artists, build creative brands, and develop exhibitions, cultural experiences and partnerships that connect African talent with audiences and opportunities across the continent and diaspora.
                        </p>
                    </div>

                    <div className="relative w-full max-w-[340px] lg:max-w-[360px] aspect-square mx-auto lg:ml-auto">
                        <Image
                            src="/images/about2.png"
                            alt="Golden Stool, a symbol of African heritage and creative identity"
                            fill
                            sizes="(max-width: 768px) 80vw, 360px"
                            className="object-contain drop-shadow-[0_0_35px_rgba(253,218,47,0.12)]"
                            priority
                        />
                    </div>
                </div>

                <div id="services" className="mt-5 md:mt-8 pt-6 md:pt-8 border-t border-[#171717]/15">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4 md:mb-5">
                        <div>
                            <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#8A7028] mb-1">
                                WHAT WE DO
                            </p>
                            <h2 className="text-xl md:text-3xl lg:text-[34px] font-normal tracking-[0.12em] uppercase">
                                YAAAS SERVICES
                            </h2>
                            <div className="w-28 h-[4px] bg-[#B59431] mt-2" />
                        </div>
                        <Link
                            href="/services"
                            className="text-[#8A7028] text-[10px] md:text-xs font-bold tracking-[0.16em] uppercase hover:text-[#171717] transition-colors flex items-center gap-2 group whitespace-nowrap"
                        >
                            Explore All Services
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
                    >
                        {displayServices.map((service) => (
                            <Link
                                key={service._id || service.id}
                                href="/services"
                                className="group relative min-h-[130px] md:min-h-[165px] overflow-hidden rounded-md bg-[#171717] flex items-end p-5 md:p-6"
                            >
                                <Image
                                    src={service.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover opacity-65 transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                                <h3 className="relative z-10 text-[#f6d353] font-bold text-lg md:text-xl lg:text-2xl uppercase leading-tight tracking-wide">
                                    {service.title}
                                </h3>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;