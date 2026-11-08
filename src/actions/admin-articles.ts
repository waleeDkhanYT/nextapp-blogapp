"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { verifyAdminAccess } from "@/lib/admin-auth";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const articleSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(120),
    category: z.string().min(2, "Category is required"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    authorId: z.string().min(1, "Author is required")
});

export type AdminArticleActionState = {
    errors?: {
        title?: string[];
        category?: string[];
        content?: string[];
        authorId?: string[];
        featuredImage?: string[];
        formErrors?: string[];
    };
    success?: boolean;
};

/**
 * Admin creates an article (can author under any user or Master Admin)
 */
export async function adminCreateArticleAction(
    _prevState: AdminArticleActionState,
    formData: FormData
): Promise<AdminArticleActionState> {
    const { isAdmin, user: adminUser } = await verifyAdminAccess();
    if (!isAdmin || !adminUser) {
        return { errors: { formErrors: ["Unauthorized: Admin access required."] } };
    }

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const authorId = (formData.get("authorId") as string) || adminUser.id;
    const customImageUrl = (formData.get("customImageUrl") as string)?.trim();

    const parseResult = articleSchema.safeParse({ title, category, content, authorId });
    if (!parseResult.success) {
        return { errors: parseResult.error.flatten().fieldErrors };
    }

    let finalImageUrl = customImageUrl || "";

    const imageFile = formData.get("featuredImage") as File | null;
    if (imageFile && imageFile.size > 0 && imageFile.name) {
        try {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResponse: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "auto" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });
            if (uploadResponse?.secure_url) {
                finalImageUrl = uploadResponse.secure_url;
            }
        } catch {
            if (!finalImageUrl) {
                // Fallback high-res tech cover if upload fails
                finalImageUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop";
            }
        }
    }

    if (!finalImageUrl) {
        finalImageUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop";
    }

    try {
        await prisma.articles.create({
            data: {
                title,
                category,
                content,
                authorId,
                featuredImage: finalImageUrl
            }
        });
    } catch {
        return { errors: { formErrors: ["Database error: Failed to create article."] } };
    }

    revalidatePath("/admin/articles");
    revalidatePath("/admin");
    revalidatePath("/articles");
    revalidatePath("/");
    redirect("/admin/articles");
}

/**
 * Admin updates an article
 */
export async function adminEditArticleAction(
    articleId: string,
    _prevState: AdminArticleActionState,
    formData: FormData
): Promise<AdminArticleActionState> {
    const { isAdmin } = await verifyAdminAccess();
    if (!isAdmin) {
        return { errors: { formErrors: ["Unauthorized: Admin access required."] } };
    }

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const content = formData.get("content") as string;
    const authorId = formData.get("authorId") as string;
    const customImageUrl = (formData.get("customImageUrl") as string)?.trim();

    const parseResult = articleSchema.safeParse({ title, category, content, authorId });
    if (!parseResult.success) {
        return { errors: parseResult.error.flatten().fieldErrors };
    }

    const existing = await prisma.articles.findUnique({ where: { id: articleId } });
    if (!existing) {
        return { errors: { formErrors: ["Article not found."] } };
    }

    let finalImageUrl = customImageUrl || existing.featuredImage;

    const imageFile = formData.get("featuredImage") as File | null;
    if (imageFile && imageFile.size > 0 && imageFile.name) {
        try {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResponse: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "auto" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });
            if (uploadResponse?.secure_url) {
                finalImageUrl = uploadResponse.secure_url;
            }
        } catch {
            // Keep existing image if upload fails
        }
    }

    try {
        await prisma.articles.update({
            where: { id: articleId },
            data: {
                title,
                category,
                content,
                authorId,
                featuredImage: finalImageUrl
            }
        });
    } catch {
        return { errors: { formErrors: ["Database error: Failed to update article."] } };
    }

    revalidatePath("/admin/articles");
    revalidatePath(`/admin/articles/${articleId}/edit`);
    revalidatePath(`/articles/${articleId}`);
    revalidatePath("/articles");
    revalidatePath("/");
    redirect("/admin/articles");
}

/**
 * Admin deletes an article with cascaded deletion of comments & likes
 */
export async function adminDeleteArticleAction(articleId: string) {
    const { isAdmin } = await verifyAdminAccess();
    if (!isAdmin) {
        throw new Error("Unauthorized");
    }

    await prisma.$transaction([
        prisma.comment.deleteMany({ where: { articleId } }),
        prisma.like.deleteMany({ where: { articleId } }),
        prisma.articles.delete({ where: { id: articleId } })
    ]);

    revalidatePath("/admin/articles");
    revalidatePath("/admin/comments");
    revalidatePath("/admin");
    revalidatePath("/articles");
    revalidatePath("/");
    return { success: true };
}
