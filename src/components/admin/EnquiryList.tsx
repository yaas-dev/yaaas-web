'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Mail, Trash2, CheckCircle, Clock } from 'lucide-react';
import { updateEnquiryStatus, deleteEnquiry } from '@/actions/enquiryActions';

interface Enquiry {
    _id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    type: string;
    status: string;
    createdAt: string;
    metadata?: {
        artworkTitle?: string;
        artistName?: string;
        country?: string;
    };
}

export default function EnquiryList({ initialEnquiries }: { initialEnquiries: Enquiry[] }) {
    const [enquiries, setEnquiries] = useState(initialEnquiries);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        const res = await updateEnquiryStatus(id, newStatus);
        if (res.success) {
            setEnquiries(enquiries.map(e => e._id === id ? { ...e, status: newStatus } : e));
            if (selectedEnquiry?._id === id) {
                setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this enquiry?')) return;
        const res = await deleteEnquiry(id);
        if (res.success) {
            setEnquiries(enquiries.filter(e => e._id !== id));
            if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* List */}
            <div className="lg:col-span-1 border border-white/10 rounded-sm bg-[#0a0a0a] overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-white/5">
                    <h2 className="text-xs font-bold tracking-widest uppercase text-[#B59431]">Inbox</h2>
                </div>
                <div className="divide-y divide-white/5 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {enquiries.length === 0 ? (
                        <div className="p-8 text-center text-white/20 text-xs uppercase tracking-widest italic">
                            No messages received.
                        </div>
                    ) : (
                        enquiries.map((enquiry) => (
                            <div
                                key={enquiry._id}
                                onClick={() => setSelectedEnquiry(enquiry)}
                                className={`p-4 cursor-pointer transition-colors hover:bg-white/5 ${selectedEnquiry?._id === enquiry._id ? 'bg-[#B59431]/10 border-l-2 border-[#B59431]' : ''}`}
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text-[10px] font-bold tracking-tighter px-2 py-0.5 rounded-full ${enquiry.type === 'ENQUIRY' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                                        {enquiry.type}
                                    </span>
                                    <span className="text-[10px] text-white/30">{format(new Date(enquiry.createdAt), 'MMM dd')}</span>
                                </div>
                                <h3 className={`text-sm font-bold truncate ${enquiry.status === 'NEW' ? 'text-white' : 'text-white/60'}`}>{enquiry.name}</h3>
                                <p className="text-xs text-white/40 truncate">{enquiry.subject}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Details */}
            <div className="lg:col-span-2 border border-white/10 rounded-sm bg-[#0a0a0a] min-h-[500px]">
                {selectedEnquiry ? (
                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{selectedEnquiry.name}</h2>
                                    <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${selectedEnquiry.status === 'NEW' ? 'bg-[#B59431] text-black' : 'bg-white/10 text-white/60'}`}>
                                        {selectedEnquiry.status}
                                    </span>
                                </div>
                                <p className="text-[#B59431] font-medium text-sm">{selectedEnquiry.email}</p>
                                <p className="text-white/40 text-xs mt-1">{format(new Date(selectedEnquiry.createdAt), 'MMMM dd, yyyy @ HH:mm')}</p>
                            </div>
                            <div className="flex gap-2">
                                {selectedEnquiry.status === 'NEW' ? (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedEnquiry._id, 'READ')}
                                        className="p-2 bg-white/5 hover:bg-white/10 text-white/60 transition-colors rounded-sm"
                                        title="Mark as Read"
                                    >
                                        <CheckCircle size={18} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleStatusUpdate(selectedEnquiry._id, 'NEW')}
                                        className="p-2 bg-[#B59431] text-black hover:opacity-80 transition-colors rounded-sm"
                                        title="Mark as New"
                                    >
                                        <Clock size={18} />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(selectedEnquiry._id)}
                                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors rounded-sm"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Subject</h4>
                            <p className="text-lg text-white font-medium">{selectedEnquiry.subject}</p>
                        </div>

                        {selectedEnquiry.metadata?.artworkTitle && (
                            <div className="mb-10 p-4 bg-white/5 border border-white/10 rounded-sm">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#B59431] mb-2">Artwork Interest</h4>
                                <p className="text-white text-sm">
                                    <span className="font-bold">Title:</span> {selectedEnquiry.metadata.artworkTitle}
                                </p>
                                <p className="text-white text-sm">
                                    <span className="font-bold">Artist:</span> {selectedEnquiry.metadata.artistName}
                                </p>
                            </div>
                        )}

                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">Message</h4>
                            <div className="text-white/80 leading-relaxed whitespace-pre-wrap text-sm border-l-2 border-[#B59431]/30 pl-6 py-2">
                                {selectedEnquiry.message}
                            </div>
                        </div>

                        <div className="mt-20 pt-10 border-t border-white/5">
                            <a
                                href={`mailto:${selectedEnquiry.email}?subject=Re: ${selectedEnquiry.subject}`}
                                className="inline-flex items-center gap-3 bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-[#B59431] transition-colors"
                            >
                                <Mail size={16} />
                                Reply via Email
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-white/20">
                        <Mail size={48} strokeWidth={1} className="mb-4" />
                        <p className="text-xs uppercase tracking-[0.3em] font-bold">Select a message to view</p>
                    </div>
                )}
            </div>
        </div>
    );
}
