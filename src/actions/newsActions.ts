"use server";

import dbConnect from "@/lib/mongodb";
import News from "@/models/News";
import { revalidatePath } from "next/cache";

export async function getNewsPosts() {
    await dbConnect();
    const news = await News.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(news));
}

export async function getNewsPostById(id: string) {
    await dbConnect();
    const post = await News.findById(id);
    return JSON.parse(JSON.stringify(post));
}

export async function createNews(formData: any) {
    await dbConnect();
    const post = await News.create(formData);
    revalidatePath("/admin/news");
    revalidatePath("/");
    revalidatePath("/news");
    return JSON.parse(JSON.stringify(post));
}

export async function updateNews(id: string, formData: any) {
    await dbConnect();
    const post = await News.findByIdAndUpdate(id, formData, { new: true });
    revalidatePath("/admin/news");
    revalidatePath("/");
    revalidatePath("/news");
    return JSON.parse(JSON.stringify(post));
}

export async function deleteNews(id: string) {
    await dbConnect();
    await News.findByIdAndDelete(id);
    revalidatePath("/admin/news");
    revalidatePath("/");
    revalidatePath("/news");
    return { success: true };
}
