"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createArtwork, updateArtwork } from '@/actions/catalogueActions';
import { getTalents } from '@/actions/talentActions';
import ImageUpload from './ImageUpload';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ArtworkFormProps {
    initialData?: any;
}

export default function ArtworkForm({ initialData }: ArtworkFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [talents, setTalents] = useState<any[]>([]);
    const isEditing = !!initialData;

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        artistName: initialData?.artistName || '',
        talentId: initialData?.talentId || '',
        src: initialData?.src || '',
    });

    useEffect(() => {
        async function loadTalents() {
            const data = await getTalents();
            setTalents(data);
            // Auto-select first talent if not editing
            if (!isEditing && data.length > 0 && !formData.talentId) {
                setFormData(prev => ({
                    ...prev,
                    talentId: data[0]._id,
                    artistName: data[0].name
                }));
            }
        }
        loadTalents();
    }, [isEditing]);

    const handleTalentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTalent = talents.find(t => t._id === e.target.value);
        if (selectedTalent) {
            setFormData({
                ...formData,
                talentId: selectedTalent._id,
                artistName: selectedTalent.name
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.src) {
            alert("Please upload an image for the artwork.");
            return;
        }

        setIsLoading(true);
        try {
            if (isEditing) {
                await updateArtwork(initialData._id, formData);
            } else {
                await createArtwork(formData);
            }
            router.push('/admin/catalogue');
            router.refresh();
        } catch (error) {
            console.error("Operation failed:", error);
            alert("Failed to save artwork.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <Link href="/admin/catalogue" className="text-[10px] text-[#B59431] uppercase tracking-[0.2em] font-bold flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft size={12} />
                        Back to Catalogue
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-[0.1em]">
                        {isEditing ? `Edit: ${initialData.title}` : 'Upload New Piece'}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#B59431] text-black px-10 py-4 rounded-sm font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center gap-3 disabled:opacity-50"
                >
                    <Save size={16} />
                    {isLoading ? 'Processing...' : (isEditing ? 'Update Piece' : 'Save Piece')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Column: Image */}
                <div className="flex flex-col gap-6">
                    <ImageUpload
                        label="Artwork Image"
                        folder="catalogue"
                        value={formData.src}
                        onChange={(url) => setFormData({ ...formData, src: url })}
                    />
                    <p className="text-white/30 text-[10px] italic leading-relaxed">
                        High quality photography is recommended. Images will be optimized automatically by Cloudinary while preserving resolution.
                    </p>
                </div>

                {/* Right Column: Metadata */}
                <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-sm flex flex-col gap-8 h-fit">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59431] border-b border-white/5 pb-4">Piece Details</h3>

                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Title of Piece</label>
                            <input
                                required
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="bg-black border border-white/10 p-4 text-sm text-white outline-none focus:border-[#B59431] transition-colors"
                                placeholder="e.g. Memory fragments"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Assign to Artist</label>
                            {talents.length > 0 ? (
                                <select
                                    value={formData.talentId}
                                    onChange={handleTalentChange}
                                    className="bg-black border border-white/10 p-4 text-sm text-white outline-none focus:border-[#B59431] transition-colors appearance-none"
                                >
                                    {talents.map((t) => (
                                        <option key={t._id} value={t._id}>{t.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 text-yellow-500 text-[10px] uppercase tracking-widest font-bold">
                                    You must create a Talent first before assigning artworks.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
