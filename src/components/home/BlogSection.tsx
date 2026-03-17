"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogSectionProps {
    newsPosts: any[];
}

export default function BlogSection({ newsPosts }: BlogSectionProps) {
    if (!newsPosts || newsPosts.length === 0) return null;

    // Show only the latest 3 posts
    const latestPosts = newsPosts.slice(0, 3);

    return (
        <section className="w-full bg-black py-24 md:py-32">
            <div className=" mx-auto px-6 md:px-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                    <div className="w-full relative pt-4 md:pt-8 mb-8 md:mb-12 z-50">
                        <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-[0.15em] uppercase text-white mb-2 ml-[20%]">
                            BLOG
                        </h2>
                        <div className="w-[75%] md:w-[30%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                    </div>

                    <Link href="/blog" className="group flex items-center gap-3 text-[#d8b511] hover:text-white transition-colors">
                        <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">Enter the Blog</span>
                        <div className="w-8 h-[1px] bg-[#d8b511] group-hover:bg-white transition-all group-hover:w-12"></div>
                    </Link>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
                    {latestPosts.map((post) => (
                        <Link
                            href={`/news/${post._id}`}
                            key={post._id}
                            className="flex flex-col group cursor-pointer w-full"
                        >
                            <span className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mb-4">
                                {post.category || 'NEWS'}
                            </span>

                            <h4 className="text-[#d8b511] font-bold text-md md:text-xl tracking-wide leading-tight mb-3 h-[56px] overflow-hidden uppercase group-hover:brightness-125 transition-all">
                                {post.title}
                            </h4>

                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm mb-6 grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/5 opacity-80 group-hover:opacity-100 shadow-2xl">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>

                            <p className="text-white/70 font-light text-sm md:text-base tracking-wide leading-relaxed line-clamp-3 text-justify">
                                {post.contentBlurb}
                            </p>

                            <div className="mt-8 flex items-center gap-3 w-fit group/btn">
                                <span className="text-[#d8b511] text-[10px] uppercase tracking-[0.2em] font-bold group-hover/btn:text-white transition-colors">Read Full Article</span>
                                <div className="w-8 h-[1px] bg-[#d8b511] transition-all duration-300 group-hover/btn:w-16 group-hover/btn:bg-white"></div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
