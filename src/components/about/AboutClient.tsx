"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Services from '@/components/home/Services';
import { submitEnquiry } from '@/actions/enquiryActions';
import ContactSection from '../home/ContactSection';
import ProjectGallery from '../home/ProjectGallery';

interface AboutClientProps {
    newsPosts: any[];
    collaborations: any[];
    projects: any[];
}

export default function AboutClient({ newsPosts, collaborations, projects }: AboutClientProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentCollabIndex, setCurrentCollabIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const currentCollab = collaborations[currentCollabIndex] || null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            type: 'CONTACT'
        };

        const res = await submitEnquiry(data);
        setIsLoading(false);

        if (res.success) {
            setIsSubmitted(true);
            e.currentTarget.reset();
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        } else {
            alert('Failed to send message. Please try again.');
        }
    };

    const nextCollab = () => {
        if (collaborations.length === 0) return;
        setCurrentCollabIndex((prev) => (prev + 1) % collaborations.length);
    };

    const prevCollab = () => {
        if (collaborations.length === 0) return;
        setCurrentCollabIndex((prev) => (prev - 1 + collaborations.length) % collaborations.length);
    };

    return (
        <main className="min-h-screen bg-black flex flex-col pt-24 font-sans text-white pb-10">

            {/* ABOUT US Banner */}
            <div className="w-full bg-[#c1a03a] py-6 md:py-8 mt-5 shadow-2xl z-10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <h1 className="text-white text-3xl md:text-[64px] uppercase tracking-widest">ABOUT US</h1>
                </div>
            </div>

            {/* Intro Text */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column: Text Content */}
                    <div className="flex flex-col gap-6 text-[#e0e0e0] font-light text-sm md:text-[15px] leading-8 tracking-wide">
                        <p className="text-xl md:text-2xl text-[#d8b511] mb-2 font-bold tracking-widest uppercase">About YAAAS Agency</p>
                        <p className="md:text-[18px] text-justify leading-relaxed">YAAAS (Yaa Asantewaa) Agency is a culture-forward creative bridge connecting visionary African talent to the world. Operating at the intersection of art, identity, and opportunity, we provide bespoke representation to a select group of multidisciplinary artists who are pushing boundaries, preserving heritage, and reimagining the future.</p>

                        <AnimatePresence>
                            {(isExpanded || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex flex-col md:text-[18px] gap-6 overflow-hidden"
                                >
                                    <p className="text-justify leading-relaxed">Rooted in the continent and reaching across the diaspora, we champion a curated roster; from emerging voices to established names. We believe the art world thrives on inclusivity; Our mission is to develop a sustainable ecosystem that champions African art and culture while positioning African creative talents for long-term global success.</p>
                                    <p className="text-justify leading-relaxed">Art inspires. Culture transforms. Join us in celebrating the vanguard of African creativity.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="md:hidden text-[#d8b511] font-bold text-xs tracking-widest uppercase flex items-center gap-2 mt-4 self-start"
                        >
                            {isExpanded ? 'Show Less' : 'Show More'}
                            <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} className="flex items-center">
                                <ChevronRight size={14} className="rotate-90" />
                            </motion.span>
                        </button>
                    </div>

                    {/* Right Column: Branded Image */}
                    <div className="w-full flex justify-center lg:justify-end px-4 lg:px-0 relative z-10 group">
                        {/* Decorative background element */}
                        <div className="absolute inset-0 bg-[#d8b511]/5 rounded-sm -rotate-3 transition-transform duration-700 group-hover:rotate-0 scale-95 border border-white/5"></div>

                        <div className="relative w-full max-w-[550px] aspect-square lg:h-[550px] rounded-sm overflow-hidden flex items-center justify-center">
                            <Image
                                src="/images/about2.png"
                                alt="YAAAS Branded Element"
                                width={1000}
                                height={1000}
                                className="object-contain drop-shadow-[0_0_50px_rgba(216,181,17,0.15)] p-6 md:p-10 transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* <ProjectGallery projects={projects} /> */}

            {/* CONTACT US */}
            <ContactSection />
        </main>
    );
}
