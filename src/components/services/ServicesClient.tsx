"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ServiceAccordion, { Service } from "@/components/ServiceAccordion";
import ContactSection from "@/components/home/ContactSection";
import Image from "next/image";

interface ServicesClientProps {
    services: Service[];
    settings?: any;
}

export default function ServicesClient({ services, settings }: ServicesClientProps) {
    const headerBg = settings?.servicesHeaderImage;

    return (
        <div className="pt-40 md:pt-24 pb-16 md:mb-40 bg-[#080807] text-white flex flex-col">
            <div className={`w-full ${headerBg ? 'relative overflow-hidden min-h-[120px] md:min-h-[200px]' : 'bg-[#c1a03a]'} py-6 md:py-8 mt-5 shadow-2xl z-10 flex items-center`}>
                {headerBg && (
                    <Image
                        src={headerBg}
                        alt="Services Header"
                        fill
                        className="object-cover opacity-60 grayscale brightness-50"
                    />
                )}
                <div className="px-6 md:px-32 relative z-10">
                    <h1 className="text-white text-3xl md:text-[64px] uppercase tracking-widest">YAAAS SERVICES</h1>
                </div>
            </div>
            {/* ── Page header ── */}
            <div className="mb-8 md:mb-12 md:px-16 relative z-10 w-full flex-shrink-0">
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[#e0e0e0] font-light text-sm md:text-[24px] leading-8 tracking-wide w-full"
                    style={{ marginTop: "2.5rem" }}
                >
                    A curated suite of capabilities built around the creative visionary.
                    Every offering is rooted in craft, intention, and the pursuit of cultural relevance.
                </motion.p>
            </div>

            {/* ── Content List ── */}
            <div className="relative z-10 w-full md:px-16 flex-1 flex flex-col justify-center min-h-[300px]">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex-1 flex flex-col pt-0"
                >
                    <ServiceAccordion services={services} initialAllOpen={true} allowToggle={false} />
                </motion.div>
            </div>

            {/* ── Bottom CTA ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-5xl mx-auto flex justify-end flex-shrink-0 mt-8"
            >
                <Link
                    href="/contents"
                    style={{
                        display: "inline-block",
                        background: "#B59431",
                        color: "#000",
                        fontWeight: 700,
                        fontSize: "12px",
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                        padding: "16px 48px",
                        transition: "background 0.25s ease",
                        borderRadius: "2px",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#d4ae3b")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#B59431")}
                >
                    Explore Contents
                </Link>
            </motion.div>

            <ContactSection />
        </div>
    );
}
