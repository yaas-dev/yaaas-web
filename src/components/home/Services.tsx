"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const servicesList = [
    {
        id: 1,
        text: "Creative direction + strategy",
        image: "/images/service_1.png"
    },
    {
        id: 2,
        text: "Talents development + representation ",
        image: "/images/service_2.png"
    },
    {
        id: 3,
        text: "Experiential + cultural programming",
        image: "/images/service_3.png"
    }
];

export default function Services() {
    return (
        <section
            id="services"
            className="relative w-full overflow-hidden"
            style={{
                backgroundColor: "#080807",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231c1b16' fill-opacity='1'%3E%3Cpath d='M30 60C13.431 60 0 46.569 0 30S13.431 0 30 0s30 13.431 30 30-13.431 30-30 30zM30 4C15.64 4 4 15.64 4 30s11.64 26 26 26 26-11.64 26-26S44.36 4 30 4zm0 46c-11.046 0-20-8.954-20-20S18.954 10 30 10s20 8.954 20 20-8.954 20-20 20zm0-4C21.163 46 14 38.837 14 30s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16zm0-4c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-4c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px',
                backgroundPosition: 'center'
            }}
        >
            {/* Header Section */}
            <div className="w-full relative pt-12 md:pt-24 mb-16 md:mb-24 z-50">
                <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold tracking-[0.15em] uppercase text-white mb-4 md:mb-6 ml-[10%]">
                    THE YAAAS SERVICES
                </h2>
                <div className="w-[75%] md:w-[30%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
            </div>

            {/* Content List */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-24 flex flex-col gap-16 md:gap-24 items-center">
                {servicesList.map((service, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex items-center"
                        >
                            {/* Background Image Layer */}
                            <div className="absolute inset-0 w-full h-full bg-gray-800 z-0 flex items-center justify-center">
                                <Image
                                    src={service.image}
                                    alt={service.text}
                                    fill
                                    className="object-cover object-center"
                                />
                            </div>

                            {/* Dark Gradient Overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

                            {/* Text Content */}
                            <div className="relative z-20 w-full md:w-2/3 px-8 md:px-16 text-left">
                                <h3 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide leading-tight">
                                    {service.text}
                                </h3>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
