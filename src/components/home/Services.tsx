"use client";

import { motion } from "framer-motion";

export default function Services() {
    return (
        <section style={{
            position: "relative",
            width: "100vw",
            marginLeft: "0",
            padding: "80px 0",
            overflow: "hidden",
        }}>
            {/* Full-bleed horizontal background image */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/images/hero_2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                filter: "brightness(0.45)",
            }} />

            {/* Dark overlay */}
            <div style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.55)",
            }} />

            {/* Centred text content */}
            <div style={{
                position: "relative",
                zIndex: 10,
                maxWidth: "720px",
                margin: "0 auto",
                padding: "0 2rem",
                textAlign: "center",
            }}>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{
                        color: "#ffffff",
                        fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                        lineHeight: 1.9,
                        letterSpacing: "0.02em",
                        fontWeight: 400,
                    }}
                >
                    Yaa Asantewaa, a fearless Ashanti queen, led her people in the Ashanti-British
                    &ldquo;War of the Golden Stool&rdquo; in 1900, showcasing her courage and dedication to
                    defending her nation&rsquo;s sovereignty. Her leadership and bravery remain a
                    symbol of African{" "}
                    <span style={{ color: "#B89C24", fontStyle: "italic" }}>
                        resistance and empowerment.
                    </span>
                </motion.p>
            </div>
        </section>
    );
}
