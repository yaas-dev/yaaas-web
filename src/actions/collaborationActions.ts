"use server";

import dbConnect from "@/lib/mongodb";
import Collaboration from "@/models/Collaboration";
import { revalidatePath } from "next/cache";

export async function getCollaborations() {
    await dbConnect();
    const collaborations = await Collaboration.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(collaborations));
}

export async function createCollaboration(formData: any) {
    await dbConnect();
    const collaboration = await Collaboration.create(formData);
    revalidatePath("/admin/collaborations");
    revalidatePath("/about");
    return JSON.parse(JSON.stringify(collaboration));
}

export async function updateCollaboration(id: string, formData: any) {
    await dbConnect();
    const collaboration = await Collaboration.findByIdAndUpdate(id, formData, { new: true });
    revalidatePath("/admin/collaborations");
    revalidatePath("/about");
    return JSON.parse(JSON.stringify(collaboration));
}

export async function deleteCollaboration(id: string) {
    await dbConnect();
    await Collaboration.findByIdAndDelete(id);
    revalidatePath("/admin/collaborations");
    revalidatePath("/about");
    return { success: true };
}
