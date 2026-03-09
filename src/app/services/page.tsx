"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ServiceAccordion, { Service } from "@/components/ServiceAccordion";
import ContactSection from "@/components/home/ContactSection";

const services: Service[] = [
    {
        id: "branding-creative-strategy",
        number: "01",
        title: "CREATIVE DIRECTION + STRATEGY",
        image: "/images/service_1.png",
        description:
            "We craft intentional creative strategies rooted in culture, insight, and long‑term vision. From concept development to execution oversight, we align storytelling with clear objectives to ensure meaningful and measurable impact.",
    },
    {
        id: "talent-development-representation",
        number: "02",
        title: "TALENTS DEVELOPMENT + REPRESENTATION",
        image: "/images/service_2.png",
        description:
            "We nurture and represent multidisciplinary creatives, providing strategic guidance, institutional access, and partnership opportunities that support sustainable growth and global positioning.",
    },
    {
        id: "experiential-cultural-programming",
        number: "03",
        title: "EXPERIENTIAL + CULTURAL PROGRAMMING",
        image: "/images/service_3.png",
        description:
            "We design and produce immersive cultural experiences that connect audiences to art in powerful ways — from exhibitions and residencies to live activations and interdisciplinary collaborations.",
    },
];

export default function ServicesPage() {
    return (
        <div className="pt-40 md:pt-40 pb-16 px-6 md:px-12 mx-auto min-h-screen bg-[#080807] text-white flex flex-col"

        >
            {/* ── Page header ── */}
            <div className="mb-8 md:mb-12 relative z-10 w-full max-w-5xl mx-auto flex-shrink-0">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ marginBottom: "1rem" }}
                >
                    <h1 className="text-3xl md:text-5xl lg:text-[54px] font-bold tracking-[0.15em] uppercase text-white mb-2 md:mb-4">
                        SERVICES
                    </h1>
                    <div className="w-[100px] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[#999999] text-xs md:text-sm uppercase tracking-[0.3em] font-medium max-w-2xl"
                    style={{ marginTop: "1rem" }}
                >
                    A curated suite of capabilities built around the creative visionary.
                    Every offering is rooted in craft, intention, and the pursuit of cultural relevance.
                </motion.p>
            </div>

            {/* ── Content List ── */}
            <div className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center min-h-[300px]">
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
                    href="/talents"
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
                    Explore Talents
                </Link>
            </motion.div>

            <ContactSection />
        </div>
    );
}
