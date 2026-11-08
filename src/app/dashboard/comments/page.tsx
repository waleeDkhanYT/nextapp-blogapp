import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileText, Sparkles, PlusCircle } from "lucide-react";
import CommentsManager from "@/components/dashboard/CommentsManager";

export const metadata = {
    title: "Manage Comments | Next Blog Dashboard",
    description: "Moderate and review comments submitted to your published articles."
};

export default async function DashboardCommentsPage() {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId }
    });

    if (!user) {
        return (
            <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
                <div className="text-center py-12">User profile not found. Please log in again.</div>
            </main>
        );
    }

    // Fetch comments on all articles written by this user
    const comments = await prisma.comment.findMany({
        where: {
            article: {
                authorId: user.id
            }
        },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            },
            article: {
                select: {
                    id: true,
                    title: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    // Unique articles that have received comments
    const articlesWithCommentsCount = new Set(comments.map(c => c.articleId)).size;

    return (
        <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                        Comments Management
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Review, reply, and moderate discussions on your published articles.
                    </p>
                </div>
                <Link href="/dashboard/articles" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto gap-2 rounded-xl text-xs sm:text-sm">
                        <FileText className="h-4 w-4" />
                        View My Articles
                    </Button>
                </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid gap-4 sm:grid-cols-2">
                <Card className="border border-border/60 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">
                            Total Discussion Comments
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <MessageCircle className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-foreground">{comments.length}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Responses across your entire blog catalog
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-border/60 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">
                            Active Articles with Discussions
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                            <FileText className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-foreground">{articlesWithCommentsCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Articles generating audience engagement
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">
                        Recent Comments ({comments.length})
                    </h2>
                </div>

                {comments.length > 0 ? (
                    <CommentsManager comments={comments} />
                ) : (
                    <Card className="border border-dashed border-border/80 bg-muted/20 p-12 text-center space-y-4">
                        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground">No comments yet</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                            When readers leave thoughts or questions on your articles, they will appear here for review and moderation.
                        </p>
                        <Link href="/dashboard/articles/create">
                            <Button size="sm" className="rounded-full gap-2 text-xs">
                                <PlusCircle className="h-3.5 w-3.5" /> Write Another Article
                            </Button>
                        </Link>
                    </Card>
                )}
            </div>
        </main>
    );
}
