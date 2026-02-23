"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function TalentsPreview() {
    return (
        <section id="talents" className="py-24 bg-background">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="relative inline-block mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase">THE YAAAS TALENTS</h2>
                    <span className="absolute -bottom-4 left-0 w-[100px] h-1 bg-primary block" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* Visual Artists Card */}
                    <Link href="/talents/visual" className="group block h-[600px] relative overflow-hidden bg-secondary">
                        <img
                            src="https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800"
                            alt="Visual Artists"
                            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-primary text-xs tracking-[0.6em] font-bold uppercase">VISUAL ARTISTS</h3>
                        </div>
                    </Link>

                    {/* Sonic Artists Card */}
                    <Link href="/talents/sonic" className="group block h-[600px] relative overflow-hidden bg-secondary">
                        <img
                            src="https://images.unsplash.com/photo-1514525253361-b83f859b73c0?auto=format&fit=crop&q=80&w=800"
                            alt="Sonic Artists"
                            className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-primary text-xs tracking-[0.6em] font-bold uppercase">SONIC ARTISTS</h3>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
