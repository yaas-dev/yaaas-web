import React, { use } from 'react';
import ServiceForm from '@/components/admin/ServiceForm';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import { notFound } from 'next/navigation';

async function getService(id: string) {
    await dbConnect();
    const service = await Service.findById(id);
    if (!service) return null;
    return JSON.parse(JSON.stringify(service));
}

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = use(params);
    const service = use(getService(unwrappedParams.id));

    if (!service) {
        notFound();
    }

    return <ServiceForm initialData={service} />;
}
