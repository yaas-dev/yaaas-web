"use client";

import { useModal } from "@/components/Modal";
import { useState } from "react";

interface InquiryFormProps {
    artworkTitle: string;
}

export default function InquiryForm({ artworkTitle }: InquiryFormProps) {
    const { closeModal } = useModal();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate validation and submission
        setIsSubmitted(true);
        setTimeout(() => {
            closeModal();
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-primary mb-4">Inquiry Received</h3>
                <p className="text-muted text-sm uppercase tracking-widest">
                    Our curator will contact you regarding <br />
                    <span className="text-foreground font-bold">{artworkTitle}</span> <br />
                    within 24 hours.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="mb-2">
                <h3 className="text-2xl font-playfair font-bold mb-1 uppercase">Purchase Inquiry</h3>
                <p className="text-xs text-muted font-bold uppercase tracking-widest">
                    Item: <span className="text-primary">{artworkTitle}</span>
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Full Name</label>
                <input
                    required
                    type="text"
                    className="bg-background border border-border p-3 focus:border-primary outline-none transition-colors text-sm"
                    placeholder="ALEX VANGUARD"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Email Address</label>
                <input
                    required
                    type="email"
                    className="bg-background border border-border p-3 focus:border-primary outline-none transition-colors text-sm"
                    placeholder="ALEX@STANCE.COM"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-muted font-bold">Message (Optional)</label>
                <textarea
                    rows={4}
                    className="bg-background border border-border p-3 focus:border-primary outline-none transition-colors text-sm resize-none"
                    placeholder="TELL US ABOUT YOUR INTEREST..."
                />
            </div>

            <button
                type="submit"
                className="w-full bg-primary text-black font-bold uppercase tracking-widest py-4 text-sm hover:opacity-90 transition-opacity mt-2"
            >
                Send Inquiry
            </button>

            <style jsx>{`
        .bg-background { background-color: #000000; }
        .border-border { border: 1px solid #333333; }
        .text-primary { color: #B89C24; }
        .text-muted { color: #404040; }
        .text-foreground { color: #ffffff; }
      `}</style>
        </form>
    );
}
