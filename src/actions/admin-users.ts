"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyAdminAccess, ADMIN_EMAIL } from "@/lib/admin-auth";
import { z } from "zod";

const createUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(80),
    email: z.string().email("Invalid email address"),
    role: z.enum(["admin", "superAdmin", "editor", "author", "user"]),
    imageUrl: z.string().optional()
});

export type AdminUserActionState = {
    error?: string;
    success?: boolean;
};

/**
 * Admin creates a new user directly in database
 */
export async function adminCreateUserAction(
    _prevState: AdminUserActionState,
    formData: FormData
): Promise<AdminUserActionState> {
    const { isAdmin } = await verifyAdminAccess();
    if (!isAdmin) {
        return { error: "Unauthorized: Admin access required." };
    }

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const role = (formData.get("role") as string) || "user";
    const imageUrl = (formData.get("imageUrl") as string)?.trim() || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || "user")}`;

    const parse = createUserSchema.safeParse({ name, email, role, imageUrl });
    if (!parse.success) {
        return { error: parse.error.errors[0]?.message || "Validation failed." };
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        return { error: "A user with this email address already exists." };
    }

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                role,
                imageUrl,
                clerkUserId: `manual_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
            }
        });

        revalidatePath("/admin/users");
        revalidatePath("/admin");
        revalidatePath("/authors");
        return { success: true };
    } catch {
        return { error: "Failed to create user in database." };
    }
}

/**
 * Admin updates a user's details or role
 */
export async function adminUpdateUserAction(
    userId: string,
    data: {
        name?: string;
        role?: string;
        email?: string;
    }
): Promise<{ success: boolean; error?: string }> {
    const { isAdmin } = await verifyAdminAccess();
    if (!isAdmin) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: {
                ...(data.name && { name: data.name.trim() }),
                ...(data.role && { role: data.role }),
                ...(data.email && { email: data.email.trim().toLowerCase() })
            }
        });

        revalidatePath("/admin/users");
        revalidatePath("/admin");
        revalidatePath("/authors");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to update user." };
    }
}

/**
 * Admin safely deletes a user and cleanly cascades associated records
 */
export async function adminDeleteUserAction(
    userId: string
): Promise<{ success: boolean; error?: string }> {
    const { isAdmin } = await verifyAdminAccess();
    if (!isAdmin) {
        return { success: false, error: "Unauthorized" };
    }

    const targetUser = await prisma.user.findUnique({ where: { id: userId } });
    if (!targetUser) {
        return { success: false, error: "User not found." };
    }

    if (targetUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
        return { success: false, error: "Cannot delete the active master administrator account." };
    }

    try {
        // Fetch user's articles to cascade their comments & likes
        const userArticles = await prisma.articles.findMany({
            where: { authorId: userId },
            select: { id: true }
        });
        const articleIds = userArticles.map(a => a.id);

        await prisma.$transaction([
            // 1. Delete comments authored by this user
            prisma.comment.deleteMany({ where: { authorId: userId } }),
            // 2. Delete likes made by this user
            prisma.like.deleteMany({ where: { userId } }),
            // 3. Delete comments on this user's articles
            prisma.comment.deleteMany({ where: { articleId: { in: articleIds } } }),
            // 4. Delete likes on this user's articles
            prisma.like.deleteMany({ where: { articleId: { in: articleIds } } }),
            // 5. Delete articles authored by this user
            prisma.articles.deleteMany({ where: { authorId: userId } }),
            // 6. Delete projects authored by this user
            prisma.project.deleteMany({ where: { authorId: userId } }),
            // 7. Finally delete the user
            prisma.user.delete({ where: { id: userId } })
        ]);

        revalidatePath("/admin/users");
        revalidatePath("/admin/articles");
        revalidatePath("/admin/comments");
        revalidatePath("/admin");
        revalidatePath("/authors");
        revalidatePath("/");
        return { success: true };
    } catch {
        return { success: false, error: "Failed to delete user and cascade records." };
    }
}
