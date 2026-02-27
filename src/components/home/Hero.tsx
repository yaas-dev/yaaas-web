"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center pt-24">

            {/* Background Image Layer */}
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full z-0"
            >
                {/* Note: /images/hero3.png seems to be the one containing the room/statues from what I can guess, or whatever the user replaces it with later */}
                <Image
                    src="/images/hero_art.png"
                    alt="African Art Gallery Hero"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </motion.div>

            {/* Pattern Overlay Layer (Light Concentric Circles) */}
            <div
                className="absolute inset-0 w-full h-full z-10 opacity-10 mix-blend-screen pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 60C13.431 60 0 46.569 0 30S13.431 0 30 0s30 13.431 30 30-13.431 30-30 30zM30 4C15.64 4 4 15.64 4 30s11.64 26 26 26 26-11.64 26-26S44.36 4 30 4zm0 46c-11.046 0-20-8.954-20-20S18.954 10 30 10s20 8.954 20 20-8.954 20-20 20zm0-4C21.163 46 14 38.837 14 30s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16zm0-4c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-4c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '120px 120px',
                    backgroundPosition: 'center'
                }}
            />

            {/* Optional subtle gradient overlay to ensure header text legibility if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/40 z-[15] pointer-events-none" />

        </section>
    );
}
