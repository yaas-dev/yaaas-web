"use client";

import React, { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Video, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { uploadToCloudinary } from '@/actions/uploadActions';

interface MediaUploadProps {
    value: string;
    onChange: (url: string) => void;
    type: 'image' | 'video';
    label?: string;
    folder?: string;
}

export default function MediaUpload({ value, onChange, type, label, folder = 'yaaas' }: MediaUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate size (e.g., 10MB for video, 5MB for image)
        const maxSize = type === 'video' ? 20 * 1024 * 1024 : 5 * 1024 * 1024;
        if (file.size > maxSize) {
            alert(`File is too large. Max ${maxSize / (1024 * 1024)}MB.`);
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'yaaas_unsigned'); // If you use unsigned, otherwise use the server action

            // We use the existing server action which handles base64
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

    const removeMedia = () => {
        onChange('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="flex flex-col gap-3">
            {label && <label className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{label}</label>}

            <div className="relative group">
                {value ? (
                    <div className="relative w-full aspect-video bg-[#111] border border-white/10 rounded-sm overflow-hidden">
                        {type === 'image' ? (
                            <Image
                                src={value}
                                alt="Uploaded"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <video
                                src={value}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                type="button"
                                onClick={removeMedia}
                                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => !isUploading && fileInputRef.current?.click()}
                        className={`w-full aspect-video bg-black/50 border-2 border-dashed border-white/10 rounded-sm flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[#B59431]/40 hover:bg-white/[0.02] transition-all ${isUploading ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        {isUploading ? (
                            <>
                                <Loader2 size={32} className="text-[#B59431] animate-spin" />
                                <span className="text-[10px] uppercase tracking-widest text-[#B59431] font-bold">Uploading to Cloudinary...</span>
                            </>
                        ) : (
                            <>
                                <div className="p-4 bg-white/5 rounded-full text-white/40 group-hover:text-[#B59431] transition-colors">
                                    {type === 'image' ? <ImageIcon size={24} /> : <Video size={24} />}
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold group-hover:text-white transition-colors">
                                        Click to upload {type}
                                    </span>
                                    <span className="text-[8px] text-white/20 uppercase tracking-widest">
                                        {type === 'image' ? 'JPG, PNG, WEBP (Max 5MB)' : 'MP4, WEBM (Max 20MB)'}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={type === 'image' ? "image/*" : "video/*"}
                    className="hidden"
                />
            </div>
        </div>
    );
}
