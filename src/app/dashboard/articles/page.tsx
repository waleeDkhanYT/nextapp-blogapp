import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import RecentArticles from "@/components/dashboard/RecentArticles";
import { prisma } from "@/lib/prisma";
import { auth } from '@clerk/nextjs/server';

const ArticlesPage = async () => {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId }
    });

    const articles = await prisma.articles.findMany({
        where: {
            authorId: user?.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            comments: true,
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true,
                },
            },
        },
    });

    return (
        <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                        My Articles
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Manage, edit, or remove your published articles.
                    </p>
                </div>
                <Link href="/dashboard/articles/create" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto gap-2 rounded-xl text-xs sm:text-sm shadow-sm">
                        <PlusCircle className="h-4 w-4" />
                        New Article
                    </Button>
                </Link>
            </div>

            {/* Articles Table */}
            <RecentArticles articles={articles} />
        </main>
    );
};

export default ArticlesPage;
