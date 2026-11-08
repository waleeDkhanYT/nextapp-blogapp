"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { verifyAdminAccess } from "@/lib/admin-auth";
import { z } from "zod";

const commentSchema = z.object({
    body: z.string().min(1, "Comment cannot be empty").max(2000),
    articleId: z.string().min(1, "Article ID is required")
});

export type AdminCommentActionState = {
    error?: string;
    success?: boolean;
};

/**
 * Admin creates a comment on any article
 */
export async function adminCreateCommentAction(
    _prevState: AdminCommentActionState,
    formData: FormData
): Promise<AdminCommentActionState> {
    const { isAdmin, user: adminUser } = await verifyAdminAccess();
    if (!isAdmin || !adminUser) {
        return { error: "Unauthorized: Admin access required." };
    }

    const body = (formData.get("body") as string)?.trim();
    const articleId = formData.get("articleId") as string;
    const authorId = (formData.get("authorId") as string) || adminUser.id;

    const parse = commentSchema.safeParse({ body, articleId });
    if (!parse.success) {
        return { error: parse.error.errors[0]?.message || "Invalid input." };
    }

    try {
        await prisma.comment.create({
            data: {
                body,
                articleId,
                authorId
            }
        });

        revalidatePath("/admin/comments");
        revalidatePath("/admin");
        revalidatePath(`/articles/${articleId}`);
        return { success: true };
    } catch {
        return { error: "Failed to post comment due to database error." };
    }
}

/**
 * Admin moderates/updates a comment's content
 */
export async function adminEditCommentAction(
    commentId: string,
    newBody: string
): Promise<{ success: boolean; error?: string }> {
    const { isAdmin } = await verifyAdminAccess();
    if (!isAdmin) {
        return { success: false, error: "Unauthorized" };
    }

    const trimmed = newBody?.trim();
    if (!trimmed) {
        return { success: false, error: "Comment text cannot be empty." };
    }

    try {
        const comment = await prisma.comment.update({
            where: { id: commentId },
            data: { body: trimmed }
        });

        revalidatePath("/admin/comments");
        revalidatePath(`/articles/${comment.articleId}`);
        return { success: true };
    } catch {
        return { success: false, error: "Failed to update comment." };
    }
}

/**
 * Admin deletes any comment
 */
export async function adminDeleteCommentAction(
    commentId: string
): Promise<{ success: boolean; error?: string }> {
    const { isAdmin } = await verifyAdminAccess();
    if (!isAdmin) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const comment = await prisma.comment.delete({
            where: { id: commentId }
        });

        revalidatePath("/admin/comments");
        revalidatePath("/admin");
        revalidatePath(`/articles/${comment.articleId}`);
        return { success: true };
    } catch {
        return { success: false, error: "Failed to delete comment." };
    }
}
