"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deleteComment = async (commentId: string) => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("You must be logged in to delete a comment");
    }

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const comment = await prisma.comment.findUnique({
        where: { id: commentId },
        include: { article: true }
    });

    if (!comment) {
        throw new Error("Comment not found");
    }

    // Authorization: User can delete if they are the comment author OR the article author
    if (comment.authorId !== user.id && comment.article.authorId !== user.id) {
        throw new Error("You are not authorized to delete this comment");
    }

    await prisma.comment.delete({
        where: { id: commentId }
    });

    revalidatePath("/dashboard/comments");
    revalidatePath("/dashboard");
    revalidatePath(`/articles/${comment.articleId}`);
};
