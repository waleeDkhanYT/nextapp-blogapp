import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AdminArticleForm from "@/components/admin/AdminArticleForm";

export const metadata = {
    title: "Edit Article | Admin Console",
    description: "Modify an existing article as Administrator."
};

export default async function AdminEditArticlePage({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const [article, authors] = await Promise.all([
        prisma.articles.findUnique({
            where: { id }
        }),
        prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            },
            orderBy: { name: "asc" }
        })
    ]);

    if (!article) {
        notFound();
    }

    return (
        <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
            <AdminArticleForm
                mode="edit"
                articleId={article.id}
                initialData={{
                    title: article.title,
                    category: article.category,
                    content: article.content,
                    authorId: article.authorId,
                    featuredImage: article.featuredImage
                }}
                authors={authors}
            />
        </div>
    );
}
