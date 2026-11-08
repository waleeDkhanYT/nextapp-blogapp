import React from "react";
import { prisma } from "@/lib/prisma";
import AdminCommentsTable from "@/components/admin/AdminCommentsTable";

export const metadata = {
    title: "Comments Moderation | Admin Console",
    description: "Review, moderate, edit, and manage reader discussions."
};

export default async function AdminCommentsPage() {
    const [comments, articles] = await Promise.all([
        prisma.comment.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        imageUrl: true
                    }
                },
                article: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        }),
        prisma.articles.findMany({
            select: { id: true, title: true },
            orderBy: { createdAt: "desc" }
        })
    ]);

    return (
        <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-border/60">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        Comments Moderation
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Review, edit, and moderate {comments.length} reader comments across all published articles.
                    </p>
                </div>
            </div>

            <AdminCommentsTable comments={comments} articles={articles} />
        </div>
    );
}
