import React from 'react';
import EnquiryList from '@/components/admin/EnquiryList';
import { getEnquiries } from '@/actions/enquiryActions';

export const dynamic = 'force-dynamic';

export default async function EnquiriesPage() {
    const enquiries = await getEnquiries();

    return (
        <div className="space-y-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-[#B59431]/20 pb-8 gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase mb-2 md:mb-4">
                        Enquiries <span className="text-[#B59431]">&</span> Mail
                    </h1>
                    <p className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase">
                        Incoming messages from the YAAAS platform
                    </p>
                </div>
            </div>

            <EnquiryList initialEnquiries={enquiries} />
        </div>
    );
}
