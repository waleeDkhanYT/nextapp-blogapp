import React from "react";
import { redirect } from "next/navigation";
import { verifyAdminAccess } from "@/lib/admin-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
    title: "Admin Console | Next Blog App",
    description: "Administrative command center for articles, users, comments, and analytics."
};

export default async function AdminDashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const { isAdmin } = await verifyAdminAccess();
    if (!isAdmin) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen w-full bg-background flex flex-col lg:flex-row">
            <AdminSidebar />
            <main className="flex-1 w-full min-w-0 overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
