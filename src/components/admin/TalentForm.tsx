"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTalent, updateTalent } from '@/actions/talentActions';
import ImageUpload from './ImageUpload';
import { Save, ArrowLeft, Trash2, Plus, X } from 'lucide-react';
import Link from 'next/link';

interface TalentFormProps {
    initialData?: any;
}

export default function TalentForm({ initialData }: TalentFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = !!initialData;

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        slug: initialData?.slug || '',
        type: initialData?.type || '',
        category: initialData?.category || 'VISUAL',
        headshot: initialData?.headshot || '',
        bio: initialData?.bio || [''],
        socials: {
            x: initialData?.socials?.x || '',
            instagram: initialData?.socials?.instagram || '',
            linkedin: initialData?.socials?.linkedin || '',
            website: initialData?.socials?.website || '',
        }
    });

    const handleBioChange = (index: number, value: string) => {
        const newBio = [...formData.bio];
        newBio[index] = value;
        setFormData({ ...formData, bio: newBio });
    };

    const addBioParagraph = () => {
        setFormData({ ...formData, bio: [...formData.bio, ''] });
    };

    const removeBioParagraph = (index: number) => {
        if (formData.bio.length === 1) return;
        const newBio = formData.bio.filter((_: string, i: number) => i !== index);
        setFormData({ ...formData, bio: newBio });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing) {
                await updateTalent(initialData._id, formData);
            } else {
                await createTalent(formData);
            }
            router.push('/admin/talents');
            router.refresh();
        } catch (error) {
            console.error("Operation failed:", error);
            alert("Failed to save talent. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const generateSlug = () => {
        const slug = formData.name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        setFormData({ ...formData, slug });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <Link href="/admin/talents" className="text-[10px] text-[#B59431] uppercase tracking-[0.2em] font-bold flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft size={12} />
                        Back to Roster
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-[0.1em]">
                        {isEditing ? `Edit: ${initialData.name}` : 'Register New Talent'}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#B59431] text-black px-10 py-4 rounded-sm font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center gap-3 disabled:opacity-50"
                >
                    <Save size={16} />
                    {isLoading ? 'Saving Changes...' : (isEditing ? 'Update Talent' : 'Save Talent')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left Column: Visuals & Basics */}
                <div className="lg:col-span-1 flex flex-col gap-8">
                    <ImageUpload
                        label="Artist Headshot"
                        folder="talents"
                        value={formData.headshot}
                        onChange={(url) => setFormData({ ...formData, headshot: url })}
                    />

                    <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm flex flex-col gap-6">
                        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59431] border-b border-white/5 pb-4">Social Links</h3>

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-white/40 text-[8px] uppercase tracking-widest font-bold">Instagram URL</label>
                                <input
                                    type="url"
                                    value={formData.socials.instagram}
                                    onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, instagram: e.target.value } })}
                                    className="bg-black border border-white/10 p-3 text-xs text-white outline-none focus:border-[#B59431] transition-colors"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/40 text-[8px] uppercase tracking-widest font-bold">X (Twitter) URL</label>
                                <input
                                    type="url"
                                    value={formData.socials.x}
                                    onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, x: e.target.value } })}
                                    className="bg-black border border-white/10 p-3 text-xs text-white outline-none focus:border-[#B59431] transition-colors"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/40 text-[8px] uppercase tracking-widest font-bold">LinkedIn URL</label>
                                <input
                                    type="url"
                                    value={formData.socials.linkedin}
                                    onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, linkedin: e.target.value } })}
                                    className="bg-black border border-white/10 p-3 text-xs text-white outline-none focus:border-[#B59431] transition-colors"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/40 text-[8px] uppercase tracking-widest font-bold">Website URL</label>
                                <input
                                    type="url"
                                    value={formData.socials.website}
                                    onChange={(e) => setFormData({ ...formData, socials: { ...formData.socials, website: e.target.value } })}
                                    className="bg-black border border-white/10 p-3 text-xs text-white outline-none focus:border-[#B59431] transition-colors"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Detailed Info */}
                <div className="lg:col-span-2 flex flex-col gap-8">

                    <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm flex flex-col gap-8">
                        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59431] border-b border-white/5 pb-4">General Profile</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Display Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    onBlur={generateSlug}
                                    className="bg-black border border-white/10 p-4 text-sm text-white outline-none focus:border-[#B59431] transition-colors"
                                    placeholder="e.g. EOLIA"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">URL Slug</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="bg-black border border-white/10 p-4 text-sm text-white/60 outline-none focus:border-[#B59431] transition-colors"
                                    placeholder="e.g. eolia"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Artist Tagline / Type</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="bg-black border border-white/10 p-4 text-sm text-white outline-none focus:border-[#B59431] transition-colors"
                                    placeholder="e.g. [ THE VISUAL ]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Filtering Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                    className="bg-black border border-white/10 p-4 text-sm text-white outline-none focus:border-[#B59431] transition-colors appearance-none"
                                >
                                    <option value="VISUAL">VISUAL</option>
                                    <option value="SONIC">SONIC</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mt-4">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Biography (Paragraphs)</label>
                            <div className="flex flex-col gap-4">
                                {formData.bio.map((paragraph: string, index: number) => (
                                    <div key={index} className="relative group">
                                        <textarea
                                            rows={3}
                                            value={paragraph}
                                            onChange={(e) => handleBioChange(index, e.target.value)}
                                            className="w-full bg-black border border-white/10 p-4 text-sm text-white/80 outline-none focus:border-[#B59431] transition-colors leading-relaxed"
                                            placeholder={`Paragraph ${index + 1}...`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeBioParagraph(index)}
                                            className="absolute top-4 right-4 text-white/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addBioParagraph}
                                    className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#B59431] hover:text-white transition-colors"
                                >
                                    <Plus size={14} />
                                    Add Paragraph
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
