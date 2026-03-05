"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative w-full h-[100vh] max-h-[100vh] bg-black flex flex-col items-center justify-center text-center overflow-hidden">

            {/* Background Image Layer */}
            <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full z-0"
            >
                {/* Note: /images/hero3.png seems to be the one containing the room/statues from what I can guess, or whatever the user replaces it with later */}
                <Image
                    src="/images/hero.png"
                    alt="African Art Gallery Hero"
                    fill
                    className="object-cover h-full object-center"
                    priority
                />
            </motion.div>

        </section>
    );
}
