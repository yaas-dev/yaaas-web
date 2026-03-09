"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function WelcomePopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after a short delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1500);

        // Auto-dismiss after 6 seconds
        const dismissTimer = setTimeout(() => {
            setIsVisible(false);
        }, 7500);

        return () => {
            clearTimeout(timer);
            clearTimeout(dismissTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVisible(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Popup Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="relative w-full h-full bg-black overflow-hidden"
                    >
                        <Image
                            src="/images/popup.png"
                            alt="Welcome"
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Close Button */}
                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-8 right-8 p-3 bg-black/50 text-[#B59431] border border-[#B59431]/30 rounded-full hover:bg-[#B59431] hover:text-black transition-all z-[110] shadow-2xl"
                        >
                            <X size={24} />
                        </button>

                        {/* Hint to close */}
                        <div className="absolute bottom-12 left-0 right-0 flex justify-center z-[110]">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-bold hover:text-[#B59431] transition-colors"
                            >
                                Click anywhere to continue
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
