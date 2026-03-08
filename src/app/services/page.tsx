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
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231c1b16' fill-opacity='1'%3E%3Cpath d='M30 60C13.431 60 0 46.569 0 30S13.431 0 30 0s30 13.431 30 30-13.431 30-30 30zM30 4C15.64 4 4 15.64 4 30s11.64 26 26 26 26-11.64 26-26S44.36 4 30 4zm0 46c-11.046 0-20-8.954-20-20S18.954 10 30 10s20 8.954 20 20-8.954 20-20 20zm0-4C21.163 46 14 38.837 14 30s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16zm0-4c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-4c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
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
                    <ServiceAccordion services={services} />
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
