"use client";

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

// --- API MOCK DATA ---
const mockNewsDatabase: Record<string, any> = {
    'sandra-gela': {
        id: 'sandra-gela',
        title: 'Sandra Gela: A multi-form artist at The Brooklyn Museum',
        date: 'OCTOBER 25, 2023',
        category: 'EXHIBITION',
        heroImage: '/images/service_1.png', // Reusing placeholder
        content: [
            "The Brooklyn Museum opens 'Sandra Gela: A Multi-form Artist' on October 25th. The first expansive survey and celebration of the pioneering multidisciplinary artist, the exhibit explores the depths of African surrealism and contemporary identity politics through mixed media.",
            "Sandra Gela's approach inherently disrupts the traditional gallery spacing standard by pulling pieces physically off the canvas and into the viewer's volumetric space. This retrospective features over forty works spanning two decades, including never-before-seen sketches from her early Paris residency.",
            "\"My work has always been about the intersection of memory and spatial presence,\" Gela noted during the press preview. \"Being able to arrange these pieces in the Brooklyn Museum allows an entirely new dialogue between the works that I hadn't fully anticipated.\"",
            "The exhibition will run through March 15th, 2024, accompanied by a series of talks, workshops, and a community-focused curatorial walkthrough led by the Yaaas Asantewaa Agency."
        ]
    }
};

export default function SingleNewsPage({ params }: { params: Promise<{ slug: string }> }) {
    // Next.js 15 explicitly requires unwrapping params via React's `use`
    const unwrappedParams = use(params);
    const article = mockNewsDatabase[unwrappedParams.slug.toLowerCase()];

    if (!article) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black flex flex-col pt-24 pb-32 font-sans text-white">

            {/* Top Back Navigation */}
            <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12 pt-8 mb-6">
                <Link href="/about" className="inline-flex items-center text-[#d8b511] font-bold tracking-widest text-xs uppercase hover:text-white transition-colors">
                    <ChevronLeft size={16} className="mr-2" />
                    Back
                </Link>
            </div>

            {/* Article Header */}
            <article className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-white/50 text-[10px] md:text-xs font-bold tracking-widest uppercase">{article.category}</span>
                        <div className="w-1 h-1 rounded-full bg-[#d8b511]"></div>
                        <span className="text-[#d8b511] text-[10px] md:text-xs font-bold tracking-widest uppercase">{article.date}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#d8b511] tracking-wide leading-tight max-w-4xl mb-12">
                        {article.title}
                    </h1>

                    {/* Hero Image */}
                    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm border border-white/10 mb-16">
                        <Image
                            src={article.heroImage}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                        />
                    </div>
                </header>

                {/* Article Body Content */}
                <div className="flex flex-col gap-8 text-[#e0e0e0] font-light text-base md:text-lg leading-loose tracking-wide max-w-3xl mx-auto">
                    {article.content.map((paragraph: string, index: number) => (
                        <p key={index} className="first-letter:text-[#d8b511] first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>

        </main>
    );
}
