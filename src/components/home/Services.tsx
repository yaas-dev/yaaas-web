"use client";

import { motion } from "framer-motion";

export default function Services() {
    return (
        <div className="relative w-full overflow-hidden">
            {/* Full-bleed background image */}
            <img
                src="/images/hero_2.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.4]"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[300px] px-8 py-20">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-white text-center leading-[1.9] tracking-wide font-normal max-w-2xl text-[clamp(0.85rem,1.5vw,1rem)]"
                >
                    Yaa Asantewaa, a fearless Ashanti queen, led her people in the Ashanti-British
                    &ldquo;War of the Golden Stool&rdquo; in 1900, showcasing her courage and dedication to
                    defending her nation&rsquo;s sovereignty. Her leadership and bravery remain a
                    symbol of African{" "}
                    <span className="text-primary italic">
                        resistance and empowerment.
                    </span>
                </motion.p>
            </div>
        </div>
    );
}
