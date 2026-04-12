"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Carousel from '@/components/Carousel';

interface BlogSectionProps {
    newsPosts: any[];
}

export default function BlogSection({ newsPosts = [] }: BlogSectionProps) {
    if (!newsPosts || newsPosts.length === 0) return null;

    const blogSlides = newsPosts.slice(0, 5).map((post) => (
        <div key={post._id} className="w-full h-full flex flex-col md:flex-row gap-6 lg:gap-12 items-center bg-[#0d0d0c] rounded-2xl overflow-hidden border border-white/5">
            {/* Image Side */}
            <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden group">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-8 md:py-0 text-left h-full">
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-[#B59431] text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold">
                        {post.category || 'NEWS'}
                    </span>
                </div>

                <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-playfair font-bold mb-6 leading-tight uppercase tracking-widest">
                    {post.title}
                </h3>

                <p className="text-gray-400 text-sm md:text-base tracking-wide leading-relaxed mb-10 max-w-lg line-clamp-3">
                    {post.contentBlurb}
                </p>

                <Link
                    href={`/news/${post._id}`}
                    className="group flex items-center gap-3 w-fit"
                >
                    <span className="text-white text-xs uppercase tracking-[0.2em] font-bold group-hover:text-[#B59431] transition-colors">
                        Read Full Article
                    </span>
                    <div className="w-8 h-[1px] bg-white group-hover:bg-[#B59431] transition-colors" />
                </Link>
            </div>
        </div>
    ));

    return (
        <section id="blog" className="py-24 md:py-32 bg-black overflow-hidden flex flex-col justify-center">
            <div className="flex flex-col h-full w-full mx-auto">
                {/* Section Header */}
                <div className="w-full relative pt-4 md:pt-8 mb-8 md:mb-12 z-50">
                    <h2 className="text-2xl md:text-4xl lg:text-[44px] font-normal tracking-[0.15em] uppercase text-white mb-2 ml-[10%]">
                        BLOG
                    </h2>
                    <div className="w-[75%] md:w-[32%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* News Carousel */}
                <div className="w-full h-[60vh] min-h-[450px] md:h-[70vh] relative">
                    {newsPosts.length > 0 ? (
                        <Carousel
                            items={blogSlides}
                            autoPlay={true}
                            interval={8000}
                            showArrows={true}
                            showDots={true}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 italic uppercase tracking-widest text-xs border border-white/5 rounded-2xl mx-10">
                            No news posts available yet.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
