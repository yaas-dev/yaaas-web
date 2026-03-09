"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero({ settings }: { settings?: any }) {
    const background = settings?.heroBackground || { type: 'image', src: '/images/hero.png' };

    return (
        <section className="relative w-full h-[100vh] max-h-[100vh] bg-black flex flex-col items-center justify-center text-center overflow-hidden">

            {/* Background Layer */}
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full z-0"
            >
                {background.type === 'video' ? (
                    <video
                        src={background.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="object-cover w-full h-full object-center"
                    />
                ) : (
                    <Image
                        src={background.src}
                        alt="Hero Background"
                        fill
                        className="object-cover h-full object-center"
                        priority
                    />
                )}
                {/* Optional: Add a subtle overlay for text readability if needed */}
                <div className="absolute inset-0 bg-black/10"></div>
            </motion.div>

        </section>
    );
}
