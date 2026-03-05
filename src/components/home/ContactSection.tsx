"use client";

import React, { useState } from 'react';
import { submitEnquiry } from '@/actions/enquiryActions';
import { CheckCircle } from 'lucide-react';

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
            className="relative py-12 md:py-16 w-full max-h-[100vh] overflow-hidden flex flex-col justify-center"
            style={{
                backgroundColor: "#080807",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231c1b16' fill-opacity='1'%3E%3Cpath d='M30 60C13.431 60 0 46.569 0 30S13.431 0 30 0s30 13.431 30 30-13.431 30-30 30zM30 4C15.64 4 4 15.64 4 30s11.64 26 26 26 26-11.64 26-26S44.36 4 30 4zm0 46c-11.046 0-20-8.954-20-20S18.954 10 30 10s20 8.954 20 20-8.954 20-20 20zm0-4C21.163 46 14 38.837 14 30s7.163-16 16-16 16 7.163 16 16-7.163 16-16 16zm0-4c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zm0-4c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px',
                backgroundPosition: 'center'
            }}
        >
            <div>

                {/* Header Section */}
                <div className="w-full relative pt-4 md:pt-8 mb-8 md:mb-12 z-50">
                    <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-[0.15em] uppercase text-white mb-2 ml-[10%]">
                        CONTACT US
                    </h2>
                    <div className="w-[75%] md:w-[30%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl min-h-[400px] flex flex-col justify-center">
                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center text-center py-10">
                            <CheckCircle size={64} className="text-[#B59431] mb-6" />
                            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest mb-4">Message Received</h3>
                            <p className="text-[#B59431] text-xs md:text-sm uppercase tracking-[0.2em] font-medium max-w-md">
                                Thank you for reaching out to YAAAS Agency. <br className="hidden md:block" />
                                We will be in touch shortly.
                            </p>
                        </div>
                    ) : (
                        <form className="grid grid-cols-2 gap-x-4 md:gap-x-12 gap-y-6 md:gap-y-10" onSubmit={handleSubmit}>
                            {[
                                { label: "FULL NAME", type: "text", placeholder: "NAME", name: "name" },
                                { label: "EMAIL ADDRESS", type: "email", placeholder: "EMAIL", name: "email" },
                                { label: "COUNTRY", type: "text", placeholder: "COUNTRY", name: "country" },
                                { label: "SUBJECT", type: "text", placeholder: "SUBJECT", name: "subject" },
                            ].map(({ label, type, placeholder, name }) => (
                                <div key={label} className="flex flex-col gap-2 md:gap-3">
                                    <label className="text-[9px] md:text-[11px] uppercase tracking-widest text-[#B59431] font-bold">{label}</label>
                                    <input
                                        required
                                        name={name}
                                        type={type}
                                        placeholder={placeholder}
                                        className="bg-transparent border-b border-white/20 py-2 md:py-3 outline-none focus:border-[#B59431] transition-colors text-[10px] sm:text-xs md:text-sm tracking-widest uppercase font-medium placeholder-gray-600 text-white"
                                    />
                                </div>
                            ))}

                            <div className="col-span-2 flex flex-col gap-2 md:gap-3">
                                <label className="text-[9px] md:text-[11px] uppercase tracking-widest text-[#B59431] font-bold">MESSAGE</label>
                                <textarea
                                    required
                                    name="message"
                                    rows={4}
                                    placeholder="YOUR MESSAGE HERE..."
                                    className="bg-transparent border-b border-white/20 py-2 md:py-3 outline-none focus:border-[#B59431] transition-colors text-[10px] sm:text-xs md:text-sm tracking-widest uppercase font-medium resize-none placeholder-gray-600 text-white"
                                />
                            </div>

                            <div className="col-span-2 mt-4 md:mt-8 flex justify-center md:justify-start">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full md:w-auto bg-[#B59431] text-black font-extrabold uppercase tracking-[0.2em] px-12 py-3 md:py-4 text-xs md:text-sm hover:bg-[#d4ae3b] transition-all rounded shadow-lg disabled:opacity-50"
                                >
                                    {isLoading ? 'SENDING...' : 'SEND MESSAGE'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
