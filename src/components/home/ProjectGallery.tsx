"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
    { id: 1, image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400" },
    { id: 2, image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=400" },
    { id: 3, image: "https://images.unsplash.com/photo-1561214078-f3247647fc5e?auto=format&fit=crop&q=80&w=400" },
    { id: 4, image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=400" },
    { id: 5, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400" },
    { id: 6, image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400" },
    { id: 7, image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=400" },
    { id: 8, image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=400" },
    { id: 9, image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400" },
    { id: 10, image: "https://images.unsplash.com/photo-1514349159574-1b09d9d9aba2?auto=format&fit=crop&q=80&w=400" },
];

export default function ProjectGallery() {
    return (
        <section id="projects" className="py-24 bg-background">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="relative inline-block mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase">THE YAAAS PROJECTS</h2>
                    <span className="absolute -bottom-4 left-0 w-[100px] h-1 bg-primary block" />
                </div>

                <p className="text-xs italic text-muted tracking-widest mb-16 uppercase mt-8">
                    Check out our diverse portfolio of projects for our world-class brands.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 mb-24">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="aspect-square relative overflow-hidden group"
                        >
                            <img
                                src={project.image}
                                alt={`Project ${project.id}`}
                                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link
                        href="/projects"
                        className="border border-white rounded-full px-8 py-2 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                        VIEW ALL PROJECTS
                    </Link>
                </div>
            </div>
        </section>
    );
}
