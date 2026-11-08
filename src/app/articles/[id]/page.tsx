import ArticleDetails from "@/components/articles/ArticleDetails";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ArticleDetail({ params }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const article = await prisma.articles.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true,
                },
            },
        },
    });

    if (!article) return notFound();

    return <ArticleDetails article={article} />;
}
