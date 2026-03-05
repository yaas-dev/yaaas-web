import React from 'react';
import { getCollaborations } from '@/actions/collaborationActions';
import { Plus, Edit2, Trash2, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import DeleteButton from '@/components/admin/DeleteButton';
import { deleteCollaboration } from '@/actions/collaborationActions';

export default async function AdminCollaborationsPage() {
    const collaborations = await getCollaborations();

    return (
        <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-[0.1em]">Collaborations</h1>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Manage agency partnerships and exhibitions</p>
                </div>
                <Link
                    href="/admin/collaborations/new"
                    className="bg-[#B59431] text-black px-8 py-4 rounded-sm font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center gap-2"
                >
                    <Plus size={16} />
                    New Collaboration
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collaborations.map((col: any) => (
                    <div key={col._id} className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden group hover:border-[#B59431]/20 transition-all flex flex-col">
                        <div className="relative aspect-video bg-black/40">
                            {col.images && col.images.length > 0 ? (
                                <Image
                                    src={col.images[0]}
                                    alt={col.title}
                                    fill
                                    className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white/10 uppercase tracking-[0.3em] font-bold text-[10px]">
                                    No Image
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-white font-bold tracking-widest uppercase text-sm truncate">{col.title}</h3>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col gap-4 flex-grow">
                            <p className="text-white/60 text-xs leading-relaxed line-clamp-3 font-light">
                                {col.description}
                            </p>
                            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-white/5">
                                <Link
                                    href={`/admin/collaborations/${col._id}/edit`}
                                    className="p-3 bg-white/5 hover:bg-[#B59431] hover:text-black text-[#B59431] rounded-full transition-all flex-1 flex justify-center items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
                                >
                                    <Edit2 size={14} />
                                    Edit
                                </Link>
                                <DeleteButton
                                    id={col._id}
                                    action={deleteCollaboration}
                                    className="p-3 bg-white/5 hover:bg-red-500 text-white/40 hover:text-white rounded-full transition-all"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {collaborations.length === 0 && (
                <div className="p-32 border border-dashed border-white/5 flex flex-col items-center justify-center gap-4 bg-white/[0.02]">
                    <div className="p-6 bg-white/5 rounded-full text-white/10">
                        <LayoutGrid size={40} />
                    </div>
                    <p className="text-white/20 italic tracking-widest uppercase text-xs">No collaborations launched yet.</p>
                </div>
            )}
        </div>
    );
}
