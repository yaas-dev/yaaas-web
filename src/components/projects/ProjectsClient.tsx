import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectsClientProps {
    projects: any[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
    return (
        <div className="pt-32 pb-24 container mx-auto px-4 min-h-screen bg-background">
            <div className="mb-24">
                <div className="section-title mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] uppercase text-white">Case Studies</h1>
                </div>
                <p className="text-[#999999] text-xs uppercase tracking-[0.3em] font-medium max-w-2xl">
                    Our portfolio is a reflection of our commitment to excellence.
                    Each project is a deep dive into the essence of a brand.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {projects.map((project, index) => (
                    <Link
                        href={`/projects/${project._id}`}
                        key={project._id}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="group cursor-pointer bg-black/40 border border-white/5 overflow-hidden"
                        >
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <img
                                    src={project.mainImage}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="px-6 py-3 border border-white text-white uppercase tracking-widest text-xs font-bold bg-white/10 backdrop-blur-sm">
                                        View Case Study
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold uppercase tracking-wider mb-2 group-hover:text-[#FDDA2F] transition-colors italic font-serif text-white">
                                        {project.title}
                                    </h3>
                                    <p className="text-[#FDDA2F] text-[10px] uppercase tracking-widest font-bold">{project.category}</p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="py-40 text-center text-white/20 italic uppercase tracking-widest text-sm">
                    No case studies featured yet.
                </div>
            )}

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
