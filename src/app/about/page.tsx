"use client";

import { motion } from "framer-motion";
import Carousel from "@/components/Carousel";

const collaborations = [
    {
        name: "Evil Genius",
        description: "A dark, experimental collective pushing the boundaries of sonic architecture and visual deconstruction.",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200",
    },
    {
        name: "Puppy Water",
        description: "A playful yet profound exploration of liquidity, transparency, and digital organicism.",
        image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=1200",
    },
];

export default function AboutPage() {
    const collabSlides = collaborations.map((collab, i) => (
        <div key={collab.name} className="w-full h-full relative flex items-center justify-center">
            {/* Switched to standard img with descriptive class or Next Image if preferred. 
                Using standard img here as per your original, but added relative key. */}
            <img src={collab.image} alt={collab.name} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale" />
            <div className="relative z-10 text-center px-4 max-w-2xl">
                <h3 className="text-4xl md:text-6xl font-bold mb-6 italic font-serif uppercase tracking-tight">{collab.name}</h3>
                <p className="text-sm md:text-lg text-[#999999] tracking-widest leading-relaxed uppercase">
                    {collab.description}
                </p>
            </div>
        </div>
    ));

    return (
        <div className="pt-32 pb-24 mx-auto px-4 min-h-screen bg-background text-white max-w-[1400px]">
            <div className="mb-24">
                <div className="section-title mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase">The Agency</h1>
                </div>
                <p className="text-[#999999] text-xs uppercase tracking-[0.3em] font-medium max-w-2xl">
                    YAAAS is more than an agency; it is a creative ecosystem. We represent the avant-garde,
                    the visionaries who see the world through the lens of pure expression.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
                <div className="order-2 lg:order-1">
                    <p className="text-xl md:text-3xl font-light tracking-wide leading-relaxed mb-12 italic font-serif text-[#cccccc]">
                        "We believe in the power of the sensory experience to transcend the ordinary. Every collaboration is a step into the unknown."
                    </p>
                    <div className="grid grid-cols-2 gap-12 border-t border-white/10 pt-12">
                        <div>
                            <h4 className="text-primary font-bold text-5xl mb-2 tracking-tighter">2018</h4>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#666666] font-bold">FOUNDED IN LONDON</p>
                        </div>
                        <div>
                            <h4 className="text-primary font-bold text-5xl mb-2 tracking-tighter">50+</h4>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#666666] font-bold">GLOBAL VISIONARIES</p>
                        </div>
                    </div>
                </div>
                <div className="relative aspect-square order-1 lg:order-2">
                    <img
                        src="https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1200"
                        alt="YAAAS Vision"
                        className="w-full h-full object-cover grayscale opacity-60 border border-white/5"
                    />
                    <div className="absolute -bottom-8 -left-8 w-56 h-56 bg-primary flex items-center justify-center p-10 text-center shadow-2xl">
                        <p className="text-[10px] text-black uppercase tracking-[0.4em] leading-relaxed font-black">A VISION BEYOND SIGHT</p>
                    </div>
                </div>
            </div>

            {/* Collaborations Slider */}
            <section className="mt-32">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl uppercase tracking-[0.4em] font-bold">Collaborations</h2>
                    <div className="h-[1px] flex-1 mx-8 bg-white/10 hidden md:block" />
                </div>
                <div className="h-[500px] md:h-[600px] bg-black/40 border border-white/5 overflow-hidden">
                    <Carousel items={collabSlides} showArrows={true} showDots={true} autoPlay={false} />
                </div>
            </section>
        </div>
    );
}
