"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
    items: React.ReactNode[];
    autoPlay?: boolean;
    interval?: number;
    className?: string;
    showArrows?: boolean;
    showDots?: boolean;
}

export default function Carousel({
    items,
    autoPlay = true,
    interval = 5000,
    className,
    showArrows = true,
    showDots = true,
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    const slidePrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    }, [items.length]);

    useEffect(() => {
        if (autoPlay) {
            const timer = setInterval(slideNext, interval);
            return () => clearInterval(timer);
        }
    }, [autoPlay, interval, slideNext]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0,
        }),
    };

    return (
        <div className={cn("relative overflow-hidden w-full h-full group", className)}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    className="absolute inset-0"
                >
                    {items[currentIndex]}
                </motion.div>
            </AnimatePresence>

            {showArrows && items.length > 1 && (
                <>
                    <button
                        onClick={slidePrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 glass opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={slideNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 glass opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {showDots && items.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                index === currentIndex ? "bg-primary w-8" : "bg-white/50"
                            )}
                        />
                    ))}
                </div>
            )}

            <style jsx>{`
        .glass {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: white;
        }
        .w-full { width: 100%; }
        .h-full { height: 100%; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .overflow-hidden { overflow: hidden; }
        .z-10 { z-index: 10; }
        .flex { display: flex; }
        .gap-2 { gap: 0.5rem; }
      `}</style>
        </div>
    );
}
