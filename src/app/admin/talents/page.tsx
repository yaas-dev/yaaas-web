"use client";

import React, { useEffect, useState } from 'react';
import { getTalents, deleteTalent } from '@/actions/talentActions';
import { Plus, Edit2, Trash2, User, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function TalentsAdminPage() {
    const [talents, setTalents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadTalents();
    }, []);

    async function loadTalents() {
        setIsLoading(true);
        try {
            const data = await getTalents();
            setTalents(data);
        } catch (error) {
            console.error("Failed to load talents:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (confirm("Are you sure you want to delete this talent? This will not remove their catalogue items, but they will be unlinked.")) {
            await deleteTalent(id);
            loadTalents();
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase tracking-[0.1em]">Talents</h1>
                    <p className="text-white/40 text-sm tracking-wide">Manage the roster of artists and their profiles.</p>
                </div>
                <Link
                    href="/admin/talents/new"
                    className="w-full sm:w-auto bg-[#B59431] text-black px-6 py-3 rounded-sm font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center justify-center gap-3"
                >
                    <Plus size={16} />
                    Add New Talent
                </Link>
            </div>

            <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/5">
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59431]">Talent</th>
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59431]">Category</th>
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59431] hidden md:table-cell">Slug</th>
                                <th className="p-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59431] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-white/20 text-xs italic tracking-widest">
                                        Loading talents...
                                    </td>
                                </tr>
                            ) : talents.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-white/20 text-xs italic tracking-widest">
                                        No talents found. Click &apos;Add New Talent&apos; to get started.
                                    </td>
                                </tr>
                            ) : (
                                talents.map((talent) => (
                                    <tr key={talent._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-black">
                                                    {talent.headshot ? (
                                                        <Image
                                                            src={talent.headshot}
                                                            alt={talent.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-white/20">
                                                            <User size={16} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold tracking-wider text-white group-hover:text-[#B59431] transition-colors">
                                                        {talent.name}
                                                    </span>
                                                    <span className="text-[10px] text-white/40 uppercase tracking-widest">{talent.type}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`text-[10px] px-2 py-1 rounded-full border tracking-widest uppercase font-bold ${talent.category === 'VISUAL'
                                                ? 'border-blue-500/30 text-blue-400 bg-blue-500/5'
                                                : 'border-purple-500/30 text-purple-400 bg-purple-500/5'
                                                }`}>
                                                {talent.category}
                                            </span>
                                        </td>
                                        <td className="p-6 text-xs text-white/40 font-mono italic hidden md:table-cell">/{talent.slug}</td>
                                        <td className="p-6">
                                            <div className="flex items-center justify-end gap-1 md:gap-3">
                                                <Link
                                                    href={`/talents/${talent.slug}`}
                                                    target="_blank"
                                                    className="p-2 text-white/20 hover:text-white transition-colors"
                                                    title="View Live"
                                                >
                                                    <ExternalLink size={16} />
                                                </Link>
                                                <Link
                                                    href={`/admin/talents/${talent._id}/edit`}
                                                    className="p-2 text-white/20 hover:text-green-400 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(talent._id)}
                                                    className="p-2 text-white/20 hover:text-red-500 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-white/5">
                    {isLoading ? (
                        <div className="p-12 text-center text-white/20 text-xs italic tracking-widest">
                            Loading talents...
                        </div>
                    ) : talents.length === 0 ? (
                        <div className="p-12 text-center text-white/20 text-xs italic tracking-widest">
                            No talents found.
                        </div>
                    ) : (
                        talents.map((talent) => (
                            <div key={talent._id} className="p-6 flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-black">
                                        {talent.headshot ? (
                                            <Image
                                                src={talent.headshot}
                                                alt={talent.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                                <User size={20} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-grow min-w-0">
                                        <span className="text-sm font-bold tracking-wider text-white truncate">
                                            {talent.name}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] text-white/40 uppercase tracking-widest truncate">{talent.type}</span>
                                            <span className="text-white/20">|</span>
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full border tracking-tighter uppercase font-bold ${talent.category === 'VISUAL'
                                                ? 'border-blue-500/30 text-blue-400 bg-blue-500/5'
                                                : 'border-purple-500/30 text-purple-400 bg-purple-500/5'
                                                }`}>
                                                {talent.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <Link
                                        href={`/talents/${talent.slug}`}
                                        target="_blank"
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 text-white/40 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:text-white transition-colors"
                                    >
                                        <ExternalLink size={14} />
                                        View
                                    </Link>
                                    <Link
                                        href={`/admin/talents/${talent._id}/edit`}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 text-green-400/60 text-[10px] font-bold uppercase tracking-widest rounded-sm hover:text-green-400 transition-colors"
                                    >
                                        <Edit2 size={14} />
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(talent._id)}
                                        className="p-2.5 bg-red-500/10 text-red-500/40 rounded-sm hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
