"use client";

import React from 'react';

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="relative py-24 w-full overflow-hidden"
            style={{
                backgroundColor: "#080807",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231c1b16' fill-opacity='1'%3E%3Cpath d='M30 60C13.431 60 0 46.569 0 30S13.431 0 30 0s30 13.431 30 30-13.431 30-30 30zM30 4C15.64 4 4 15.64 4 30s11.64 26 26 26 26-11.64 26-26S44.36 4 30 4zm0 46c-11.046 0-20-8.954-20-20S18.954 10 30 10s20 8.954 20 20-8.954 20-20 20zm0-4C21.163 46 14 38.837 14 30s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16zm0-4c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-4c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px',
                backgroundPosition: 'center'
            }}
        >
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-white">

                {/* Header Section */}
                <div className="mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold tracking-[0.15em] uppercase text-white mb-4 md:mb-6">
                        CONTACT US
                    </h2>
                    <div className="w-64 md:w-80 h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {[
                            { label: "FULL NAME", type: "text", placeholder: "NAME" },
                            { label: "EMAIL ADDRESS", type: "email", placeholder: "EMAIL" },
                            { label: "COUNTRY", type: "text", placeholder: "COUNTRY" },
                            { label: "SUBJECT", type: "text", placeholder: "SUBJECT" },
                        ].map(({ label, type, placeholder }) => (
                            <div key={label} className="flex flex-col gap-3">
                                <label className="text-[11px] uppercase tracking-widest text-[#B59431] font-bold">{label}</label>
                                <input
                                    type={type}
                                    placeholder={placeholder}
                                    className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#B59431] transition-colors text-sm tracking-widest uppercase font-medium placeholder-gray-600 text-white"
                                />
                            </div>
                        ))}

                        <div className="md:col-span-2 flex flex-col gap-3">
                            <label className="text-[11px] uppercase tracking-widest text-[#B59431] font-bold">MESSAGE</label>
                            <textarea
                                rows={5}
                                placeholder="YOUR MESSAGE HERE..."
                                className="bg-transparent border-b border-white/20 py-3 outline-none focus:border-[#B59431] transition-colors text-sm tracking-widest uppercase font-medium resize-none placeholder-gray-600 text-white"
                            />
                        </div>

                        <div className="md:col-span-2 mt-8 flex justify-center md:justify-start">
                            <button
                                type="submit"
                                className="w-full md:w-auto bg-[#B59431] text-black font-extrabold uppercase tracking-[0.2em] px-12 py-4 text-sm hover:bg-[#d4ae3b] transition-all rounded shadow-lg"
                            >
                                SEND MESSAGE
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
