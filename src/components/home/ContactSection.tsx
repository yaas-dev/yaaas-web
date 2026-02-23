"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-background">
            <div className="container mx-auto px-4">
                {/* Figma Header Style */}
                <div className="section-title mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em]">CONTACT US</h2>
                </div>

                <div className="max-w-7xl mx-auto">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#666666] font-bold">FULL NAME</label>
                            <input
                                type="text"
                                placeholder="NAME"
                                className="bg-transparent border-b border-[#333333] py-4 outline-none focus:border-primary transition-colors text-sm tracking-widest uppercase font-medium"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#666666] font-bold">EMAIL ADDRESS</label>
                            <input
                                type="email"
                                placeholder="EMAIL"
                                className="bg-transparent border-b border-[#333333] py-4 outline-none focus:border-primary transition-colors text-sm tracking-widest uppercase font-medium"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#666666] font-bold">COUNTRY</label>
                            <input
                                type="text"
                                placeholder="COUNTRY"
                                className="bg-transparent border-b border-[#333333] py-4 outline-none focus:border-primary transition-colors text-sm tracking-widest uppercase font-medium"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#666666] font-bold">SUBJECT</label>
                            <input
                                type="text"
                                placeholder="SUBJECT"
                                className="bg-transparent border-b border-[#333333] py-4 outline-none focus:border-primary transition-colors text-sm tracking-widest uppercase font-medium"
                            />
                        </div>

                        <div className="md:col-span-2 flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-widest text-[#666666] font-bold">MESSAGE</label>
                            <textarea
                                rows={4}
                                placeholder="MESSAGE"
                                className="bg-transparent border-b border-[#333333] py-4 outline-none focus:border-primary transition-colors text-sm tracking-widest uppercase font-medium resize-none"
                            />
                        </div>

                        <div className="md:col-span-2 mt-8">
                            <button
                                type="submit"
                                className="w-full bg-primary text-black font-bold uppercase tracking-[0.4em] py-5 text-sm hover:opacity-90 transition-all shadow-lg"
                            >
                                SEND
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <style jsx>{`
        .py-24 { padding: 6rem 0; }
        .bg-background { background-color: #000000; }
        .container { max-width: 1400px; margin: 0 auto; }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        @media (min-width: 768px) {
          .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .md\:col-span-2 { grid-column: span 2 / span 2; }
        }
      `}</style>
        </section>
    );
}
