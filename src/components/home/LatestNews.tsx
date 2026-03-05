"use client";

import Carousel from "@/components/Carousel";
import Link from "next/link";

interface LatestNewsProps {
    newsPosts?: any[];
}

export default function LatestNews({ newsPosts = [] }: LatestNewsProps) {
    if (newsPosts.length === 0) return null;

    const newsSlides = newsPosts.map((item) => (
        <div key={item._id} className="w-full h-full flex flex-col md:flex-row gap-8 items-center bg-[#0a0a0a] p-8 md:p-16 border border-white/5 rounded-2xl overflow-hidden">
            <div className="w-full md:w-1/2 aspect-video md:aspect-square overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <span className="text-[#FDDA2F] text-[10px] uppercase tracking-[0.4em] font-bold mb-4">{item.date}</span>
                <h3 className="text-white text-3xl md:text-5xl font-playfair font-bold mb-8 leading-tight uppercase tracking-tight italic">
                    {item.title}
                </h3>
                <Link href={`/news/${item._id}`} className="group flex items-center gap-3 w-fit">
                    <span className="text-white text-xs uppercase tracking-[0.2em] font-bold group-hover:text-[#FDDA2F] transition-colors">
                        Read Full Article
                    </span>
                    <div className="w-8 h-[1px] bg-white group-hover:bg-[#FDDA2F] transition-colors" />
                </Link>
            </div>
        </div>
    ));

    return (
        <section className="py-24 bg-black">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="mb-16 flex items-center justify-between">
                    <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-[0.15em] uppercase text-white">
                        LATEST NEWS
                    </h2>
                    <div className="hidden md:block h-[2px] flex-1 mx-12 bg-[#FDDA2F]/30" />
                </div>

                <div className="h-[650px] md:h-[550px]">
                    <Carousel
                        items={newsSlides}
                        autoPlay={true}
                        interval={6000}
                        showArrows={true}
                        showDots={true}
                    />
                </div>
            </div>

            <style jsx>{`
                .aspect-video { aspect-ratio: 16 / 9; }
                .md\:aspect-square { aspect-ratio: 1 / 1; }
            `}</style>
        </section>
    );
}

