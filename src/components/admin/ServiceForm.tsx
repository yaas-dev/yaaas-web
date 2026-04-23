"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createService, updateService } from '@/actions/serviceActions';
import ImageUpload from './ImageUpload';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ServiceFormProps {
    initialData?: any;
}

export default function ServiceForm({ initialData }: ServiceFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const isEditing = !!initialData;

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        image: initialData?.image || '',
        backgroundImage: initialData?.backgroundImage || '',
        number: initialData?.number || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image) {
            alert("Please upload a service image.");
            return;
        }

        setIsLoading(true);
        try {
            if (isEditing) {
                await updateService(initialData._id, formData);
            } else {
                await createService(formData);
            }
            router.push('/admin/services');
            router.refresh();
        } catch (error) {
            console.error("Operation failed:", error);
            alert("Failed to save service.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col gap-2">
                    <Link href="/admin/services" className="text-[10px] text-[#B59431] uppercase tracking-[0.2em] font-bold flex items-center gap-2 hover:text-white transition-colors">
                        <ArrowLeft size={12} />
                        Back to Services
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-white uppercase tracking-[0.1em]">
                        {isEditing ? `Edit Service: ${initialData.title}` : 'Define New Service'}
                    </h1>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#B59431] text-black px-10 py-4 rounded-sm font-extrabold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center gap-3 disabled:opacity-50"
                >
                    <Save size={16} />
                    {isLoading ? 'Saving...' : (isEditing ? 'Update Service' : 'Publish Service')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Left: Service Image */}
                <div className="lg:col-span-1 flex flex-col gap-10">
                    <ImageUpload
                        label="Service Featured Image"
                        folder="services"
                        value={formData.image}
                        onChange={(url) => setFormData({ ...formData, image: url })}
                    />
                    <ImageUpload
                        label="Content Background Image (Optional)"
                        folder="services"
                        value={formData.backgroundImage}
                        onChange={(url) => setFormData({ ...formData, backgroundImage: url })}
                    />
                </div>

                {/* Right: Service Details */}
                <div className="lg:col-span-2 flex flex-col gap-10">
                    <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-12 rounded-sm flex flex-col gap-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Service Title</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="bg-black border border-white/10 p-4 text-sm text-white outline-none focus:border-[#B59431] transition-colors"
                                    placeholder="e.g. CREATIVE DIRECTION"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Service Number</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.number}
                                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                                    className="bg-black border border-white/10 p-4 text-sm text-white outline-none focus:border-[#B59431] transition-colors"
                                    placeholder="e.g. 01"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Service Description</label>
                            <textarea
                                required
                                rows={8}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="bg-black border border-white/10 p-4 text-sm text-white/80 outline-none focus:border-[#B59431] transition-colors leading-relaxed"
                                placeholder="Describe the service offerings..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
