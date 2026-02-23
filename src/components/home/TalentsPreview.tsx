"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TalentsPreview() {
    return (
        <section id="talents" className="py-24 bg-background">
            <div className="container mx-auto px-4">
                {/* Figma Header Style */}
                <div className="section-title mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em]">THE YAAAS TALENTS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Visual Artists Card */}
                    <Link href="/talents/visual" className="group block h-[600px] relative overflow-hidden bg-secondary">
                        <img
                            src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800"
                            alt="Visual Artists"
                            className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute inset-x-0 bottom-12 text-center">
                            <h3 className="text-xs tracking-[0.6em] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 uppercase">
                                Visual Artists
                            </h3>
                        </div>
                        {/* Overlay for "Visual Artists" text as seen in Figma */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-primary text-xs tracking-[0.6em] font-bold uppercase pointer-events-none">VISUAL ARTISTS</h3>
                        </div>
                    </Link>

                    {/* Sonic Artists Card */}
                    <Link href="/talents/sonic" className="group block h-[600px] relative overflow-hidden bg-secondary">
                        <img
                            src="https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=80&w=800"
                            alt="Sonic Artists"
                            className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute inset-x-0 bottom-12 text-center">
                            <h3 className="text-xs tracking-[0.6em] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0 uppercase">
                                Sonic Artists
                            </h3>
                        </div>
                        {/* Overlay for "Sonic Artists" text as seen in Figma */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-primary text-xs tracking-[0.6em] font-bold uppercase pointer-events-none">SONIC ARTISTS</h3>
                        </div>
                    </Link>
                </div>
            </div>

            <style jsx>{`
        .py-24 { padding: 6rem 0; }
        .bg-background { background-color: #000000; }
        .container { max-width: 1400px; margin: 0 auto; }
        .bg-secondary { background-color: #0c0c0c; }
      `}</style>
        </section>
    );
}
