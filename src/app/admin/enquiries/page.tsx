import React from 'react';
import EnquiryList from '@/components/admin/EnquiryList';
import { getEnquiries } from '@/actions/enquiryActions';

export const dynamic = 'force-dynamic';

export default async function EnquiriesPage() {
    const enquiries = await getEnquiries();

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end border-b border-[#B59431]/20 pb-8">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase mb-4">
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
