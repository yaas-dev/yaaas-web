"use server";
import dbConnect from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { revalidatePath } from "next/cache";
export async function getSettings() {
    await dbConnect();
    let settings = await Settings.findOne({});
    if (!settings) settings = await Settings.create({ heroBackground: { type: 'image', src: '/images/hero.png' }, servicesHeaderImage: '' });
    return JSON.parse(JSON.stringify(settings));
}
export async function updateSettings(formData: any) {
    await dbConnect();
    const settings = await Settings.findOneAndUpdate({}, formData, { new: true, upsert: true });
    ["/", "/about", "/admin/settings", "/admin/homepage", "/admin/about-team", "/admin/about-intro", "/admin/upcoming-event"].forEach(path => revalidatePath(path));
    return JSON.parse(JSON.stringify(settings));
}