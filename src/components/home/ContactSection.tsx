"use client";

import React, { useState } from 'react';
import { submitEnquiry } from '@/actions/enquiryActions';
import { CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

export default function ContactSection() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            type: 'CONTACT',
            metadata: {
                country: formData.get('country')
            }
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

    return (
        <section
            id="contact"
            className="relative w-full overflow-hidden flex flex-col justify-center py-14 md:py-20"
            style={{ backgroundColor: "#F1EFE8" }}

        >
            <div className="mx-auto max-w-7xl w-full px-5 md:px-8 relative z-20">

                {/* Header Section */}
                <div className="w-full relative mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.1em] uppercase text-[#171717] mb-2">
                        CONTACT US
                    </h2>
                    <div className="w-20 h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>
                    <div className="mb-8 md:mb-12 max-w-3xl">
                        <p className="text-[#55534E] font-light text-base md:text-lg leading-relaxed tracking-wide w-full">
                            Whether you are looking for representation, a new addition to your collection, or a creative partnership, we are here to connect. Reach out and let's start the conversation.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

                        {/* Left Column: Information */}
                        <div>
                            <div className="space-y-12">
                                <div>
                                    <span className="text-[#B59431] text-xs font-bold tracking-widest uppercase mb-3 block">General Inquiries</span>
                                    <p className="text-[#171717] text-xl md:text-2xl font-light tracking-wide">hello@yaaas.co</p>
                                </div>

                            </div>
                        </div>

                        {/* Right Column: Interactive Form */}
                        <div className="relative">
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.6 }}
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-5 md:gap-7 w-full max-w-xl"
                                    >
                                        <div className="flex flex-col">
                                            <label className="text-[#B59431] text-xs font-bold tracking-widest uppercase mb-2">Full Name</label>
                                            <input
                                                required
                                                name="name"
                                                type="text"
                                                placeholder="John Doe"
                                                className="w-full bg-transparent border-b border-black/20 text-[#171717] py-3 focus:outline-none focus:border-[#B59431] transition-colors placeholder:text-[#999]"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-[#B59431] text-xs font-bold tracking-widest uppercase mb-2">Email Address</label>
                                            <input
                                                required
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                className="w-full bg-transparent border-b border-black/20 text-[#171717] py-3 focus:outline-none focus:border-[#B59431] transition-colors placeholder:text-[#999]"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="text-[#B59431] text-xs font-bold tracking-widest uppercase mb-2">Subject</label>
                                            <select name="subject" className="w-full bg-transparent border-b border-black/20 text-[#171717] py-3 focus:outline-none focus:border-[#B59431] transition-colors appearance-none cursor-pointer">
                                                <option className="bg-[#F7F6F1] text-[#171717]">General Inquiry</option>
                                                <option className="bg-[#F7F6F1] text-[#171717]">Art Acquisition</option>
                                                <option className="bg-[#F7F6F1] text-[#171717]">Representation</option>
                                                <option className="bg-[#F7F6F1] text-[#171717]">Collaboration</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col mb-4">
                                            <label className="text-[#B59431] text-xs font-bold tracking-widest uppercase mb-2">Message</label>
                                            <textarea
                                                required
                                                name="message"
                                                rows={4}
                                                placeholder="How can we help?"
                                                className="w-full bg-transparent border-b border-black/20 text-[#171717] py-3 focus:outline-none focus:border-[#B59431] transition-colors resize-none placeholder:text-[#999]"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-[#B59431] text-black font-extrabold tracking-[0.2em] uppercase py-5 rounded-sm hover:bg-white transition-all duration-300 transform hover:scale-[1.01]"
                                        >
                                            Submit
                                        </button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center py-20 border border-black/10 bg-white/60 rounded-sm"
                                    >
                                        <h3 className="text-3xl md:text-4xl font-serif italic font-bold mb-6 text-[#B59431] tracking-tight">VISION ACKNOWLEDGED</h3>
                                        <p className="text-[#55534E] font-light text-sm tracking-[0.3em] leading-loose max-w-sm mb-12 uppercase">
                                            Resonance expected within <br />
                                            24 solar hours.
                                        </p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#B59431] border-b border-[#B59431]/40 pb-1 hover:border-[#B59431] transition-all"
                                        >
                                            SEND ANOTHER RESONANCE
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
            </div>
        </section>
    );
}
