"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const updateUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(60),
    role: z.string().max(80).optional(),
});

export type UpdateUserFormState = {
    success?: boolean;
    errors?: {
        name?: string[];
        role?: string[];
        formErrors?: string[];
    };
};

export const updateUserProfile = async (
    prevState: UpdateUserFormState,
    formData: FormData
): Promise<UpdateUserFormState> => {
    const { userId } = await auth();
    if (!userId) {
        return {
            errors: {
                formErrors: ["You must be logged in to update your profile."],
            },
        };
    }

    const result = updateUserSchema.safeParse({
        name: formData.get("name"),
        role: formData.get("role") || undefined,
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors,
        };
    }

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        return {
            errors: {
                formErrors: ["User not found in database."],
            },
        };
    }

    try {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                name: result.data.name,
                role: result.data.role || null,
            },
        });
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Failed to update profile";
        return {
            errors: {
                formErrors: [message],
            },
        };
    }

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");
    revalidatePath("/authors");
    return { success: true, errors: {} };
};
