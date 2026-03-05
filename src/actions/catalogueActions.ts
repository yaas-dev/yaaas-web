"use server";

import dbConnect from "@/lib/mongodb";
import Artwork from "@/models/Artwork";
import { revalidatePath } from "next/cache";

export async function getArtworks() {
    await dbConnect();
    // Populate talentId to get the artist name/details if needed, but we also store artistName
    const artworks = await Artwork.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(artworks));
}

export async function createArtwork(formData: any) {
    await dbConnect();
    const artwork = await Artwork.create(formData);
    revalidatePath("/admin/catalogue");
    revalidatePath("/catalogue");
    revalidatePath("/talents/[slug]", "layout"); // Revalidate all talent pages
    return JSON.parse(JSON.stringify(artwork));
}

export async function updateArtwork(id: string, formData: any) {
    await dbConnect();
    const artwork = await Artwork.findByIdAndUpdate(id, formData, { new: true });
    revalidatePath("/admin/catalogue");
    revalidatePath("/catalogue");
    revalidatePath("/talents/[slug]", "layout");
    return JSON.parse(JSON.stringify(artwork));
}

export async function deleteArtwork(id: string) {
    await dbConnect();
    await Artwork.findByIdAndDelete(id);
    revalidatePath("/admin/catalogue");
    revalidatePath("/catalogue");
    revalidatePath("/talents/[slug]", "layout");
    return { success: true };
}
