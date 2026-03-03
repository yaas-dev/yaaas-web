"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-black flex flex-col pt-24 font-sans text-white pb-20">

            {/* CONTACT US Banner */}
            <div className="w-full bg-[#c1a03a] py-6 md:py-8 mt-2 shadow-2xl z-10 mb-16 md:mb-24">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-widest drop-shadow-lg">CONTACT US</h1>
                </div>
            </div>

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 relative z-20">
                <div className="mb-16 md:mb-24">
                    <p className="text-[#e0e0e0] font-light text-sm md:text-[15px] leading-8 tracking-wide max-w-2xl">
                        Interested in a collaboration, representation, or acquiring a piece from our catalogue? Reach out to our team. Let's make a difference together!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Left Column: Information */}
                    <div>
                        <div className="space-y-12">
                            <div>
                                <span className="text-[#d8b511] text-xs font-bold tracking-widest uppercase mb-3 block">Address</span>
                                <p className="text-white text-xl md:text-2xl font-light tracking-wide leading-relaxed">
                                    12 Vanguard Square, <br /> London, EC1A 4JQ
                                </p>
                            </div>
                            <div>
                                <span className="text-[#d8b511] text-xs font-bold tracking-widest uppercase mb-3 block">General Inquiries</span>
                                <p className="text-white text-xl md:text-2xl font-light tracking-wide">hello@yaaas-agency.com</p>
                            </div>
                            <div>
                                <span className="text-[#d8b511] text-xs font-bold tracking-widest uppercase mb-3 block">Artist Submissions</span>
                                <p className="text-white text-xl md:text-2xl font-light tracking-wide">submissions@yaaas-agency.com</p>
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
                                    className="flex flex-col gap-8 md:gap-12 w-full max-w-xl"
                                >
                                    <div className="flex flex-col">
                                        <label className="text-[#d8b511] text-xs font-bold tracking-widest uppercase mb-2">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            placeholder="John Doe"
                                            className="w-full bg-transparent border-b border-[#333] text-white py-3 focus:outline-none focus:border-[#d8b511] transition-colors placeholder:text-[#333]"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[#d8b511] text-xs font-bold tracking-widest uppercase mb-2">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            placeholder="john@example.com"
                                            className="w-full bg-transparent border-b border-[#333] text-white py-3 focus:outline-none focus:border-[#d8b511] transition-colors placeholder:text-[#333]"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[#d8b511] text-xs font-bold tracking-widest uppercase mb-2">Subject</label>
                                        <select className="w-full bg-transparent border-b border-[#333] text-white py-3 focus:outline-none focus:border-[#d8b511] transition-colors appearance-none cursor-pointer">
                                            <option className="bg-black">General Inquiry</option>
                                            <option className="bg-black">Art Acquisition</option>
                                            <option className="bg-black">Representation</option>
                                            <option className="bg-black">Collaboration</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col mb-4">
                                        <label className="text-[#d8b511] text-xs font-bold tracking-widest uppercase mb-2">Message</label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="How can we help?"
                                            className="w-full bg-transparent border-b border-[#333] text-white py-3 focus:outline-none focus:border-[#d8b511] transition-colors resize-none placeholder:text-[#333]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-[#d8b511] text-black font-extrabold tracking-[0.2em] uppercase py-5 rounded-sm hover:bg-white transition-all duration-300 transform hover:scale-[1.01]"
                                    >
                                        Submit
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center py-20 border border-white/5 bg-white/5 rounded-sm"
                                >
                                    <h3 className="text-3xl md:text-4xl font-serif italic font-bold mb-6 text-[#d8b511] tracking-tight">VISION ACKNOWLEDGED</h3>
                                    <p className="text-[#e0e0e0] font-light text-sm tracking-[0.3em] leading-loose max-w-sm mb-12 uppercase">
                                        Resonance expected within <br />
                                        24 solar hours.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#d8b511] border-b border-[#d8b511]/40 pb-1 hover:border-[#d8b511] transition-all"
                                    >
                                        SEND ANOTHER RESONANCE
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
