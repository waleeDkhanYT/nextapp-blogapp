import React from "react";
import { prisma } from "@/lib/prisma";
import AdminLikesManager from "@/components/admin/AdminLikesManager";

export const metadata = {
    title: "Likes & Engagement | Admin Console",
    description: "Monitor and moderate audience likes and endorsements."
};

export default async function AdminLikesPage() {
    const likes = await prisma.like.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: {
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
    });

    return (
        <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-border/60">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        Likes &amp; Reader Endorsements
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Track, audit, and moderate {likes.length} positive endorsements given by community readers.
                    </p>
                </div>
            </div>

            <AdminLikesManager likes={likes} />
        </div>
    );
}
