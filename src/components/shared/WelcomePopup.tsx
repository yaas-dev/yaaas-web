"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function WelcomePopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has seen the popup before
        const hasSeen = localStorage.getItem('yaaas_welcome_seen');

        if (!hasSeen) {
            // Show after a short delay
            const timer = setTimeout(() => {
                setIsVisible(true);
                // Mark as seen immediately when shown
                localStorage.setItem('yaaas_welcome_seen', 'true');
            }, 2000);

            // Auto-dismiss after 8 seconds
            const dismissTimer = setTimeout(() => {
                setIsVisible(false);
            }, 10000);

            return () => {
                clearTimeout(timer);
                clearTimeout(dismissTimer);
            };
        }
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsVisible(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Popup Card Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-[800px] bg-black overflow-hidden rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col p-4 md:p-8"
                    >
                        <div className="relative w-full aspect-[4/5] md:aspect-[3/4]">
                            <Image
                                src="/images/popup.png"
                                alt="Welcome"
                                fill
                                className="object-contain opacity-100 transition-transform duration-[10s] hover:scale-105"
                                priority
                            />
                        </div>

                        {/* Top Gradient Overlay - Subtle */}
                        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>


                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
