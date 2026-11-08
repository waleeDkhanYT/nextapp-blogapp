"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
    ADMIN_EMAIL, 
    ADMIN_PASSWORD, 
    ADMIN_COOKIE_NAME, 
    generateAdminSessionToken 
} from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export type AdminLoginFormState = {
    error?: string;
    success?: boolean;
};

export async function adminLoginAction(
    _prevState: AdminLoginFormState,
    formData: FormData
): Promise<AdminLoginFormState> {
    const email = (formData.get("email") as string)?.trim();
    const password = (formData.get("password") as string)?.trim();

    if (!email || !password) {
        return { error: "Please provide both admin email and password." };
    }

    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase() || password !== ADMIN_PASSWORD) {
        return { error: "Invalid admin credentials. Please double check your email and secret key." };
    }

    // Ensure Master Admin record exists in database
    await prisma.user.upsert({
        where: { email: ADMIN_EMAIL },
        update: { role: "admin" },
        create: {
            email: ADMIN_EMAIL,
            name: "Platform Administrator",
            role: "admin",
            clerkUserId: "admin_master_system",
            imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
        }
    });

    // Set secure HTTP-only cookie
    const token = generateAdminSessionToken(ADMIN_EMAIL);
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    redirect("/admin");
}

export async function adminLogoutAction() {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
    redirect("/admin/login");
}
