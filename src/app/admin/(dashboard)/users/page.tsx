import React from "react";
import { prisma } from "@/lib/prisma";
import AdminUsersTable from "@/components/admin/AdminUsersTable";

export const metadata = {
    title: "User Management | Admin Console",
    description: "Manage registered authors, editors, readers, and administrator roles."
};

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { id: "desc" },
        include: {
            _count: {
                select: {
                    articles: true,
                    comments: true
                }
            }
        }
    });

    return (
        <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-border/60">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        Users &amp; Roles Management
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Oversee {users.length} registered platform members, permissions, and publishing statistics.
                    </p>
                </div>
            </div>

            <AdminUsersTable users={users} />
        </div>
    );
}
