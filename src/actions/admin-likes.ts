"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyAdminAccess } from "@/lib/admin-auth";

/**
 * Admin deletes a like record
 */
export async function adminDeleteLikeAction(
    likeId: string
): Promise<{ success: boolean; error?: string }> {
    const { isAdmin } = await verifyAdminAccess();
    if (!isAdmin) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const like = await prisma.like.delete({
            where: { id: likeId }
        });

        revalidatePath("/admin/likes");
        revalidatePath("/admin");
        revalidatePath(`/articles/${like.articleId}`);
        return { success: true };
    } catch {
        return { success: false, error: "Failed to remove like." };
    }
}
