"use server";

import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import { revalidatePath } from "next/cache";

export async function getProjects() {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(projects));
}

export async function createProject(formData: any) {
    await dbConnect();
    const project = await Project.create(formData);
    revalidatePath("/admin/projects");
    revalidatePath("/");
    revalidatePath("/projects");
    return JSON.parse(JSON.stringify(project));
}

export async function updateProject(id: string, formData: any) {
    await dbConnect();
    const project = await Project.findByIdAndUpdate(id, formData, { new: true });
    revalidatePath("/admin/projects");
    revalidatePath(`/projects/${id}`);
    revalidatePath("/");
    revalidatePath("/projects");
    return JSON.parse(JSON.stringify(project));
}

export async function deleteProject(id: string) {
    await dbConnect();
    await Project.findByIdAndDelete(id);
    revalidatePath("/admin/projects");
    revalidatePath("/");
    revalidatePath("/projects");
    return { success: true };
}
export async function getProjectById(id: string) {
    await dbConnect();
    const project = await Project.findById(id);
    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
}
