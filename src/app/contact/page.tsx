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
        <div className="pt-32 pb-24 container mx-auto px-4 min-h-screen bg-background text-white">
            <div className="mb-24">
                <div className="section-title mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase">Contact Us</h1>
                </div>
                <p className="text-[#999999] text-xs uppercase tracking-[0.3em] font-medium max-w-2xl">
                    Interested in a collaboration, representation, or acquiring a piece from our catalogue? Reach out to our team.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-24">
                <div>
                    <div className="space-y-12 mb-16">
                        <div>
                            <span className="text-primary text-[10px] block mb-4 font-bold uppercase tracking-[0.4em]">Address</span>
                            <p className="text-xl md:text-2xl font-light tracking-wide leading-relaxed">
                                12 Vanguard Square, <br /> London, EC1A 4JQ
                            </p>
                        </div>
                        <div>
                            <span className="text-primary text-[10px] block mb-4 font-bold uppercase tracking-[0.4em]">General Inquiries</span>
                            <p className="text-xl md:text-2xl font-light tracking-wide">hello@yaaas-agency.com</p>
                        </div>
                        <div>
                            <span className="text-primary text-[10px] block mb-4 font-bold uppercase tracking-[0.4em]">Artist Submissions</span>
                            <p className="text-xl md:text-2xl font-light tracking-wide">submissions@yaaas-agency.com</p>
                        </div>
                    </div>
                </div>

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
                                className="flex flex-col gap-10"
                            >
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase tracking-[0.4em] text-[#666666] font-bold">FULL NAME</label>
                                    <input
                                        required
                                        type="text"
                                        className="bg-transparent border-b border-white/10 py-4 focus:border-primary outline-none transition-colors text-sm uppercase tracking-widest font-medium"
                                        placeholder="NAME"
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase tracking-[0.4em] text-[#666666] font-bold">EMAIL ADDRESS</label>
                                    <input
                                        required
                                        type="email"
                                        className="bg-transparent border-b border-white/10 py-4 focus:border-primary outline-none transition-colors text-sm uppercase tracking-widest font-medium"
                                        placeholder="EMAIL"
                                    />
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase tracking-[0.4em] text-[#666666] font-bold">SUBJECT</label>
                                    <select className="bg-transparent border-b border-white/10 py-4 focus:border-primary outline-none transition-colors appearance-none text-xs uppercase tracking-[0.2em] font-medium text-white cursor-pointer">
                                        <option className="bg-black">GENERAL INQUIRY</option>
                                        <option className="bg-black">ART ACQUISITION</option>
                                        <option className="bg-black">REPRESENTATION</option>
                                        <option className="bg-black">COLLABORATION</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-[10px] uppercase tracking-[0.4em] text-[#666666] font-bold">MESSAGE</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="bg-transparent border-b border-white/10 py-4 focus:border-primary outline-none transition-colors resize-none text-sm uppercase tracking-widest font-medium"
                                        placeholder="HOW CAN WE HELP?"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-black font-bold uppercase tracking-[0.4em] py-5 text-sm mt-4 hover:opacity-90 transition-all shadow-lg"
                                >
                                    SEND MESSAGE
                                </button>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-20 border border-primary/20 bg-black/40"
                            >
                                <h3 className="text-4xl font-serif italic font-bold mb-6 text-primary tracking-tight">VISION ACKNOWLEDGED</h3>
                                <p className="text-[#999999] text-xs uppercase tracking-[0.3em] leading-loose max-w-xs">
                                    Resonance expected within <br />
                                    24 solar hours.
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-12 text-[10px] uppercase tracking-[0.4em] font-bold border-b border-primary/40 pb-1 hover:border-primary transition-all"
                                >
                                    SEND ANOTHER RESONANCE
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <style jsx>{`
        .pt-32 { padding-top: 8rem; }
        .mb-24 { margin-bottom: 6rem; }
        .container { max-width: 1400px; margin: 0 auto; }
      `}</style>
        </div>
    );
}
