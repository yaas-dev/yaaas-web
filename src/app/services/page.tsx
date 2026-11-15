import type { Metadata } from "next";

export const metadata: Metadata = { title: "Creative Agency in Africa | Brand Strategy, Artist Representation & Cultural Programming | YAAAS", description: "Discover YAAAS, an African creative agency offering brand strategy, creative direction, artist management and representation, and cultural programming across Africa and its diaspora.", alternates: { canonical: "/services" } };

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
