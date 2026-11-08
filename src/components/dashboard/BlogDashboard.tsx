import Link from "next/link";
import { Button } from "../ui/button";
import { Clock, FileText, MessageCircle, PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RecentArticles from "./RecentArticles";
import { prisma } from "@/lib/prisma";
import { auth } from '@clerk/nextjs/server';

const BlogDashboard = async () => {
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

    // Calculate real stats for this author
    const totalCommentsReceived = articles.reduce((sum, art) => sum + (art.comments?.length || 0), 0);
    const totalWords = articles.reduce((sum, art) => {
        const text = art.content ? art.content.replace(/<[^>]*>/g, "") : "";
        return sum + text.trim().split(/\s+/).filter(Boolean).length;
    }, 0);
    const avgReadingTime = articles.length > 0 ? Math.max(1, Math.round((totalWords / articles.length) / 200)) : 0;

    return (
        <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                        Blog Dashboard
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Welcome back, <span className="font-semibold text-foreground">{user?.name || "Author"}</span>. Here is your publishing overview.
                    </p>
                </div>
                <Link href="/dashboard/articles/create" className="shrink-0 w-full sm:w-auto">
                    <Button className="w-full sm:w-auto gap-2 rounded-xl text-xs sm:text-sm shadow-sm">
                        <PlusCircle className="h-4 w-4" />
                        New Article
                    </Button>
                </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="border border-border/60 hover:border-primary/40 transition-colors shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">
                            My Published Articles
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                            <FileText className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-foreground">{articles.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {articles.length > 0 ? "Actively distributed across Next Blog" : "Draft your first piece"}
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-border/60 hover:border-primary/40 transition-colors shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">
                            Comments Received
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <MessageCircle className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-foreground">{totalCommentsReceived}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Engagements from reader community
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-border/60 hover:border-primary/40 transition-colors shadow-sm sm:col-span-2 lg:col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground">
                            Avg. Reading Time
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400">
                            <Clock className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-foreground">
                            {avgReadingTime} <span className="text-base font-medium text-muted-foreground">min</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Estimated per published article
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Articles Table */}
            <RecentArticles articles={articles} />
        </main>
    );
};

export default BlogDashboard;
