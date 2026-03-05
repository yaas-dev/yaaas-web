"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface NewsClientProps {
    newsPosts: any[];
}

export default function NewsClient({ newsPosts }: NewsClientProps) {
    if (!newsPosts || newsPosts.length === 0) {
        return (
            <div className="pt-32 pb-24 container mx-auto px-4 min-h-screen bg-background text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase mb-8">Latest News</h1>
                <p className="text-white/20 italic uppercase tracking-widest">No news articles published yet.</p>
            </div>
        );
    }

    const featured = newsPosts[0];
    const others = newsPosts.slice(1);

    return (
        <div className="pt-32 pb-24 container mx-auto px-4 min-h-screen bg-background text-white">
            <div className="mb-24">
                <div className="section-title mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase">Latest News</h1>
                </div>
                <p className="text-[#999999] text-xs uppercase tracking-[0.3em] font-medium max-w-2xl">
                    Deep dives into the creative process, agency updates, and visionary insights.
                </p>
            </div>

            {/* Featured Post */}
            <section className="mb-32">
                <Link href={`/news/${featured._id}`} className="group relative block aspect-[21/9] overflow-hidden bg-black/40 border border-white/5">
                    <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12 max-w-4xl">
                        <span className="text-[#FDDA2F] text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">{featured.category} / {new Date(featured.date).toLocaleDateString()}</span>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 italic font-serif leading-tight group-hover:text-[#FDDA2F] transition-colors uppercase tracking-tight">
                            {featured.title}
                        </h2>
                        <p className="text-sm md:text-lg text-[#999999] max-w-2xl line-clamp-2 md:line-clamp-none">
                            {featured.blurb}
                        </p>
                    </div>
                </Link>
            </section>

            {/* Other Posts Feed */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {others.map((post) => (
                    <Link key={post._id} href={`/news/${post._id}`} className="group">
                        <div className="aspect-[16/10] overflow-hidden mb-8 bg-black/40 border border-white/5">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                            />
                        </div>
                        <span className="text-[#FDDA2F] text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block">{post.category} — {new Date(post.date).toLocaleDateString()}</span>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-[#FDDA2F] transition-colors leading-snug uppercase tracking-tight italic font-serif">
                            {post.title}
                        </h3>
                        <p className="text-[#999999] text-sm leading-relaxed line-clamp-3">
                            {post.blurb}
                        </p>
                        <div className="mt-8">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-[#FDDA2F]/20 pb-1 group-hover:border-[#FDDA2F] transition-all">Read Full Article</span>
                        </div>
                    </Link>
                ))}
            </section>

            <style jsx>{`
                .pt-32 { padding-top: 8rem; }
                .mb-24 { margin-bottom: 6rem; }
                .mb-32 { margin-bottom: 8rem; }
                .container { max-width: 1400px; margin: 0 auto; }
                .aspect-\[21\/9\] { aspect-ratio: 21 / 9; }
                .aspect-\[16\/10\] { aspect-ratio: 16 / 10; }
                .bg-gradient-to-t {
                    background: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 60%, transparent 100%);
                }
            `}</style>
        </div>
    );
}
