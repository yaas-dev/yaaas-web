"use server";

import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { revalidatePath } from "next/cache";

export async function getServices() {
    await dbConnect();
    const services = await Service.find({}).sort({ createdAt: 1 });
    return JSON.parse(JSON.stringify(services));
}

export async function createService(formData: any) {
    await dbConnect();
    const service = await Service.create(formData);
    revalidatePath("/admin/services");
    revalidatePath("/");
    revalidatePath("/services");
    return JSON.parse(JSON.stringify(service));
}

export async function updateService(id: string, formData: any) {
    await dbConnect();
    const service = await Service.findByIdAndUpdate(id, formData, { new: true });
    revalidatePath("/admin/services");
    revalidatePath("/");
    revalidatePath("/services");
    return JSON.parse(JSON.stringify(service));
}

export async function deleteService(id: string) {
    await dbConnect();
    await Service.findByIdAndDelete(id);
    revalidatePath("/admin/services");
    revalidatePath("/");
    revalidatePath("/services");
    return { success: true };
}

export async function getServiceById(id: string) {
    await dbConnect();
    const service = await Service.findById(id);
    if (!service) return null;
    return JSON.parse(JSON.stringify(service));
}
