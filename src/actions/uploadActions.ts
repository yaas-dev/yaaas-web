"use server";

import { uploadImage } from "@/lib/cloudinary";

export async function uploadToCloudinary(base64Image: string, folder: string = 'yaaas') {
    try {
        const url = await uploadImage(base64Image, folder);
        return { success: true, url };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
