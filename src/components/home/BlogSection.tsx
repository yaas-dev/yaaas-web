"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Carousel from '@/components/Carousel';

interface BlogSectionProps {
    newsPosts: any[];
    settings?: any;
}

export default function BlogSection({ newsPosts = [], settings }: BlogSectionProps) {
    if (!newsPosts || newsPosts.length === 0) return null;
    const copy = settings?.homepageContent || {};
    const blogSlides = newsPosts.slice(0, 5).map((post) => (
        <Link href={`/news/${post._id}`} key={post._id} className="w-full h-full flex flex-col md:flex-row gap-6 lg:gap-12 items-center bg-white rounded-2xl overflow-hidden border border-black/10 shadow-sm">
            <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden group">
                <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-8 md:py-0 text-left h-full">
                <div className="flex items-center gap-4 mb-4"><span className="text-[#B59431] text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold">{post.category || 'NEWS'}</span></div>
                <h3 className="text-[#171717] text-2xl md:text-3xl lg:text-4xl font-playfair font-bold mb-6 leading-tight uppercase tracking-widest">{post.title}</h3>
                <p className="text-[#66635D] text-sm md:text-base tracking-wide leading-relaxed mb-10 max-w-lg line-clamp-3">{post.contentBlurb}</p>
            </div>
        </Link>
    ));

    return (
        <section id="blog" className="py-14 md:py-20 bg-[#F7F6F1] overflow-hidden">
            <div className="mx-auto max-w-7xl w-full px-5 md:px-8">
                <div className="w-full relative mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal tracking-[0.1em] uppercase text-[#171717] mb-2">{copy.journalTitle || 'BLOG'}</h2>
                    <div className="w-20 h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>
                <div className="w-full h-[420px] md:h-[480px] relative">
                    <Carousel items={blogSlides} autoPlay={true} interval={8000} showArrows={true} showDots={true} />
                </div>
                <Link href={copy.journalCtaLink || "/blog"} className="group flex items-center justify-end gap-3 mt-5">
                    <span className="text-[#171717] text-xs uppercase tracking-[0.2em] font-bold group-hover:text-[#B59431] transition-colors">{copy.journalCta || 'View All Blogs'}</span>
                    <span className="group-hover:translate-x-1 transition-transform text-[#171717] text-xs uppercase tracking-[0.2em] font-bold">→</span>
                </Link>
            </div>
        </section>
    );
}
