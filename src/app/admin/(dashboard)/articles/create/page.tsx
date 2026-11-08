import React from "react";
import { prisma } from "@/lib/prisma";
import AdminArticleForm from "@/components/admin/AdminArticleForm";

export const metadata = {
    title: "Create Article | Admin Console",
    description: "Publish a new article as Administrator."
};

export default async function AdminCreateArticlePage() {
    const authors = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
        },
        orderBy: { name: "asc" }
    });

    return (
        <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
            <AdminArticleForm mode="create" authors={authors} />
        </div>
    );
}
