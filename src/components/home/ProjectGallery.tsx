"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const projects = [
    { id: 1, image: "/images/project.png" },
    { id: 2, image: "/images/project.png" }
];

export default function ProjectGallery() {
    return (
        <section id="projects" className="py-24 bg-black">
            <div className="">

                {/* Section Header */}
                <div className="w-full relative pt-12 md:pt-24 mb-16 md:mb-24 z-50">
                    <h2 className="text-3xl md:text-5xl lg:text-[54px] font-bold tracking-[0.15em] uppercase text-white mb-4 md:mb-6 ml-[10%]">
                        THE YAAAS PROJECTS
                    </h2>
                    <div className="w-[75%] md:w-[30%] h-[4px] md:h-[6px] bg-[#B59431]"></div>
                </div>

                {/* Projects Grid Container */}
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 lg:gap-12 w-[90%] mx-auto px-6 md:px-0 mb-16">
                    {/* We chunk the projects array into pairs of 2 so they stack vertically within each grid column */}
                    {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, colIndex) => {
                        const projectPair = projects.slice(colIndex * 2, colIndex * 2 + 2);

                        return (
                            <div key={colIndex} className="flex flex-col gap-6 lg:gap-12">
                                {projectPair.map((project, index) => (
                                    <div
                                        key={project.id}
                                        className="group relative w-full h-[350px] md:h-[500px] lg:h-[700px] overflow-hidden rounded-xl block shadow-xl border border-white/5"
                                    >
                                        <Image
                                            src={project.image}
                                            alt={`Project ${project.id}`}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-500" />

                                        {/* Box Shadow border effect */}
                                        <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-[#B59431]/60 transition-colors duration-500 rounded-xl" />
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
                <div className="flex items-center justify-center">
                    <Link href="/projects" className="text-black bg-white px-4 py-3 rounded-sm text-md font-bold tracking-wide uppercase">
                        View Full Gallery
                    </Link>
                </div>
            </div>
        </section>
    );
}
