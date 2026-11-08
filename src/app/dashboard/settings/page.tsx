import React from "react";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import SettingsForm from "@/components/dashboard/SettingsForm";

export const metadata = {
    title: "Account & Author Settings | Next Blog Dashboard",
    description: "Manage your author profile, display name, professional role, and theme preferences."
};

export default async function DashboardSettingsPage() {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
        select: {
            id: true,
            name: true,
            email: true,
            imageUrl: true,
            role: true
        }
    });

    if (!user) {
        return (
            <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
                <div className="text-center py-12">User not found. Please log in again.</div>
            </main>
        );
    }

    return (
        <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-8">
            <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                    Account & Author Settings
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Manage your author persona, theme appearance, and account preferences.
                </p>
            </div>

            <SettingsForm user={user} />
        </main>
    );
}
