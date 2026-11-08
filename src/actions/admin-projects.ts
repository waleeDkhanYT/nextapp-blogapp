"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyAdminAccess } from "@/lib/admin-auth";
import { z } from "zod";

const projectSchema = z.object({
    title: z.string().min(2, "Title is required").max(100),
    description: z.string().min(5, "Description must be at least 5 characters"),
    techStack: z.string().min(2, "Tech stack is required"),
    githubUrl: z.string().optional(),
    liveUrl: z.string().optional(),
    projectImage: z.string().min(5, "Project image URL is required")
});

export type AdminProjectActionState = {
    error?: string;
    success?: boolean;
};

/**
 * Admin creates a showcase project
 */
export async function adminCreateProjectAction(
    _prevState: AdminProjectActionState,
    formData: FormData
): Promise<AdminProjectActionState> {
    const { isAdmin, user: adminUser } = await verifyAdminAccess();
    if (!isAdmin || !adminUser) {
        return { error: "Unauthorized: Admin access required." };
    }

    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const techStack = (formData.get("techStack") as string)?.trim();
    const githubUrl = (formData.get("githubUrl") as string)?.trim() || null;
    const liveUrl = (formData.get("liveUrl") as string)?.trim() || null;
    const projectImage = (formData.get("projectImage") as string)?.trim() || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop";
    const authorId = (formData.get("authorId") as string) || adminUser.id;

    const parse = projectSchema.safeParse({
        title,
        description,
        techStack,
        githubUrl: githubUrl || undefined,
        liveUrl: liveUrl || undefined,
        projectImage
    });

    if (!parse.success) {
        return { error: parse.error.errors[0]?.message || "Validation failed." };
    }

    try {
        await prisma.project.create({
            data: {
                title,
                description,
                techStack,
                githubUrl,
                liveUrl,
                projectImage,
                authorId
            }
        });

        revalidatePath("/admin/projects");
        revalidatePath("/admin");
        return { success: true };
    } catch {
        return { error: "Failed to create project in database." };
    }
}

/**
 * Admin updates a project
 */
export async function adminUpdateProjectAction(
    projectId: number,
    _prevState: AdminProjectActionState,
    formData: FormData
): Promise<AdminProjectActionState> {
    const { isAdmin } = await verifyAdminAccess();
    if (!isAdmin) {
        return { error: "Unauthorized: Admin access required." };
    }

    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const techStack = (formData.get("techStack") as string)?.trim();
    const githubUrl = (formData.get("githubUrl") as string)?.trim() || null;
    const liveUrl = (formData.get("liveUrl") as string)?.trim() || null;
    const projectImage = (formData.get("projectImage") as string)?.trim();

    try {
        await prisma.project.update({
            where: { id: projectId },
            data: {
                ...(title && { title }),
                ...(description && { description }),
                ...(techStack && { techStack }),
                githubUrl,
                liveUrl,
                ...(projectImage && { projectImage })
            }
        });

        revalidatePath("/admin/projects");
        revalidatePath("/admin");
        return { success: true };
    } catch {
        return { error: "Failed to update project." };
    }
}

/**
 * Admin deletes a project
 */
export async function adminDeleteProjectAction(
    projectId: number
): Promise<{ success: boolean; error?: string }> {
    const { isAdmin } = await verifyAdminAccess();
    if (!isAdmin) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await prisma.project.delete({ where: { id: projectId } });
        revalidatePath("/admin/projects");
        revalidatePath("/admin");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to delete project." };
    }
}
