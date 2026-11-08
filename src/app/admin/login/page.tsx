import React from "react";
import { redirect } from "next/navigation";
import { verifyAdminAccess } from "@/lib/admin-auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata = {
    title: "Admin Portal Sign-In | Next Blog",
    description: "Restricted administrative console for platform management."
};

export default async function AdminLoginPage() {
    const { isAdmin } = await verifyAdminAccess();
    if (isAdmin) {
        redirect("/admin");
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
            {/* Background decorative glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 w-full flex justify-center">
                <AdminLoginForm />
            </div>
        </div>
    );
}
