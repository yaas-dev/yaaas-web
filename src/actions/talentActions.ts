"use server";

import dbConnect from "@/lib/mongodb";
import Talent from "@/models/Talent";
import { revalidatePath } from "next/cache";

export async function getTalents() {
    await dbConnect();
    const talents = await Talent.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(talents));
}

export async function createTalent(formData: any) {
    await dbConnect();
    const talent = await Talent.create(formData);
    revalidatePath("/admin/talents");
    revalidatePath("/talents");
    return JSON.parse(JSON.stringify(talent));
}

export async function updateTalent(id: string, formData: any) {
    await dbConnect();
    const talent = await Talent.findByIdAndUpdate(id, formData, { new: true });
    revalidatePath("/admin/talents");
    revalidatePath(`/talents/${talent.slug}`);
    revalidatePath("/talents");
    return JSON.parse(JSON.stringify(talent));
}

export async function deleteTalent(id: string) {
    await dbConnect();
    const talent = await Talent.findByIdAndDelete(id);
    revalidatePath("/admin/talents");
    revalidatePath("/talents");
    return { success: true };
}

export async function getTalentBySlug(slug: string) {
    await dbConnect();
    const talent = await Talent.findOne({ slug });
    if (!talent) return null;

    // Find artworks for this talent
    const Artwork = (await import("@/models/Artwork")).default;
    const artworks = await Artwork.find({ talentId: talent._id }).sort({ createdAt: -1 });

    return JSON.parse(JSON.stringify({
        ...talent.toObject(),
        artworks
    }));
}
