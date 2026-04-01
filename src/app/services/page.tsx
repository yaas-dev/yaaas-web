import React from "react";
import ServicesClient from "@/components/services/ServicesClient";
import { getServices } from "@/actions/serviceActions";

export default async function ServicesPage() {
    const services = await getServices();

    return <ServicesClient services={services} />;
}
