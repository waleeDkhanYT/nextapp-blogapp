import crypto from "crypto";
import { cookies } from "next/headers";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";

export const ADMIN_EMAIL = "admin@nextblogapp.com";
export const ADMIN_PASSWORD = "AdminSn7dF4LMKBjT8Mt";
export const ADMIN_COOKIE_NAME = "nextblog_admin_token";

const SECRET = process.env.CLERK_SECRET_KEY || "next-blog-super-secure-admin-secret-key-2025";

/**
 * Generate a cryptographically signed admin session token
 */
export function generateAdminSessionToken(email: string): string {
    const payload = {
        email,
        iat: Date.now(),
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    };
    const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const hmac = crypto.createHmac("sha256", SECRET).update(payloadStr).digest("base64url");
    return `${payloadStr}.${hmac}`;
}

/**
 * Verify signed admin session token
 */
export function verifyAdminSessionToken(token: string): boolean {
    try {
        const [payloadStr, signature] = token.split(".");
        if (!payloadStr || !signature) return false;

        const expectedSig = crypto.createHmac("sha256", SECRET).update(payloadStr).digest("base64url");
        if (signature !== expectedSig) return false;

        const payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString("utf-8"));
        if (payload.email !== ADMIN_EMAIL) return false;
        if (payload.exp < Date.now()) return false;

        return true;
    } catch {
        return false;
    }
}

export type AdminAuthResult = {
    isAdmin: boolean;
    user: User | null;
};

/**
 * Verifies if the incoming request is authorized as an administrator.
 * Supports both dedicated admin session cookie and authorized Clerk user.
 */
export async function verifyAdminAccess(): Promise<AdminAuthResult> {
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

    // 1. Check dedicated admin session cookie
    if (token && verifyAdminSessionToken(token)) {
        // Ensure master admin user exists in Prisma
        const adminUser = await prisma.user.upsert({
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
        return { isAdmin: true, user: adminUser };
    }

    // 2. Fallback: check Clerk auth user
    try {
        const { userId } = await auth();
        if (userId) {
            const clerkDbUser = await prisma.user.findUnique({
                where: { clerkUserId: userId }
            });

            if (clerkDbUser) {
                const isRoleAdmin = clerkDbUser.role === "admin" || clerkDbUser.role === "superAdmin";
                const isEmailAdmin = clerkDbUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

                if (isRoleAdmin || isEmailAdmin) {
                    return { isAdmin: true, user: clerkDbUser };
                }
            }
        }
    } catch {
        // Clerk auth not available or failed
    }

    return { isAdmin: false, user: null };
}
