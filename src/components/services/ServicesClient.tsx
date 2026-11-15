"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ServiceAccordion, { Service } from "@/components/ServiceAccordion";
import ContactSection from "@/components/home/ContactSection";
import Image from "next/image";

interface ServicesClientProps {
    services: Service[];
    settings?: any;
    featuredProjects?: any[];
}

export default function ServicesClient({ services, settings, featuredProjects = [] }: ServicesClientProps) {
    const headerBg = settings?.servicesHeaderImage;

    return (
        <div className="pt-32 pb-16 bg-[#F1EFE8] text-[#171717] flex flex-col">
            <div className={`w-full ${headerBg ? 'relative overflow-hidden min-h-[120px] md:min-h-[200px]' : 'bg-transparent'} py-6 md:py-8 mt-5 shadow-2xl z-10 flex items-center`}>
                {headerBg && (
                    <Image
                        src={headerBg}
                        alt="Services Header"
                        fill
                        className="object-cover opacity-60 grayscale brightness-50"
                    />
                )}
                <div className="px-6 md:px-32 relative z-10">
                    <h1 className="text-[#171717] text-3xl md:text-[64px] uppercase tracking-widest">YAAAS SERVICES</h1>
                </div>
            </div>
            {/* ── Page header ── */}
            <div className="mb-8 md:mb-12 md:px-16 relative z-10 w-full flex-shrink-0">
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[#55534E] font-light text-sm md:text-[24px] leading-8 tracking-wide w-full"
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

            {featuredProjects.length > 0 && (
                <section className="w-full max-w-[1400px] mx-auto px-6 md:px-16 mt-24 mb-12">
                    <div className="flex items-end justify-between gap-6 mb-10">
                        <div>
                            <p className="text-[#B59431] text-[10px] uppercase tracking-[0.28em] font-bold mb-3">Selected work</p>
                            <h2 className="font-serif text-4xl md:text-6xl">Ideas in action.</h2>
                        </div>
                        <Link href="/contents" className="hidden sm:inline-flex text-[#B59431] text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[#B59431]/50 pb-2 hover:text-[#171717] hover:border-[#171717] transition-colors">View all work</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProjects.map((project: any) => (
                            <Link href={`/contents/${project._id}`} key={project._id} className="group block">
                                <div className="relative aspect-[4/3] overflow-hidden bg-[#292929] mb-5">
                                    <Image src={project.mainImage} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                                </div>
                                <p className="text-[#77746D] text-[10px] uppercase tracking-[0.2em] mb-3">{project.category}</p>
                                <h3 className="font-serif text-2xl md:text-3xl text-[#171717] group-hover:text-[#B59431] transition-colors">{project.title}</h3>
                                <p className="text-[#55534E] text-sm leading-relaxed mt-3 line-clamp-3">{project.description}</p>
                                <span className="inline-flex items-center gap-3 text-[#B59431] text-[10px] uppercase tracking-[0.2em] font-bold mt-6">Explore case study <span className="w-7 h-px bg-[#B59431] group-hover:w-12 transition-all"/></span>
                            </Link>
                        ))}
                    </div>
                    <div className="sm:hidden mt-8"><Link href="/contents" className="text-[#B59431] text-[10px] font-bold uppercase tracking-[0.2em] border-b border-[#B59431]/50 pb-2">View all work</Link></div>
                </section>
            )}

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
