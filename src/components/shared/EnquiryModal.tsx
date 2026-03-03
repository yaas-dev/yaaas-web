import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type Artwork = {
    id: number | string;
    src: string;
    artist: string;
    title: string;
};

interface EnquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    artwork: Artwork | null;
}

export default function EnquiryModal({ isOpen, onClose, artwork }: EnquiryModalProps) {
    if (!isOpen || !artwork) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
            >
                {/* Click outside to close */}
                <div className="absolute inset-0 z-0" onClick={onClose}></div>

                <motion.div
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="bg-[#0a0a0a] overflow-hidden w-full max-w-5xl flex flex-col md:flex-row relative border border-[#c1a03a]/30 shadow-2xl rounded-sm z-10 max-h-[90vh] overflow-y-auto"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 text-white/50 hover:text-[#c1a03a] transition-colors p-2 bg-black/50 rounded-full"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Left: Image */}
                    <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px] bg-black">
                        <Image
                            src={artwork.src || '/images/service_1.png'}
                            alt={artwork.title || 'Artwork'}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Right: Details & Form */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="text-[#d8b511] font-bold text-sm tracking-widest uppercase mb-1">{artwork.artist || 'Artist Name'}</h2>
                        <h3 className="text-white text-3xl md:text-4xl font-light mb-6 uppercase tracking-widest leading-tight">{artwork.title || 'Title of Piece'}</h3>

                        <div className="h-[1px] w-full bg-white/10 mb-8"></div>

                        <h4 className="text-white/80 text-xs uppercase tracking-[0.2em] mb-6 font-medium">Enquire About This Piece</h4>

                        <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert('Enquiry Sent!'); onClose(); }}>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">Full Name</label>
                                <input required type="text" className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-[#c1a03a] transition-colors font-light text-sm" placeholder="Enter your name" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">Email Address</label>
                                <input required type="email" className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-[#c1a03a] transition-colors font-light text-sm" placeholder="Enter your email" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-white/50 text-[10px] uppercase tracking-widest font-semibold">Message</label>
                                <textarea required defaultValue={`I would like to enquire about ${artwork.title || 'this piece'} by ${artwork.artist || 'the artist'}.`} className="bg-transparent border-b border-white/20 pb-2 text-white outline-none focus:border-[#c1a03a] transition-colors resize-none font-light text-sm h-20" />
                            </div>
                            <button type="submit" className="bg-[#c1a03a] text-black font-bold uppercase tracking-[0.2em] text-xs py-4 hover:bg-white transition-colors mt-4">
                                Submit Enquiry
                            </button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
