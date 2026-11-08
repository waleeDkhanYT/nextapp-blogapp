import React from "react";
import { prisma } from "@/lib/prisma";
import AdminArticlesTable from "@/components/admin/AdminArticlesTable";

export const metadata = {
    title: "Manage Articles | Admin Console",
    description: "Browse, filter, edit, and delete published blog articles."
};

export default async function AdminArticlesPage() {
    const articles = await prisma.articles.findMany({
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
            _count: {
                select: {
                    comments: true,
                    likes: true
                }
            }
        }
    });

    const categoryList = await prisma.articles.findMany({
        select: { category: true },
        distinct: ["category"]
    });
    const categories = Array.from(new Set(categoryList.map((c) => c.category))).filter(Boolean);

    return (
        <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-border/60">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        Articles Management
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Full administrative CRUD oversight on all {articles.length} published stories.
                    </p>
                </div>
            </div>

            <AdminArticlesTable articles={articles} categories={categories} />
        </div>
    );
}
