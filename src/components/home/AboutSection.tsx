"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Service } from "@/components/ServiceAccordion";

interface AboutSectionProps {
    services: Service[];
    settings?: any;
}

const AboutSection = ({ services, settings }: AboutSectionProps) => {
    const displayServices = services?.length > 0 ? services : [];
    const copy = settings?.homepageContent || {};
    const text = (key: string, fallback: string) => copy[key] || fallback;

    return (
        <section className="bg-[#F7F6F1] text-[#171717] py-14 md:py-20">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] items-center gap-8 lg:gap-14">
                    <div>
                        <p className="text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#8A7028] mb-3">{text('aboutEyebrow', 'Who We Are')}</p>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.1em] uppercase mb-5">{text('aboutTitle', 'WE ARE YAAAS')}</h2>
                        <div className="w-20 h-1 bg-[#B59431] mb-6" />
                        <p className="text-base md:text-lg text-[#55534E] leading-relaxed max-w-2xl">
                            {text('aboutDescription', 'YAAAS is an independent African creative agency working across contemporary art, artist representation and cultural programming. We represent visual and sonic artists, build creative brands, and develop exhibitions, cultural experiences and partnerships that connect African talent with audiences and opportunities across the continent and diaspora.')}
                        </p>
                    </div>
                    <div className="relative w-full max-w-[320px] lg:max-w-[360px] aspect-square mx-auto">
                        <Image src="/images/about2.png" alt="Golden Stool, a symbol of African heritage and creative identity" fill sizes="(max-width: 768px) 80vw, 360px" className="object-contain" priority />
                    </div>
                </div>

                <div id="services" className="mt-10 md:mt-14 border-t border-[#171717]/15 pt-8 md:pt-10">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
                        <div>
                            <p className="text-[10px] md:text-xs tracking-[0.22em] uppercase text-[#8A7028] mb-2">{text('servicesEyebrow', 'How We Work')}</p>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.1em] uppercase">{text('servicesTitle', 'OUR SERVICES')}</h2>
                            <div className="w-20 h-1 bg-[#B59431] mt-4" />
                        </div>
                        <Link href="/services" className="text-[#8A7028] text-[10px] md:text-xs font-bold tracking-[0.16em] uppercase hover:text-[#171717] transition-colors flex items-center gap-2 group">
                            {text('servicesCta', 'Explore All Services')} <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayServices.map((service) => (
                            <Link key={service._id || service.id} href="/services" className="group relative min-h-[150px] md:min-h-[180px] overflow-hidden rounded-md bg-[#171717] flex items-end p-5 md:p-6">
                                <Image src={service.image} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover opacity-65 transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                                <h3 className="relative z-10 text-[#f6d353] font-bold text-lg md:text-xl uppercase leading-tight tracking-wide">{service.title}</h3>
                            </Link>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
