"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const newsPosts = [
    {
        id: 1,
        title: "The Future of Sonic Branding in 2026",
        excerpt: "As technology evolves, the way we experience sound is fundamentally changing. We explore the trends that will define the next decade of audio identity.",
        date: "Feb 15, 2026",
        category: "Insights",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200",
    },
    {
        id: 2,
        title: "YAAAS Visuals Nominated for Design Vanguard",
        excerpt: "We are honored to be recognized by the International Design Council for our work on the 'Liquid Gold' campaign.",
        date: "Feb 10, 2026",
        category: "News",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
    },
    {
        id: 3,
        title: "Artist Spotlight: The Minimalist World of 'Evil Genius'",
        excerpt: "An exclusive interview with the collective behind some of the most challenging art of the year.",
        date: "Feb 05, 2026",
        category: "Spotlight",
        image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=1200",
    },
];

export default function NewsPage() {
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
                <Link href={`/news/${featured.id}`} className="group relative block aspect-[21/9] overflow-hidden bg-black/40 border border-white/5">
                    <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    <div className="absolute bottom-12 left-12 right-12 max-w-4xl">
                        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">{featured.category} / {featured.date}</span>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 italic font-serif leading-tight group-hover:text-primary transition-colors uppercase tracking-tight">
                            {featured.title}
                        </h2>
                        <p className="text-sm md:text-lg text-[#999999] max-w-2xl line-clamp-2 md:line-clamp-none">
                            {featured.excerpt}
                        </p>
                    </div>
                </Link>
            </section>

            {/* Other Posts Feed */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {others.map((post) => (
                    <Link key={post.id} href={`/news/${post.id}`} className="group">
                        <div className="aspect-[16/10] overflow-hidden mb-8 bg-black/40 border border-white/5">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                            />
                        </div>
                        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-3 block">{post.category} — {post.date}</span>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors leading-snug uppercase tracking-tight italic font-serif">
                            {post.title}
                        </h3>
                        <p className="text-[#999999] text-sm leading-relaxed line-clamp-3">
                            {post.excerpt}
                        </p>
                        <div className="mt-8">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold border-b border-primary/20 pb-1 group-hover:border-primary transition-all">Read Full Article</span>
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
