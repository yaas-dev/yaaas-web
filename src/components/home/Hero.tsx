"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section style={{
            position: "relative",
            minHeight: "90vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "var(--background)",
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <Image src="/images/hero.png" alt="Hero" width={1000} height={200} style={{ maxWidth: "80vw", height: "auto" }} />
            </motion.div>
        </section>
    );
}
