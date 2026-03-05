"use client";

import React, { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '@/actions/projectActions';
import { Plus, Edit2, Trash2, Briefcase, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsAdminPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadProjects();
    }, []);

    async function loadProjects() {
        setIsLoading(true);
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (error) {
            console.error("Failed to load projects:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (confirm("Are you sure you want to delete this project?")) {
            await deleteProject(id);
            loadProjects();
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-[0.1em]">Portfolio Projects</h1>
                    <p className="text-white/40 text-sm tracking-wide">Showcase major agency commissions and case studies.</p>
                </div>
                <Link
                    href="/admin/projects/new"
                    className="bg-[#B59431] text-black px-6 py-3 rounded-sm font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center gap-3"
                >
                    <Plus size={16} />
                    New Project
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {isLoading ? (
                    <div className="col-span-full p-24 text-center text-white/20 text-xs italic tracking-widest uppercase">
                        Loading portfolio...
                    </div>
                ) : projects.length === 0 ? (
                    <div className="col-span-full p-24 text-center text-white/20 text-xs italic tracking-widest uppercase">
                        No projects added yet.
                    </div>
                ) : (
                    projects.map((item) => (
                        <div key={item._id} className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden flex flex-col md:flex-row group hover:border-[#B59431]/40 transition-all shadow-2xl h-fit md:h-56">
                            <div className="relative w-full md:w-80 h-48 md:h-full bg-black flex-shrink-0">
                                <Image
                                    src={item.mainImage}
                                    alt={item.title}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                            </div>
                            <div className="p-8 flex flex-col justify-between flex-grow gap-6 bg-gradient-to-r from-black/20 to-transparent">
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] text-[#B59431] font-bold uppercase tracking-[0.4em]">{item.category}</span>
                                    <h3 className="text-xl font-bold tracking-widest text-white uppercase line-clamp-1">{item.title}</h3>
                                    <p className="text-xs text-white/30 line-clamp-2 leading-relaxed">{item.description}</p>
                                </div>

                                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                    <div className="flex items-center gap-2 text-[8px] text-white/20 uppercase tracking-widest">
                                        <LayoutGrid size={12} />
                                        {item.galleryImages?.length || 0} Gallery Images
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Link
                                            href={`/admin/projects/${item._id}/edit`}
                                            className="text-[10px] text-white/30 hover:text-[#B59431] uppercase tracking-[0.2em] font-bold transition-colors"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-[10px] text-white/20 hover:text-red-500 uppercase tracking-[0.2em] font-bold transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
