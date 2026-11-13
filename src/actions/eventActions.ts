"use server";

import dbConnect from "@/lib/mongodb";
import Event from "@/models/Event";
import { revalidatePath } from "next/cache";

export async function getEvents() {
    await dbConnect();
    const events = await Event.find({}).sort({ date: 1, createdAt: -1 });
    return JSON.parse(JSON.stringify(events));
}

export async function createEvent(formData: any) {
    await dbConnect();
    const event = await Event.create(formData);
    revalidatePath("/admin/events");
    revalidatePath("/");
    return JSON.parse(JSON.stringify(event));
}

export async function updateEvent(id: string, formData: any) {
    await dbConnect();
    const event = await Event.findByIdAndUpdate(id, formData, { new: true, runValidators: true });
    revalidatePath("/admin/events");
    revalidatePath("/");
    return event ? JSON.parse(JSON.stringify(event)) : null;
}

export async function deleteEvent(id: string) {
    await dbConnect();
    await Event.findByIdAndDelete(id);
    revalidatePath("/admin/events");
    revalidatePath("/");
    return { success: true };
}
