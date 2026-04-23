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
