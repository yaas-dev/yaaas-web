"use client";

import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";

const sonicArtists = [
    {
        name: "Pulse Modular",
        specialty: "Electronic / Avant-Garde",
        bio: "Mastering the intersection of analog synthesis and digital complexity.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        streamingLinks: [
            { platform: "Spotify", url: "#" },
            { platform: "Apple Music", url: "#" },
        ],
    },
    {
        name: "Echo Chamber",
        specialty: "Cinematic Soundscapes",
        bio: "Creating immersive audio environments for film and spatial installations.",
        videoUrl: "https://www.youtube.com/embed/60ItHLz5WEA",
        streamingLinks: [
            { platform: "SoundCloud", url: "#" },
            { platform: "Bandcamp", url: "#" },
        ],
    },
];

const latestReleases = [
    {
        title: "Binary Sunset",
        artist: "Pulse Modular",
        image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800",
        link: "#",
    },
    {
        title: "Dust & Shadows",
        artist: "Echo Chamber",
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
        link: "#",
    },
    {
        title: "Resonance",
        artist: "Vortex",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
        link: "#",
    },
];

export default function SonicArtistsPage() {
    return (
        <div className="pt-32 pb-24 container mx-auto px-4 min-h-screen bg-background">
            <div className="mb-24">
                <div className="section-title mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase">Sonic Artists</h1>
                </div>
                <p className="text-[#999999] text-xs uppercase tracking-[0.3em] font-medium max-w-2xl">
                    Pushing the boundaries of composition, synthesis, and immersive audio identity.
                </p>
            </div>

            {/* Latest Releases Grid */}
            <section className="mb-32">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-2xl uppercase tracking-widest font-bold">Latest Releases</h2>
                    <div className="h-[1px] flex-1 mx-8 bg-white/10 hidden md:block" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestReleases.map((release, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-square overflow-hidden mb-4 rounded-sm">
                                <img
                                    src={release.image}
                                    alt={release.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <Play fill="black" size={24} />
                                    </div>
                                </div>
                            </div>
                            <h4 className="text-lg font-bold uppercase tracking-widest">{release.title}</h4>
                            <p className="text-muted text-xs uppercase tracking-widest mt-1">{release.artist}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Artist Profiles with Embedded Video */}
            <section className="space-y-40">
                {sonicArtists.map((artist, i) => (
                    <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
                        <div className="w-full lg:w-1/2 aspect-video bg-black/20 relative overflow-hidden border border-white/10">
                            <iframe
                                src={artist.videoUrl}
                                className="w-full h-full absolute inset-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <span className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4 block">{artist.specialty}</span>
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 italic font-serif">{artist.name}</h2>
                            <p className="text-lg text-muted mb-8 italic">"{artist.bio}"</p>
                            <div className="flex flex-wrap gap-4">
                                {artist.streamingLinks.map((link, j) => (
                                    <a
                                        key={j}
                                        href={link.url}
                                        className="flex items-center gap-2 border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black hover:border-primary transition-all"
                                    >
                                        {link.platform} <ExternalLink size={14} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            <style jsx>{`
        .pt-32 { padding-top: 8rem; }
        .mb-24 { margin-bottom: 6rem; }
        .mb-32 { margin-bottom: 8rem; }
        .space-y-40 > * + * { margin-top: 10rem; }
        .aspect-video { aspect-ratio: 16 / 9; }
      `}</style>
        </div>
    );
}
