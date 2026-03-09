"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export interface Service {
    id: string;
    number: string;
    title: string;
    description: string;
    image: string;
}

interface ServiceAccordionProps {
    services: Service[];
    initialAllOpen?: boolean;
    allowToggle?: boolean;
    isLinkOnly?: boolean;
}

export default function ServiceAccordion({
    services,
    initialAllOpen = false,
    allowToggle = true,
    isLinkOnly = false
}: ServiceAccordionProps) {
    const [openId, setOpenId] = useState<string | null>(initialAllOpen ? null : null); // null if initialAllOpen is handled per-item

    const toggle = (id: string) => {
        if (!allowToggle) return;
        setOpenId(prev => (prev === id ? null : id));
    };

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full">
            {services.map((service) => {
                const isOpen = initialAllOpen || openId === service.id;
                const triggerId = `service-trigger-${service.id}`;
                const panelId = `service-panel-${service.id}`;

                const Content = (
                    <div className="rounded-xl overflow-hidden bg-black flex flex-col">
                        {/* Trigger Banner */}
                        <div
                            id={triggerId}
                            role={allowToggle ? "button" : undefined}
                            aria-expanded={allowToggle ? isOpen : undefined}
                            aria-controls={allowToggle ? panelId : undefined}
                            onClick={() => toggle(service.id)}
                            className={`relative w-full h-[120px] md:h-[150px] flex items-center px-6 md:px-12 text-left group overflow-hidden ${allowToggle ? 'cursor-pointer' : isLinkOnly ? 'cursor-pointer' : 'cursor-default'}`}
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
                        </div>

                        {/* Expandable panel */}
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={triggerId}
                                    initial={initialAllOpen ? false : { height: 0, opacity: 0 }}
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

                if (isLinkOnly) {
                    return (
                        <Link key={service.id} href="/services" className="block">
                            {Content}
                        </Link>
                    );
                }

                return <div key={service.id}>{Content}</div>;
            })}
        </div>
    );
}
