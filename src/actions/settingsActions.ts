"use server";

import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { revalidatePath } from "next/cache";

export async function getSettings() {
    await dbConnect();
    let settings = await Settings.findOne({});
    if (!settings) {
        // Create default settings if they don't exist
        settings = await Settings.create({
            heroBackground: {
                type: 'image',
                src: '/images/hero.png'
            }
        });
    }
    return JSON.parse(JSON.stringify(settings));
}

export async function updateSettings(formData: any) {
    await dbConnect();
    const settings = await Settings.findOneAndUpdate({}, formData, { new: true, upsert: true });
    revalidatePath("/");
    revalidatePath("/admin/settings");
    return JSON.parse(JSON.stringify(settings));
}
