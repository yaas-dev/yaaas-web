"use client";

import { motion } from "framer-motion";
import Carousel from "@/components/Carousel";

const visualArtists = [
    {
        name: "Vance",
        type: "Digital Sculptor",
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
        works: [
            "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1561214078-f3247647fc5e?auto=format&fit=crop&q=80&w=800",
        ],
    },
    {
        name: "Marlowe",
        type: "Fine Art Painter",
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
        works: [
            "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1514349159574-1b09d9d9aba2?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800",
        ],
    },
];

export default function VisualArtistsPage() {
    return (
        <div className="pt-32 pb-24 container mx-auto px-4 min-h-screen bg-background">
            <div className="mb-24">
                <div className="section-title mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase">Visual Artists</h1>
                </div>
                <p className="text-[#999999] text-xs uppercase tracking-[0.3em] font-medium max-w-2xl">
                    A division dedicated to the exploration of light, form, and texture.
                </p>
            </div>

            <div className="space-y-40">
                {visualArtists.map((artist, i) => (
                    <div key={i} className="flex flex-col gap-12">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">{artist.name}</h2>
                                <p className="text-primary uppercase tracking-[0.3em] font-bold text-sm mt-2">{artist.type}</p>
                            </div>
                            <button className="text-xs uppercase tracking-widest border border-white px-8 py-3 hover:bg-white hover:text-black transition-all">
                                Request Portfolio
                            </button>
                        </div>

                        <div className="h-[500px] md:h-[700px] border border-white/5">
                            <Carousel
                                items={artist.works.map((work, j) => (
                                    <img key={j} src={work} className="w-full h-full object-cover" alt="Portfolio piece" />
                                ))}
                                showArrows={true}
                                showDots={true}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .pt-32 { padding-top: 8rem; }
        .mb-24 { margin-bottom: 6rem; }
        .space-y-40 > * + * { margin-top: 10rem; }
        .h-\[500px\] { height: 500px; }
        .md\:h-\[700px\] { height: 700px; }
      `}</style>
        </div>
    );
}
