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
                <div className="max-w-4xl flex flex-col gap-6 text-[#e0e0e0] font-light text-sm md:text-[15px] leading-8 tracking-wide">
                    <p className="text-xl md:text-2xl text-[#d8b511] mb-2">About YAAAS Agency</p>
                    <p className="md:text-[18px]">YAAAS (Yaa Asantewaa) Agency is a culture-forward creative bridge connecting visionary African talent to the world. Operating at the intersection of art, identity, and opportunity, we provide bespoke representation to a select group of multidisciplinary artists who are pushing boundaries, preserving heritage, and reimagining the future.</p>

                    <AnimatePresence>
                        {(isExpanded || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="flex flex-col md:text-[18px] gap-6 overflow-hidden"
                            >
                                <p>Rooted in the continent and reaching across the diaspora, we champion a curated roster; from emerging voices to established names. We believe the art world thrives on inclusivity; Our mission is to develop a sustainable ecosystem that champions African art and culture while positioning African creative talents for long-term global success.</p>
                                <p>Art inspires. Culture transforms. Join us in celebrating the vanguard of African creativity.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="md:hidden text-[#d8b511] font-bold text-xs tracking-widest uppercase flex items-center gap-2 mt-4 self-start"
                    >
                        {isExpanded ? 'Show Less' : 'Show More'}
                        <motion.span animate={{ rotate: isExpanded ? 180 : 0 }}>
                            <ChevronRight size={14} className="rotate-90" />
                        </motion.span>
                    </button>
                </div>
            </div>

            {/* YAAAS SERVICES (From Homepage) */}
            <div className="w-full mb-16">
                <Services />
            </div>

            {/* YAAAS COLLABORATIONS Header */}
            {/* <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-10">
                <div className="flex flex-col">
                    <h2 className="text-white text-2xl md:text-4xl font-bold tracking-[0.15em] mb-4">
                        YAAAS COLLABORATIONS
                    </h2>
                    <div className="h-1 w-[200px] md:w-[320px] bg-[#d8b511]"></div>
                </div>
            </div> */}

            {/* Collage Masonry */}
            {/* <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
                {currentCollab ? (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentCollab._id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-auto md:h-[500px]"
                        >
                            {(() => {
                                const imgCount = currentCollab.images.length;
                                const imgs = currentCollab.images;

                                switch (imgCount) {
                                    case 1:
                                        return (
                                            <div className="relative w-full h-[350px] md:h-full overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                <Image src={imgs[0]} alt="Collaboration 1" fill className="object-cover" priority sizes="100vw" />
                                            </div>
                                        );
                                    case 2:
                                        return (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px] md:h-full">
                                                <div className="relative w-full h-full overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                    <Image src={imgs[0]} alt="Collaboration 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                                                </div>
                                                <div className="relative w-full h-full overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                    <Image src={imgs[1]} alt="Collaboration 2" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                                                </div>
                                            </div>
                                        );
                                    case 3:
                                        return (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px] md:h-full">
                                                <div className="md:col-span-2 relative h-full overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                    <Image src={imgs[0]} alt="Collaboration 1" fill className="object-cover" sizes="(max-width: 768px) 100vw, 66vw" />
                                                </div>
                                                <div className="flex flex-col gap-4 h-full">
                                                    <div className="relative w-full h-1/2 overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                        <Image src={imgs[1]} alt="Collaboration 2" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                                                    </div>
                                                    <div className="relative w-full h-1/2 overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                        <Image src={imgs[2]} alt="Collaboration 3" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    case 4:
                                        return (
                                            <div className="grid grid-cols-2 gap-4 h-[500px] md:h-full">
                                                {imgs.map((img: string, idx: number) => (
                                                    <div key={idx} className="relative w-full h-full overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                        <Image src={img} alt={`Collaboration ${idx + 1}`} fill className="object-cover" sizes="(max-width: 768px) 50vw, 50vw" />
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    case 5:
                                        return (
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px] md:h-full">
                                                <div className="flex flex-col gap-4 h-full md:col-span-1">
                                                    <div className="relative w-full h-1/2 overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                        <Image src={imgs[0]} alt="Collaboration 1" fill className="object-cover" />
                                                    </div>
                                                    <div className="relative w-full h-1/2 overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                        <Image src={imgs[1]} alt="Collaboration 2" fill className="object-cover" />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 relative h-full overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                    <Image src={imgs[2]} alt="Collaboration 3" fill className="object-cover" />
                                                </div>
                                                <div className="flex flex-col gap-4 h-full md:col-span-1">
                                                    <div className="relative w-full h-1/2 overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                        <Image src={imgs[3]} alt="Collaboration 4" fill className="object-cover" />
                                                    </div>
                                                    <div className="relative w-full h-1/2 overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                        <Image src={imgs[4]} alt="Collaboration 5" fill className="object-cover" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    default: // 6+ images (Standard Masonry)
                                        return (
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-full">
                                                <div className="md:col-span-1 flex flex-col gap-4 h-[300px] md:h-full">
                                                    <div className="relative w-full h-[60%] overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                        <Image src={imgs[0]} alt="Collaboration 1" fill className="object-cover" />
                                                    </div>
                                                    <div className="relative w-full h-[40%] overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                        <Image src={imgs[1]} alt="Collaboration 2" fill className="object-cover" />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 relative h-[350px] md:h-full overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                    <Image src={imgs[2]} alt="Collaboration 3" fill className="object-cover" />
                                                </div>
                                                <div className="md:col-span-1 flex flex-col gap-4 h-[400px] md:h-full">
                                                    <div className="relative w-full h-[33%] overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                        <Image src={imgs[3]} alt="Collaboration 4" fill className="object-cover" />
                                                    </div>
                                                    <div className="relative w-full h-[34%] overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                        <Image src={imgs[4]} alt="Collaboration 5" fill className="object-cover" />
                                                    </div>
                                                    <div className="relative w-full h-[33%] overflow-hidden bg-white/5 border border-white/10 rounded-sm">
                                                        <Image src={imgs[5]} alt="Collaboration 6" fill className="object-cover opacity-80 mix-blend-luminosity" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                }
                            })()}
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="h-[450px] border border-dashed border-white/10 flex items-center justify-center text-white/20 uppercase tracking-widest text-xs italic">
                        No collaborations currently featured.
                    </div>
                )}
            </div> */}
            <ProjectGallery projects={projects} />



            {/* LATEST NEWS Header */}
            <div className="w-full flex justify-center mb-10 border-t border-white/10 pt-16">
                <div className="max-w-[1400px] w-full px-6 md:px-12 flex flex-col">
                    <h2 className="text-white text-2xl md:text-4xl font-bold tracking-[0.15em] mb-4">
                        LATEST NEWS
                    </h2>
                    <div className="h-1 w-[160px] md:w-[250px] bg-[#d8b511]"></div>
                </div>
            </div>

            {/* News Section */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {newsPosts.map((post) => (
                        <Link href={`/news/${post._id}`} key={post._id} className="flex flex-col group cursor-pointer w-full max-w-[400px] mx-auto">
                            <span className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mb-4">{post.category || 'NEWS'}</span>
                            <h4 className="text-[#d8b511] font-bold text-sm md:text-base tracking-wide leading-snug mb-6 h-[48px] overflow-hidden uppercase">
                                {post.title}
                            </h4>
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/5 opacity-80 group-hover:opacity-100">
                                <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <p className="text-[#d8b511] font-medium text-xs md:text-sm tracking-wide leading-relaxed line-clamp-3">
                                {post.contentBlurb}
                            </p>
                        </Link>
                    ))}
                </div>

                {newsPosts.length === 0 && (
                    <div className="text-center py-20 text-white/20 italic tracking-widest uppercase">
                        No recent stories found.
                    </div>
                )}

                {/* News Pagination */}
                <div className="flex justify-end items-center gap-3 mt-16 max-w-[1250px] mx-auto">
                    <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#333] flex items-center justify-center text-white hover:bg-[#d8b511] hover:text-black transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#333] flex items-center justify-center text-white hover:bg-[#d8b511] hover:text-black transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* CONTACT US */}
            <ContactSection />
        </main>
    );
}
