import React from "react";
import { prisma } from "@/lib/prisma";
import AdminProjectsManager from "@/components/admin/AdminProjectsManager";

export const metadata = {
    title: "Portfolio & Projects | Admin Console",
    description: "Manage showcase projects, repositories, and technical demos."
};

export default async function AdminProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    });

    return (
        <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-border/60">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        Showcase Projects &amp; Portfolio
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Curate technical case studies, demo applications, and open-source GitHub repositories.
                    </p>
                </div>
            </div>

            <AdminProjectsManager projects={projects} />
        </div>
    );
}
