'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero({ settings }: { settings?: any }) {
    const [hasAnimated, setHasAnimated] = useState(true); // Default to true to prevent flash of content on initial render before useEffect
    const background = settings?.heroBackground || { type: 'image', src: '/images/hero.png' };

    useEffect(() => {
        const animated = sessionStorage.getItem("yaaas_hero_animated");
        if (!animated) {
            setHasAnimated(false);
            sessionStorage.setItem("yaaas_hero_animated", "true");
        }
    }, []);

    const titleVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
    };

    const subtitleVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
    };

    return (
        <section className="relative w-full h-[100vh] max-h-[100vh] bg-black flex flex-col items-center justify-center text-center overflow-hidden">

            {/* Background Layer */}
            <motion.div
                initial={hasAnimated ? false : { opacity: 0, scale: 1.05 }}
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
                <div className="absolute inset-0 bg-black/40"></div>
            </motion.div>

            {/* Text Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6">
                <motion.h1
                    variants={titleVariants}
                    initial={hasAnimated ? false : "initial"}
                    animate="animate"
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-white text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] uppercase mb-3 font-azonix"
                >
                    YAA <span className="text-[#B59431]">ASANTEWAA</span>
                </motion.h1>
                <motion.p
                    variants={subtitleVariants}
                    initial={hasAnimated ? false : "initial"}
                    animate="animate"
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="text-[#fff] text-xs md:text-sm lg:text-base font-light tracking-[0.4em] lowercase font-modernsans"
                >
                    /jɑː ɑːˈsæn.teɪ.wɑː/
                </motion.p>
            </div>

        </section>
    );
}
