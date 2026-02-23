"use client";

import { useModal } from "@/components/Modal";
import { motion } from "framer-motion";

interface ProjectDetailProps {
    project: {
        title: string;
        category: string;
        image: string;
        description: string;
        client: string;
        year: string;
    };
}

function ProjectDetail({ project }: ProjectDetailProps) {
    return (
        <div className="flex flex-col gap-8">
            <div className="aspect-video w-full overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <div className="grid md:grid-cols-3 gap-12 text-white">
                <div className="md:col-span-2">
                    <h2 className="text-4xl font-bold mb-4 italic font-serif uppercase tracking-tight">{project.title}</h2>
                    <p className="text-lg text-[#999999] leading-relaxed">
                        {project.description}
                    </p>
                </div>
                <div className="flex flex-col gap-6 pt-4 border-t border-white/10 md:border-none">
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">Client</span>
                        <span className="text-sm uppercase tracking-widest font-bold">{project.client}</span>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">Category</span>
                        <span className="text-sm uppercase tracking-widest font-bold">{project.category}</span>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">Year</span>
                        <span className="text-sm uppercase tracking-widest font-bold">{project.year}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const projects = [
    {
        id: 1,
        title: "Aura Collective",
        category: "Creative Direction",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200",
        description: "A comprehensive visual overhaul for a global fashion house, focusing on the intersection of minimalism and organic structure.",
        client: "Aura Global",
        year: "2025",
    },
    {
        id: 2,
        title: "Sonic Void",
        category: "Sound Design",
        image: "https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=1200",
        description: "An immersive audio-visual installation exploring the concept of digital silence and the decay of analog signals.",
        client: "Institute of Modern Sound",
        year: "2024",
    },
    {
        id: 3,
        title: "Vanguard Identity",
        category: "Brand Systems",
        image: "https://images.unsplash.com/photo-1561214078-f3247647fc5e?auto=format&fit=crop&q=80&w=1200",
        description: "Redefining the visual language for a new generation of creative professionals.",
        client: "Vanguard Co.",
        year: "2024",
    },
    {
        id: 4,
        title: "Ether Experience",
        category: "Digital Art",
        image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1200",
        description: "A series of NFTs and digital sculptures commissioned for the first virtual art biennial.",
        client: "Meta-Gallery",
        year: "2025",
    },
];

export default function ProjectsPage() {
    const { openModal } = useModal();

    return (
        <div className="pt-32 pb-24 container mx-auto px-4 min-h-screen bg-background">
            <div className="mb-24">
                <div className="section-title mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase">Case Studies</h1>
                </div>
                <p className="text-[#999999] text-xs uppercase tracking-[0.3em] font-medium max-w-2xl">
                    Our portfolio is a reflection of our commitment to excellence.
                    Each project is a deep dive into the essence of a brand.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="group cursor-pointer bg-black/40 border border-white/5"
                        onClick={() => openModal(<ProjectDetail project={project} />)}
                    >
                        <div className="relative aspect-[16/9] overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="btn-pill">
                                    View Project
                                </span>
                            </div>
                        </div>
                        <div className="p-8 flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold uppercase tracking-wider mb-2 group-hover:text-primary transition-colors italic font-serif">
                                    {project.title}
                                </h3>
                                <p className="text-primary text-[10px] uppercase tracking-widest font-bold">{project.category}</p>
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-[#666666] font-bold">{project.year}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <style jsx>{`
        .pt-32 { padding-top: 8rem; }
        .mb-24 { margin-bottom: 6rem; }
        .container { max-width: 1400px; margin: 0 auto; }
        .aspect-video { aspect-ratio: 16 / 9; }
        .aspect-\[16\/9\] { aspect-ratio: 16 / 9; }
      `}</style>
        </div>
    );
}
