"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { use } from "react";

// In a real app, this would be fetched from a database or CMS based on the ID.
// For now, we use mock data to match the homepage carousel.
const projectsData = [
    {
        id: "1",
        title: "Neon Echoes Exhibition",
        category: "Exhibition Curation",
        date: "March 2026",
        description: "An immersive exploration of light, sound, and space. Neon Echoes brought together 15 international artists to reimagine the boundaries of digital and physical art. The exhibition spanned 10,000 square feet and utilized proprietary projection mapping, generative audio landscapes, and reactive LED sculptures.",
        details: [
            "Curated 15 international artists",
            "10,000 sq ft immersive layout",
            "Over 45,000 attendees in 4 weeks",
            "Featured in ArtForum & Wired"
        ],
        image: "/images/project.png",
        gallery: [
            "/images/project.png",
            "/images/project.png",
            "/images/project.png"
        ]
    },
    {
        id: "2",
        title: "Sonic Landscapes Framework",
        category: "Sound Design",
        date: "January 2026",
        description: "A comprehensive auditory identity developed for the new global headquarters of a leading technology firm, blending organic field recordings with synthetic textures. Our team spent six months recording ambient sounds across 12 countries to create a sonic library that dynamically adjusts to the time of day and office density.",
        details: [
            "6 months of global field recording",
            "Dynamic, time-responsive audio states",
            "Integrated across 40 floors",
            "Winner of the 2026 Sonic Architecture Award"
        ],
        image: "/images/project.png",
        gallery: [
            "/images/project.png",
            "/images/project.png",
            "/images/project.png"
        ]
    }
];

export default function SingleProjectPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap the generic params promise in NextJS 15+
    const unwrappedParams = use(params);
    const projectId = unwrappedParams.id;
    const project = projectsData.find(p => p.id === projectId) || projectsData[0];

    return (
        <main className="min-h-screen bg-[#080807] text-white selection:bg-[#B59431] selection:text-black pb-24">
            {/* Header Navigation Space (Accounts for fixed Navbar) */}
            <div className="h-24 md:h-32 w-full bg-black/50 backdrop-blur-md sticky top-0 z-40 border-b border-white/5 flex items-center px-6 md:px-12">
                <Link
                    href="/#projects"
                    className="group flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase">Back to Projects</span>
                </Link>
            </div>

            {/* Hero Image Section */}
            <section className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080807] via-black/40 to-black/10" />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-[#B59431] text-black px-3 py-1 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
                            {project.category}
                        </span>
                        <span className="text-gray-300 text-xs md:text-sm uppercase tracking-widest font-medium">
                            {project.date}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white leading-tight">
                        {project.title}
                    </h1>
                </div>
            </section>

            {/* Project Details Section */}
            <section className="max-w-7xl mx-auto px-6 md:px-16 pt-16 md:pt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                {/* Main Description */}
                <div className="lg:col-span-8">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-wide mb-8 text-white/90">
                        Project Overview
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg tracking-wide leading-relaxed mb-12 font-light">
                        {project.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {project.gallery.slice(0, 2).map((img, idx) => (
                            <div key={idx} className="relative aspect-[4/5] w-full rounded-xl overflow-hidden shadow-2xl border border-white/5">
                                <Image
                                    src={img}
                                    alt={`${project.title} gallery image ${idx + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="lg:col-span-4">
                    <div className="bg-[#111] p-8 md:p-10 rounded-2xl border border-white/5 sticky top-40">
                        <h3 className="text-[#B59431] text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-6">
                            Key Details
                        </h3>
                        <ul className="flex flex-col gap-6">
                            {project.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#B59431] mt-2 shrink-0" />
                                    <span className="text-gray-300 text-sm md:text-base tracking-wide flex-1">
                                        {detail}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-12 pt-8 border-t border-white/10">
                            <h3 className="text-[#B59431] text-xs uppercase tracking-[0.2em] font-bold mb-4">
                                Share Project
                            </h3>
                            <div className="flex gap-4">
                                {["TW", "IG", "LI"].map((social) => (
                                    <button key={social} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white text-xs hover:bg-white hover:text-black transition-colors font-bold">
                                        {social}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
