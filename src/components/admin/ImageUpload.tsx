"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { uploadToCloudinary } from '@/actions/uploadActions';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
    folder?: string;
}

export default function ImageUpload({ value, onChange, label, folder = 'yaaas' }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate size (e.g., 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("File is too large. Max 5MB.");
            return;
        }

        setIsUploading(true);

        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                const base64String = reader.result as string;
                const result = await uploadToCloudinary(base64String, folder);

                if (result.success && result.url) {
                    onChange(result.url);
                } else {
                    alert("Upload failed: " + result.error);
                }
                setIsUploading(false);
            };
        } catch (error) {
            console.error("Upload error:", error);
            alert("Something went wrong during upload.");
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        onChange('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="flex flex-col gap-3">
            {label && <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{label}</label>}

            <div className="relative group">
                {value ? (
                    <div className="relative w-full aspect-video md:aspect-[4/3] bg-[#111] border border-white/10 rounded-sm overflow-hidden">
                        <Image
                            src={value}
                            alt="Uploaded"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                type="button"
                                onClick={removeImage}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                        className={`w-full aspect-video md:aspect-[4/3] bg-black/50 border-2 border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[#B59431]/40 hover:bg-white/[0.02] transition-all ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 size={32} className="text-[#B59431] animate-spin" />
                                <span className="text-[10px] uppercase tracking-widest text-[#B59431] font-bold">Uploading to Cloudinary...</span>
                            </>
                        ) : (
                            <>
                                <div className="p-4 bg-white/5 rounded-full text-white/40 group-hover:text-[#B59431] transition-colors">
                                    <Upload size={24} />
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold group-hover:text-white transition-colors">Click to upload image</span>
                                    <span className="text-[8px] text-white/20 uppercase tracking-widest">JPG, PNG, WEBP (Max 5MB)</span>
                                </div>
                            </>
                        )}
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
            </div>
        </div>
    );
}
