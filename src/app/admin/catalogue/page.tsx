"use client";

import React, { useEffect, useState } from 'react';
import { getArtworks, deleteArtwork } from '@/actions/catalogueActions';
import { Plus, Edit2, Trash2, ImageIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CatalogueAdminPage() {
    const [artworks, setArtworks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadArtworks();
    }, []);

    async function loadArtworks() {
        setIsLoading(true);
        try {
            const data = await getArtworks();
            setArtworks(data);
        } catch (error) {
            console.error("Failed to load artworks:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (confirm("Are you sure you want to delete this piece?")) {
            await deleteArtwork(id);
            loadArtworks();
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white uppercase tracking-[0.1em]">Art Catalogue</h1>
                    <p className="text-white/40 text-sm tracking-wide">Manage individual pieces of art across the site.</p>
                </div>
                <Link
                    href="/admin/catalogue/new"
                    className="w-full sm:w-auto bg-[#B59431] text-black px-6 py-3 rounded-sm font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center justify-center gap-3"
                >
                    <Plus size={16} />
                    Upload New Piece
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading ? (
                    <div className="col-span-full p-12 text-center text-white/20 text-xs italic tracking-widest uppercase">
                        Loading collection...
                    </div>
                ) : artworks.length === 0 ? (
                    <div className="col-span-full p-12 text-center text-white/20 text-xs italic tracking-widest uppercase">
                        No artworks found in the database.
                    </div>
                ) : (
                    artworks.map((art) => (
                        <div key={art._id} className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden flex flex-col group hover:border-[#B59431]/40 transition-all shadow-xl">
                            <div className="relative aspect-[4/5] bg-black">
                                <Image
                                    src={art.src}
                                    alt={art.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <Link
                                        href={`/admin/catalogue/${art._id}/edit`}
                                        className="p-3 bg-white text-black rounded-full hover:bg-[#B59431] transition-colors"
                                    >
                                        <Edit2 size={18} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(art._id)}
                                        className="p-3 bg-white text-black rounded-full hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col gap-1">
                                <span className="text-[10px] text-[#B59431] font-bold uppercase tracking-[0.2em]">{art.artistName}</span>
                                <span className="text-sm font-bold tracking-widest text-white uppercase truncate">{art.title}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
