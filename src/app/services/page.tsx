import type { Metadata } from "next";

export const metadata: Metadata = { title: "Creative Strategy, Artist Representation & Cultural Programming", description: "Explore YAAAS services: brand and creative strategy, artist development and representation, and experiential cultural programming.", alternates: { canonical: "/services" } };

import React from "react";
import ServicesClient from "@/components/services/ServicesClient";
import { getServices } from "@/actions/serviceActions";
import { getSettings } from "@/actions/settingsActions";
import { getProjects } from "@/actions/projectActions";

export default async function ServicesPage() {
    const [services, settings, projects] = await Promise.all([
        getServices(),
        getSettings(),
        getProjects()
    ]);
    const featuredProjects = projects.filter((project: any) => project.featuredOnServices);

    return <ServicesClient services={services} settings={settings} featuredProjects={featuredProjects} />;
}
