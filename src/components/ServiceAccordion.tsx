"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface Service {
    id: string;
    number: string;
    title: string;
    description: string;
    image: string;
}

interface ServiceAccordionProps {
    services: Service[];
}

export default function ServiceAccordion({ services }: ServiceAccordionProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenId(prev => (prev === id ? null : id));
    };

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full">
            {services.map((service) => {
                const isOpen = openId === service.id;
                const triggerId = `service-trigger-${service.id}`;
                const panelId = `service-panel-${service.id}`;

                return (
                    <div
                        key={service.id}
                        className="rounded-xl overflow-hidden bg-black flex flex-col"
                    >
                        {/* Trigger Banner */}
                        <button
                            id={triggerId}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() => toggle(service.id)}
                            className="relative w-full h-[120px] md:h-[150px] flex items-center px-6 md:px-12 text-left group overflow-hidden cursor-pointer"
                        >
                            <Image
                                src={service.image}
                                alt=""
                                fill
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-80"
                            />
                            {/* Dark gradient overlay similar to screenshot */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                            {/* Text Content */}
                            <h3 className="relative z-10 text-[#f6d353] font-bold text-[18px] sm:text-xl md:text-2xl lg:text-3xl uppercase max-w-2xl leading-tight md:leading-snug tracking-wider text-left transition-transform duration-500 group-hover:translate-x-1 font-sans">
                                {service.title.includes('+') ? (
                                    <>
                                        {service.title.split('+')[0].trim()} +
                                        <br className="hidden md:block" />
                                        <span className="md:hidden"> </span>
                                        {service.title.split('+').slice(1).join('+').trim()}
                                    </>
                                ) : (
                                    service.title
                                )}
                            </h3>
                        </button>

                        {/* Expandable panel */}
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={triggerId}
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ overflow: "hidden" }}
                                >
                                    <div className="px-6 md:px-12 py-6 md:py-8 bg-[#111]">
                                        <p className="text-gray-300 text-sm md:text-base leading-relaxed tracking-wide max-w-4xl font-light">
                                            {service.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
