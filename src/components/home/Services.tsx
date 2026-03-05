"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ServiceAccordion, { Service } from "@/components/ServiceAccordion";

const servicesList: Service[] = [
    {
        id: "branding-creative-strategy",
        number: "01",
        title: "CREATIVE DIRECTION + STRATEGY",
        image: "/images/service_1.png",
        description: "We craft intentional creative strategies rooted in culture, insight, and long‑term vision. From concept development to execution oversight, we align storytelling with clear objectives to ensure meaningful and measurable impact."
    },
    {
        id: "talent-development-representation",
        number: "02",
        title: "TALENTS DEVELOPMENT + REPRESENTATION",
        image: "/images/service_2.png",
        description: "We nurture and represent multidisciplinary creatives, providing strategic guidance, institutional access, and partnership opportunities that support sustainable growth and global positioning."
    },
    {
        id: "experiential-cultural-programming",
        number: "03",
        title: "EXPERIENTIAL + CULTURAL PROGRAMMING",
        image: "/images/service_3.png",
        description: "We design and produce immersive cultural experiences that connect audiences to art in powerful ways — from exhibitions and residencies to live activations and interdisciplinary collaborations."
    }
];

export default function Services() {
    return (
        <section
            id="services"
            className="relative w-full max-h-[100vh] min-h-[600px] overflow-hidden flex flex-col"
            style={{
                backgroundColor: "#080807",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231c1b16' fill-opacity='1'%3E%3Cpath d='M30 60C13.431 60 0 46.569 0 30S13.431 0 30 0s30 13.431 30 30-13.431 30-30 30zM30 4C15.64 4 4 15.64 4 30s11.64 26 26 26 26-11.64 26-26S44.36 4 30 4zm0 46c-11.046 0-20-8.954-20-20S18.954 10 30 10s20 8.954 20 20-8.954 20-20 20zm0-4C21.163 46 14 38.837 14 30s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16zm0-4c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-4c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px',
                backgroundPosition: 'center'
            }}
        >
            {/* Header Section */}
            <div className="w-full relative pt-8 md:pt-12 mb-6 md:mb-8 z-50">
                <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-[0.15em] uppercase text-white mb-2 ml-[10%]">
                    THE YAAAS SERVICES
                </h2>
                <div className="w-[75%] md:w-[30%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
            </div>

            {/* Accordion List */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 pb-8 flex-1 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="w-full flex-1 flex flex-col pt-0"
                >
                    <ServiceAccordion services={servicesList} />

                    <div className="mt-8 flex justify-end">
                        <Link
                            href="/services"
                            className="text-[#B59431] text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase hover:text-white transition-colors flex items-center gap-2 group"
                        >
                            Explore All Services
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
