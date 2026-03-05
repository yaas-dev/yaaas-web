"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";

const projects = [
    {
        id: 1,
        title: "Neon Echoes Exhibition",
        category: "Exhibition Curation",
        date: "March 2026",
        description: "An immersive exploration of light, sound, and space. Neon Echoes brought together 15 international artists to reimagine the boundaries of digital and physical art.",
        image: "/images/project.png"
    },
    {
        id: 2,
        title: "Sonic Landscapes Framework",
        category: "Sound Design",
        date: "January 2026",
        description: "A comprehensive auditory identity developed for the new global headquarters of a leading technology firm, blending organic field recordings with synthetic textures.",
        image: "/images/project.png"
    }
];

export default function ProjectGallery() {
    const projectSlides = projects.map((project) => (
        <div key={project.id} className="w-full h-full flex flex-col md:flex-row gap-6 lg:gap-12 items-center bg-[#0d0d0c] rounded-2xl overflow-hidden border border-white/5">
            {/* Image Side */}
            <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden group">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-8 md:py-0 text-left h-full">
                <div className="flex items-center gap-4 mb-4">
                    <span className="text-[#B59431] text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold">{project.category}</span>
                    <span className="text-gray-500 text-[10px] uppercase tracking-widest">{project.date}</span>
                </div>

                <h3 className="text-white text-2xl md:text-4xl lg:text-5xl font-playfair font-bold mb-6 leading-tight">
                    {project.title}
                </h3>

                <p className="text-gray-400 text-sm md:text-base tracking-wide leading-relaxed mb-10 max-w-lg">
                    {project.description}
                </p>

                <Link
                    href={`/projects/${project.id}`}
                    className="group flex items-center gap-3 w-fit"
                >
                    <span className="text-white text-xs uppercase tracking-[0.2em] font-bold group-hover:text-[#B59431] transition-colors">
                        View Project
                    </span>
                    <div className="w-8 h-[1px] bg-white group-hover:bg-[#B59431] transition-colors" />
                </Link>
            </div>
        </div>
    ));

    return (
        <section id="projects" className="py-8 md:py-10 bg-black max-h-[100vh] overflow-hidden flex flex-col">
            <div className="flex flex-col h-full w-[100%] mx-auto">

                {/* Section Header */}
                <div className="w-full relative pt-4 md:pt-8 mb-8 md:mb-12 z-50">
                    <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-[0.15em] uppercase text-white mb-2 ml-[10%]">
                        THE YAAAS PROJECTS
                    </h2>
                    <div className="w-[75%] md:w-[30%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* Projects Carousel */}
                <div className="w-full h-[60vh] min-h-[450px] md:h-[70vh] mb-8 relative">
                    <Carousel
                        items={projectSlides}
                        autoPlay={true}
                        interval={6000}
                        showArrows={true}
                        showDots={true}
                    />
                </div>
            </div>
        </section>
    );
}
