'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero({ settings }: { settings?: any }) {
    const [hasAnimated, setHasAnimated] = useState(true);
    const background = settings?.heroBackground || { type: 'image', src: '/images/hero.png' };
    const copy = settings?.homepageContent || {};
    const text = (key: string, fallback: string) => copy[key] || fallback;

    useEffect(() => {
        const animated = sessionStorage.getItem("yaaas_hero_animated");
        if (!animated) {
            setHasAnimated(false);
            sessionStorage.setItem("yaaas_hero_animated", "true");
        }
    }, []);

    return (
        <section className="relative w-full h-[min(88svh,760px)] min-h-[580px] bg-black flex flex-col items-center justify-center text-center overflow-hidden">
            <motion.div initial={hasAnimated ? false : { opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, ease: "easeOut" }} className="absolute inset-0 z-0">
                {background.type === 'video' ? (
                    <video src={background.src} autoPlay loop muted playsInline className="object-cover w-full h-full object-center" />
                ) : (
                    <Image src={background.src} alt="YAAAS creative agency hero" fill className="object-cover object-center" priority sizes="100vw" />
                )}
                <div className="absolute inset-0 bg-black/50" />
            </motion.div>

            <div className="relative z-10 flex flex-col items-center justify-center max-w-5xl px-6">
                <motion.p initial={hasAnimated ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="text-[#D5B64A] text-[10px] md:text-xs tracking-[0.35em] uppercase mb-5">
                    {text('heroEyebrow', 'YAH AH-SAHN-TEH-WAH')}
                </motion.p>
                <motion.h1 initial={hasAnimated ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }} className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-[0.08em] uppercase font-azonix leading-tight">
                    {text('heroTitle', 'YAA ASANTEWAA')}
                </motion.h1>
                <motion.p initial={hasAnimated ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-white/90 text-sm md:text-lg leading-relaxed font-light max-w-2xl mt-5 md:mt-6">
                    {text('heroDescription', 'Connecting African talent with new audiences, opportunities and ideas.')}
                </motion.p>
                <motion.div initial={hasAnimated ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-col sm:flex-row items-center gap-3 mt-8">
                    <Link href="/talents" className="inline-flex items-center justify-center min-w-[190px] px-7 py-4 bg-[#B59431] text-[#171717] text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-white transition-colors">
                        {text('heroPrimaryCta', 'Meet Our Artists')}
                    </Link>
                    <Link href="/contents" className="inline-flex items-center justify-center min-w-[190px] px-7 py-4 border border-white/70 text-white text-[11px] font-bold tracking-[0.18em] uppercase hover:bg-white hover:text-[#171717] transition-colors">
                        {text('heroSecondaryCta', 'Explore Our Work')}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
