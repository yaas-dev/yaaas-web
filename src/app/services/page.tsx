"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ServiceAccordion, { Service } from "@/components/ServiceAccordion";

const services: Service[] = [
    {
        id: "representation",
        number: "01",
        title: "Artist Representation",
        description:
            "End-to-end management and strategic positioning for visual and sonic artists. We handle contract negotiation, career architecture, and long-term brand building — ensuring each artist operates at the frontier of their potential.",
        image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "creative-direction",
        number: "02",
        title: "Creative Direction",
        description:
            "Conceptual and aesthetic leadership for campaigns, exhibitions, and brand activations. Our directors translate raw vision into cohesive, resonant experiences that move culture.",
        image:
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "brand-partnerships",
        number: "03",
        title: "Brand Partnerships",
        description:
            "Curating meaningful collaborations between artists and aligned global brands. We identify synergies, structure deals, and execute partnerships that feel authentic — never transactional.",
        image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "art-acquisition",
        number: "04",
        title: "Art Acquisition",
        description:
            "Advisory and facilitation for private and institutional collectors. From sourcing to provenance verification, we guide discerning clients toward acquisitions of lasting cultural and financial significance.",
        image:
            "https://images.unsplash.com/photo-1578926288207-a90a5366759d?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "exhibition-curation",
        number: "05",
        title: "Exhibition Curation",
        description:
            "Designing thought-provoking physical and digital exhibition experiences. We handle concept development, spatial storytelling, and production — from intimate galleries to international art fairs.",
        image:
            "https://images.unsplash.com/photo-1561839561-b13bccd90c6e?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "sound-design",
        number: "06",
        title: "Sound Design",
        description:
            "Bespoke audio identity and immersive soundscape creation for spaces, campaigns, and digital experiences. Our sonic artists craft atmospheres that shift perception and deepen engagement.",
        image:
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80&w=600",
    },
    {
        id: "talent-development",
        number: "07",
        title: "Talent Development",
        description:
            "Long-term mentoring, portfolio building, and market positioning for emerging artists. We invest in potential — providing the structural support and critical guidance required to break into global creative markets.",
        image:
            "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600",
    },
];

export default function ServicesPage() {
    return (
        <div className="pt-32 pb-24 container mx-auto px-4 min-h-screen bg-background text-white">

            {/* ── Page header ── */}
            <div className="mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ marginBottom: "4rem" }}
                >
                    <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase">
                        Services
                    </h1>
                    <span className="block w-[100px] h-1 bg-primary" style={{ marginTop: "1rem" }} />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[#999999] text-xs uppercase tracking-[0.3em] font-medium max-w-2xl"
                    style={{ marginTop: "2.5rem" }}
                >
                    A curated suite of capabilities built around the creative visionary.
                    Every offering is rooted in craft, intention, and the pursuit of cultural relevance.
                </motion.p>
            </div>

            {/* ── Divider ── */}
            <div style={{ borderTop: "1px solid #1a1a1a", marginBottom: 0 }} />

            {/* ── Accordion ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <ServiceAccordion services={services} />
            </motion.div>

            {/* ── Bottom CTA ── */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    marginTop: "5rem",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Link
                    href="/talents"
                    style={{
                        display: "inline-block",
                        background: "#B89C24",
                        color: "#000",
                        fontWeight: 700,
                        fontSize: "10px",
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                        padding: "20px 64px",
                        transition: "background 0.25s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#d4b230")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#B89C24")}
                >
                    Explore Talent Portfolios
                </Link>
            </motion.div>

            <style>{`
        .pt-32 { padding-top: 8rem; }
        .pb-24 { padding-bottom: 6rem; }
        .mb-24 { margin-bottom: 6rem; }
        .container { max-width: 1400px; margin: 0 auto; }
      `}</style>
        </div>
    );
}
