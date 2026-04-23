"use client";

import React, { useState } from 'react';
import { Twitter, Linkedin, Link as LinkIcon, Check } from 'lucide-react';

interface ShareButtonsProps {
    title: string;
}

export default function ShareButtons({ title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    const shareText = `Check out this content: ${title}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socials = [
        {
            name: 'Twitter',
            icon: <Twitter size={16} />,
            href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
        },
        {
            name: 'LinkedIn',
            icon: <Linkedin size={16} />,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        },
    ];

    return (
        <div className="flex gap-4">
            {socials.map((social) => (
                <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                    title={`Share on ${social.name}`}
                >
                    {social.icon}
                </a>
            ))}
            <button
                onClick={handleCopy}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
                title="Copy Link"
            >
                {copied ? <Check size={16} className="text-green-500" /> : <LinkIcon size={16} />}
            </button>
        </div>
    );
}
