import type { Metadata } from "next";

export const metadata: Metadata = { title: "Creative Strategy, Artist Representation & Cultural Programming", description: "Explore YAAAS services: brand and creative strategy, artist development and representation, and experiential cultural programming.", alternates: { canonical: "/services" } };

import React from "react";
import ServicesClient from "@/components/services/ServicesClient";
import { getServices } from "@/actions/serviceActions";
import { getSettings } from "@/actions/settingsActions";

export default async function ServicesPage() {
    const [services, settings] = await Promise.all([
        getServices(),
        getSettings()
    ]);

    return <ServicesClient services={services} settings={settings} />;
}
