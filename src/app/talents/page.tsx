"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const customTalents = [
    {
        id: "visual",
        name: "Visual Artists",
        count: 24,
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200",
        href: "/talents/visual",
        description: "Sculptors, Painters, and Digital Architects.",
    },
    {
        id: "sonic",
        name: "Sonic Artists",
        count: 18,
        image: "https://images.unsplash.com/photo-1514525253344-ad70ba054668?auto=format&fit=crop&q=80&w=1200",
        href: "/talents/sonic",
        description: "Composers, Sound Designers, and Audio Innovators.",
    },
];

export default function TalentsPage() {
    return (
        <div className="pt-32 pb-24 container mx-auto px-4 min-h-screen bg-background">
            <div className="mb-24">
                <div className="section-title mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase">The Talents</h1>
                </div>
                <p className="text-[#999999] text-xs uppercase tracking-[0.3em] font-medium max-w-2xl">
                    We represent a curated collection of visionaries who push the
                    boundaries of sensory experience. From the resonance of sound to the depth of the visual plane.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {customTalents.map((type, index) => (
                    <motion.div
                        key={type.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                    >
                        <Link href={type.href} className="group relative block aspect-[3/4] overflow-hidden bg-secondary">
                            <img
                                src={type.image}
                                alt={type.name}
                                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-500" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase tracking-[0.1em] text-white">
                                    {type.name}
                                </h2>
                                <p className="text-primary text-[10px] uppercase tracking-[0.4em] font-bold">
                                    {type.count} ARTISTS REPRESENTED
                                </p>
                                <div className="mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="btn-pill">Enter Directory</span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .pt-32 { padding-top: 8rem; }
        .pb-24 { padding-bottom: 6rem; }
        .mb-24 { margin-bottom: 6rem; }
        .container { max-width: 1400px; margin: 0 auto; }
        .aspect-\[3\/4\] { aspect-ratio: 3 / 4; }
      `}</style>
        </div>
    );
}
