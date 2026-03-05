"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCollaboration, updateCollaboration } from '@/actions/collaborationActions';
import ImageUpload from './ImageUpload';
import { Save, ArrowLeft, Plus, X, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

interface CollaborationFormProps {
    initialData?: any;
}

export default function CollaborationForm({ initialData }: CollaborationFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = !!initialData;

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        images: initialData?.images || [],
    });

    const handleAddImage = (url: string) => {
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, url]
        }));
    };

    const handleRemoveImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_: any, i: number) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            if (isEditing) {
                await updateCollaboration(initialData._id, formData);
            } else {
                await createCollaboration(formData);
            }
            router.push('/admin/collaborations');
            router.refresh();
        } catch (error) {
            console.error("Operation failed:", error);
            alert("Failed to save collaboration.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <Link href="/admin/collaborations" className="text-[10px] text-[#B59431] uppercase tracking-[0.2em] font-bold flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft size={12} />
                        Back to Collaborations
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-[0.1em]">
                        {isEditing ? `Edit Collaboration: ${initialData.title}` : 'Launch New Collaboration'}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#B59431] text-black px-10 py-4 rounded-sm font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center gap-3 disabled:opacity-50"
                >
                    <Save size={16} />
                    {isLoading ? 'Saving...' : (isEditing ? 'Update Collaboration' : 'Publish Collaboration')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left: Images */}
                <div className="lg:col-span-1 flex flex-col gap-10">
                    <div className="flex flex-col gap-6">
                        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59431] border-b border-white/5 pb-4 flex items-center gap-3">
                            <LayoutGrid size={14} />
                            Collaboration Gallery (Masonry)
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            {formData.images.map((img: string, idx: number) => (
                                <div key={idx} className="relative aspect-square border border-white/10 rounded-sm overflow-hidden group bg-black">
                                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(idx)}
                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-white/5 border border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center">
                            <ImageUpload
                                folder="collaborations"
                                value=""
                                onChange={handleAddImage}
                            />
                        </div>
                    </div>
                </div>

                {/* Right: Details */}
                <div className="lg:col-span-2 flex flex-col gap-10">
                    <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-sm flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Collaboration Title</label>
                            <input
                                required
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="bg-black border border-white/10 p-4 text-sm text-white outline-none focus:border-[#B59431] transition-colors"
                                placeholder="e.g. 1954 OBMUN Art Experience"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Full Collaboration Description</label>
                            <textarea
                                required
                                rows={10}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="bg-black border border-white/10 p-4 text-sm text-white/80 outline-none focus:border-[#B59431] transition-colors leading-relaxed"
                                placeholder="Describe the collaboration, partners, and impact..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
