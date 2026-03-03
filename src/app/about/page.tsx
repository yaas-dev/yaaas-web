"use client";

import React from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Services from '@/components/home/Services';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black flex flex-col pt-24 font-sans text-white pb-10">

            {/* ABOUT US Banner */}
            <div className="w-full bg-[#c1a03a] py-6 md:py-8 mt-2 shadow-2xl z-10">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <h1 className="text-white text-3xl md:text-5xl font-bold uppercase tracking-widest drop-shadow-lg">ABOUT US</h1>
                </div>
            </div>

            {/* Intro Text */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-20 relative z-20">
                <div className="max-w-4xl flex flex-col gap-8 text-[#e0e0e0] font-light text-sm md:text-[15px] leading-8 tracking-wide">
                    <p>Our agency is dedicated to promoting African art and culture by providing a platform for talented creatives to showcase their work to a wider audience. We believe that inclusivity and diversity should mirror the rich tapestry of human existence, and we are proud to be part of making a positive impact.</p>
                    <p>Our team works with artists from all over the continent, from emerging talents to established names. We provide support and representation to help these creatives navigate the often-challenging art world. At The Yaaas Asantewaa (Yaaas) Agency, we are committed to discovering and promoting new talent globally. Our ultimate goal is to create a vibrant and sustainable ecosystem that supports African art and culture. We take pride in representing a diverse range of artists from painters and sculptors to photographers and fashion designers.</p>
                    <p>We believe that art can inspire, educate and transform society, and our mission is to make it accessible to the world. We invite you to join us on our journey to celebrate African creativity and talent, and let's make a difference together!</p>
                </div>
            </div>

            {/* YAAAS SERVICES (From Homepage) */}
            <div className="w-full mb-16">
                <Services />
            </div>

            {/* YAAAS COLLABORATIONS Header */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-10">
                <div className="flex flex-col">
                    <h2 className="text-white text-2xl md:text-4xl font-bold tracking-[0.15em] mb-4">
                        YAAAS COLLABORATIONS
                    </h2>
                    <div className="h-1 w-[200px] md:w-[320px] bg-[#d8b511]"></div>
                </div>
            </div>

            {/* Collage Masonry */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 h-auto md:h-[450px]">
                    {/* Left Column (2 images) */}
                    <div className="md:col-span-1 flex flex-col gap-2 md:gap-4 h-[300px] md:h-full">
                        <div className="relative w-full h-[60%] overflow-hidden bg-white/5 border border-white/10">
                            <Image src="/images/service_1.png" alt="Collaboration Action" fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                        </div>
                        <div className="relative w-full h-[40%] overflow-hidden bg-white/5 border border-white/10">
                            <Image src="/images/about.jpg" alt="Gallery Details" fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                        </div>
                    </div>

                    {/* Middle Column (Large center image) */}
                    <div className="md:col-span-2 relative h-[350px] md:h-full overflow-hidden bg-white/5 border border-white/10">
                        <Image src="/images/project.png" alt="Exhibition View" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>

                    {/* Right Column (3 images stacked) */}
                    <div className="md:col-span-1 flex flex-col gap-2 md:gap-4 h-[400px] md:h-full">
                        <div className="relative w-full h-[33%] overflow-hidden bg-white/5 border border-white/10">
                            <Image src="/images/service_2.png" alt="Opening Night" fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                        </div>
                        <div className="relative w-full h-[34%] overflow-hidden bg-white/5 border border-white/10">
                            <Image src="/images/service_3.png" alt="Art Presentation" fill className="object-cover p-2" sizes="(max-width: 768px) 100vw, 25vw" />
                        </div>
                        <div className="relative w-full h-[33%] overflow-hidden bg-white/5 border border-white/10">
                            <Image src="/images/service_1.png" alt="Networking at Event" fill className="object-cover opacity-80 mix-blend-luminosity" sizes="(max-width: 768px) 100vw, 25vw" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 1954 OBMUN */}
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-32">
                <h3 className="text-[#d8b511] font-bold text-lg md:text-xl tracking-[0.2em] mb-8">1954 OBMUN</h3>
                <div className="text-[#e0e0e0] font-light text-sm md:text-[15px] leading-8 tracking-wide space-y-6 max-w-5xl">
                    <p>The Yaaas Asantewaa Agency was honoured to take part in the creation of the 1954 OBMUN Art Experience alongside Africana Room. We lead our contributions with resources including sourcing 10 artists from across the continent, implementing the execution process, and ensuring successful integration. The project is an ongoing exploration into pan-african representations, museums, curating studies, and conceptual curation. The 1954 OBMUN Art Experience is a travelling gallery that aims to bridge the gap between visual arts and academia, showcasing in Accra, London, Lagos, and other major cities.</p>
                    <p>This project served as a means of democratizing the art world, making it more accessible to a broader audience and breaking down barriers to comprehensive and coherent paths. The recognition of international media outlets such as CNN, Rolling Stones, and The Guardian is a testament to the project's success in generating a buzz. The 1954 OBMUN showroom stood out amidst a heavily dominated industry and was recognized as one of the game-changing albums of 2023.</p>
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-3 mt-10 justify-end max-w-5xl">
                    <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#888] flex items-center justify-center text-black hover:bg-white transition-colors">
                        <ChevronLeft size={18} />
                    </button>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#d8b511]"></div>
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#888]"></div>
                    <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#888] flex items-center justify-center text-black hover:bg-white transition-colors">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

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
                    {[1, 2, 3].map((item) => (
                        <Link href="/news/sandra-gela" key={item} className="flex flex-col group cursor-pointer w-full max-w-[400px] mx-auto">
                            <span className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mb-4">NEWS</span>
                            <h4 className="text-[#d8b511] font-bold text-sm md:text-base tracking-wide leading-snug mb-6 h-[48px] overflow-hidden">Sandra Gela: A multi-form artist at The Brooklyn Museum</h4>
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm mb-6 grayscale group-hover:grayscale-0 transition-opacity duration-500 border border-white/5 opacity-80 group-hover:opacity-100">
                                <Image src="/images/service_1.png" alt="News Article Feature" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <p className="text-[#d8b511] font-medium text-xs md:text-sm tracking-wide leading-relaxed line-clamp-3">The Brooklyn Museum opens 'Sandra Gela: A Multi-form Artist' on October 25th. The first expansive survey and celebration of the pioneering multidisciplinary artist, the exhibit explores...</p>
                        </Link>
                    ))}
                </div>

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
            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-20">
                <div className="flex flex-col mb-16">
                    <h2 className="text-white text-2xl md:text-4xl font-bold tracking-[0.15em] mb-4">
                        CONTACT US
                    </h2>
                    <div className="h-1 w-[120px] md:w-[220px] bg-[#d8b511]"></div>
                </div>

                <form className="w-full max-w-4xl mx-auto flex flex-col gap-8 md:gap-12" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col">
                        <label className="text-[#d8b511] text-xs font-bold tracking-widest uppercase mb-2">Name</label>
                        <input type="text" placeholder="John Doe" className="w-full bg-transparent border-b border-[#333] text-white py-3 focus:outline-none focus:border-[#d8b511] transition-colors placeholder:text-[#333]" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#d8b511] text-xs font-bold tracking-widest uppercase mb-2">Email</label>
                        <input type="email" placeholder="john@example.com" className="w-full bg-transparent border-b border-[#333] text-white py-3 focus:outline-none focus:border-[#d8b511] transition-colors placeholder:text-[#333]" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[#d8b511] text-xs font-bold tracking-widest uppercase mb-2">Subject</label>
                        <input type="text" placeholder="General Enquiry" className="w-full bg-transparent border-b border-[#333] text-white py-3 focus:outline-none focus:border-[#d8b511] transition-colors placeholder:text-[#333]" />
                    </div>
                    <div className="flex flex-col mb-4">
                        <label className="text-[#d8b511] text-xs font-bold tracking-widest uppercase mb-2">Message</label>
                        <textarea placeholder="Hello, I would like to..." rows={4} className="w-full bg-transparent border-b border-[#333] text-white py-3 focus:outline-none focus:border-[#d8b511] transition-colors resize-none placeholder:text-[#333]"></textarea>
                    </div>

                    <button type="submit" className="w-full bg-[#d8b511] text-black font-extrabold tracking-[0.2em] uppercase py-5 rounded-sm hover:bg-white transition-all duration-300 transform hover:scale-[1.01]">
                        Submit
                    </button>
                </form>
            </div>

        </main>
    );
}
