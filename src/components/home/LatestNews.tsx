"use client";

import Carousel from "@/components/Carousel";
import Link from "next/link";

const newsItems = [
    {
        id: 1,
        title: "The Future of Sonic Branding in 2026",
        date: "Feb 15, 2026",
        image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 2,
        title: "YAAAS Visuals Nominated for Design Vanguard",
        date: "Feb 10, 2026",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: 3,
        title: "Artist Spotlight: The Minimalist World of 'Evil Genius'",
        date: "Feb 05, 2026",
        image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800",
    },
];

export default function LatestNews() {
    const newsSlides = newsItems.map((item) => (
        <div key={item.id} className="w-full h-full flex flex-col md:flex-row gap-8 items-center bg-secondary p-8 md:p-16">
            <div className="w-full md:w-1/2 aspect-video md:aspect-square overflow-hidden">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-primary text-xs uppercase tracking-[0.3em] font-bold mb-4">{item.date}</span>
                <h3 className="text-3xl md:text-5xl font-playfair font-bold mb-8 leading-tight">
                    {item.title}
                </h3>
                <Link href={`/news/${item.id}`} className="text-sm uppercase tracking-widest font-bold border border-foreground px-8 py-3 w-fit hover:bg-foreground hover:text-background transition-all">
                    Read Article
                </Link>
            </div>
        </div>
    ));

    return (
        <section className="py-24 bg-background">
            <div className="container">
                <div className="mb-16 flex items-center justify-between">
                    <h2 className="text-4xl md:text-6xl font-playfair font-bold">Latest News</h2>
                    <div className="hidden md:block h-[1px] flex-1 mx-12 bg-border" />
                </div>

                <div className="h-[600px] md:h-[500px]">
                    <Carousel items={newsSlides} autoPlay={true} interval={6000} showArrows={true} showDots={true} />
                </div>
            </div>

            <style jsx>{`
        .bg-secondary { background-color: #0c0c0c; }
        .aspect-video { aspect-ratio: 16 / 9; }
        .md\:aspect-square { aspect-ratio: 1 / 1; }
        .h-\[600px\] { height: 600px; }
        .md\:h-\[500px\] { height: 500px; }
      `}</style>
        </section>
    );
}
