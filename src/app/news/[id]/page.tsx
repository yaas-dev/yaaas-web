import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { getNewsPostById } from '@/actions/newsActions';

export default async function SingleNewsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = await getNewsPostById(id);

    if (!article) {
        notFound();
    }

    // Split fullContent into paragraphs by double newline if possible
    const paragraphs = article.fullContent.split(/\n\s*\n/).filter((p: string) => p.trim() !== "");

    return (
        <main className="min-h-screen bg-black flex flex-col pt-24 pb-32 font-sans text-white">

            {/* Top Back Navigation */}
            <div className="w-full max-w-[1000px] mx-auto px-6 md:px-12 pt-8 mb-6">
                <Link href="/news" className="inline-flex items-center text-[#FDDA2F] font-bold tracking-widest text-xs uppercase hover:text-white transition-colors">
                    <ChevronLeft size={16} className="mr-2" />
                    Back to News
                </Link>
            </div>

            {/* Article Header */}
            <article className="w-full max-w-[1000px] mx-auto px-6 md:px-12">
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-white/50 text-[10px] md:text-xs font-bold tracking-widest uppercase">{article.category || 'NEWS'}</span>
                        <div className="w-1 h-1 rounded-full bg-[#FDDA2F]"></div>
                        <span className="text-[#FDDA2F] text-[10px] md:text-xs font-bold tracking-widest uppercase">{article.date}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FDDA2F] tracking-wide leading-tight max-w-4xl mb-12 uppercase">
                        {article.title}
                    </h1>

                    {/* Hero Image */}
                    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-sm border border-white/10 mb-16 shadow-2xl">
                        <Image
                            src={article.image}
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
                    {paragraphs.map((paragraph: string, index: number) => (
                        <p key={index} className={index === 0 ? "first-letter:text-[#FDDA2F] first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left" : ""}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </article>

        </main>
    );
}

