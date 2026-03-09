"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateSettings } from '@/actions/settingsActions';
import MediaUpload from './MediaUpload';
import { Save, Loader2 } from 'lucide-react';

interface HeroSettingsFormProps {
    initialData: any;
}

export default function HeroSettingsForm({ initialData }: HeroSettingsFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        heroBackground: {
            type: initialData?.heroBackground?.type || 'image',
            src: initialData?.heroBackground?.src || '/images/hero.png',
        }
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateSettings(formData);
            router.refresh();
            alert("Settings updated successfully!");
        } catch (error) {
            console.error("Failed to update settings:", error);
            alert("Failed to update settings.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-[0.1em]">Site Settings</h1>
                    <p className="text-white/40 text-sm tracking-wide">Configure global elements and hero appearance.</p>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#B59431] text-black px-10 py-4 rounded-sm font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center gap-3 disabled:opacity-50"
                >
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    {isLoading ? 'Saving...' : 'Save Settings'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-sm flex flex-col gap-8 h-fit">
                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#B59431] border-b border-white/5 pb-4">Hero Background</h3>

                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Background Type</label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({
                                        ...formData,
                                        heroBackground: { ...formData.heroBackground, type: 'image' }
                                    })}
                                    className={`flex-1 py-3 px-4 text-[10px] font-bold uppercase tracking-widest border transition-all ${formData.heroBackground.type === 'image'
                                            ? 'bg-[#B59431] text-black border-[#B59431]'
                                            : 'bg-black text-white/40 border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    Image
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({
                                        ...formData,
                                        heroBackground: { ...formData.heroBackground, type: 'video' }
                                    })}
                                    className={`flex-1 py-3 px-4 text-[10px] font-bold uppercase tracking-widest border transition-all ${formData.heroBackground.type === 'video'
                                            ? 'bg-[#B59431] text-black border-[#B59431]'
                                            : 'bg-black text-white/40 border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    Video
                                </button>
                            </div>
                        </div>

                        <MediaUpload
                            label={formData.heroBackground.type === 'image' ? "Hero Image" : "Hero Video"}
                            type={formData.heroBackground.type as 'image' | 'video'}
                            value={formData.heroBackground.src}
                            onChange={(url) => setFormData({
                                ...formData,
                                heroBackground: { ...formData.heroBackground, src: url }
                            })}
                            folder="settings"
                        />

                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Source URL (Fallback/Direct)</label>
                            <input
                                type="text"
                                value={formData.heroBackground.src}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    heroBackground: { ...formData.heroBackground, src: e.target.value }
                                })}
                                className="bg-black border border-white/10 p-4 text-sm text-white outline-none focus:border-[#B59431] transition-colors"
                                placeholder="https://..."
                            />
                            <p className="text-[10px] text-white/20 italic">You can manually paste a URL or use the upload button above.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="bg-[#B59431]/5 border border-[#B59431]/20 p-8 rounded-sm">
                        <h4 className="text-[#B59431] text-[10px] uppercase tracking-widest font-bold mb-4">Implementation Note</h4>
                        <p className="text-white/60 text-xs leading-relaxed">
                            The Hero background supports high-quality images and MP4/WebM videos. Videos will automatically loop, play muted, and autoplay on the homepage.
                            <br /><br />
                            For best performance, ensure images are optimized and videos are under 10MB if possible.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}
