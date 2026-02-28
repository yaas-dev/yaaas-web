"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Service {
    id: string;
    number: string;
    title: string;
    description: string;
    image?: string;
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
        <div role="list">
            {services.map((service) => {
                const isOpen = openId === service.id;
                const triggerId = `service-trigger-${service.id}`;
                const panelId = `service-panel-${service.id}`;

                return (
                    <div
                        key={service.id}
                        role="listitem"
                        style={{ borderBottom: "1px solid #1a1a1a" }}
                    >
                        {/* Trigger row */}
                        <button
                            id={triggerId}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() => toggle(service.id)}
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "2rem 0",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                textAlign: "left",
                                gap: "1.5rem",
                            }}
                        >
                            {/* Left: number + title */}
                            <div style={{ display: "flex", alignItems: "baseline", gap: "1.75rem", flex: 1 }}>
                                <span style={{
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    letterSpacing: "0.3em",
                                    color: "#B89C24",
                                    fontFamily: "monospace",
                                    flexShrink: 0,
                                }}>
                                    {service.number}
                                </span>
                                <span style={{
                                    fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)",
                                    fontWeight: 700,
                                    letterSpacing: "0.12em",
                                    textTransform: "uppercase",
                                    color: isOpen ? "#B89C24" : "#ffffff",
                                    transition: "color 0.25s ease",
                                }}>
                                    {service.title}
                                </span>
                            </div>

                            {/* Right: +/× icon */}
                            <motion.span
                                animate={{ rotate: isOpen ? 45 : 0 }}
                                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 32,
                                    height: 32,
                                    border: "1px solid",
                                    borderColor: isOpen ? "#B89C24" : "#333333",
                                    color: isOpen ? "#B89C24" : "#888888",
                                    fontSize: "1.25rem",
                                    lineHeight: 1,
                                    flexShrink: 0,
                                    transition: "border-color 0.25s ease, color 0.25s ease",
                                }}
                                aria-hidden="true"
                            >
                                +
                            </motion.span>
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
                                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ overflow: "hidden" }}
                                >
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: service.image ? "1fr auto" : "1fr",
                                        gap: "3rem",
                                        alignItems: "center",
                                        paddingBottom: "2.5rem",
                                        paddingLeft: "calc(10px * 0.3 * 2.5 + 1.75rem + 10px)",
                                    }}>
                                        {/* Description text */}
                                        <div>
                                            <p style={{
                                                color: "#999999",
                                                fontSize: "0.85rem",
                                                lineHeight: 1.9,
                                                letterSpacing: "0.04em",
                                                maxWidth: "640px",
                                            }}>
                                                {service.description}
                                            </p>
                                        </div>

                                        {/* Optional image */}
                                        {service.image && (
                                            <div style={{
                                                width: 180,
                                                height: 140,
                                                overflow: "hidden",
                                                flexShrink: 0,
                                                border: "1px solid #1a1a1a",
                                            }}>
                                                <img
                                                    src={service.image}
                                                    alt=""
                                                    aria-hidden="true"
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        filter: "grayscale(60%)",
                                                    }}
                                                />
                                            </div>
                                        )}
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
