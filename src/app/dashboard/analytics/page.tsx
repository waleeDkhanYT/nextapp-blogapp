import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    BarChart3, 
    Heart, 
    MessageCircle, 
    FileText, 
    Eye, 
    TrendingUp, 
    Layers, 
    ArrowUpRight,
    Sparkles,
    CheckCircle2
} from "lucide-react";

export const metadata = {
    title: "Analytics & Performance | Next Blog Dashboard",
    description: "In-depth content analytics, readership metrics, and reader engagement insights."
};

export default async function DashboardAnalyticsPage() {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) return redirectToSignIn();

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId }
    });

    if (!user) {
        return (
            <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
                <div className="text-center py-12">User not found. Please log in again.</div>
            </main>
        );
    }

    // Fetch user's articles with likes and comments
    const articles = await prisma.articles.findMany({
        where: { authorId: user.id },
        include: {
            comments: true,
            likes: true
        },
        orderBy: { createdAt: "desc" }
    });

    // Aggregations
    const totalArticles = articles.length;
    const totalLikes = articles.reduce((sum, art) => sum + art.likes.length, 0);
    const totalComments = articles.reduce((sum, art) => sum + art.comments.length, 0);

    // Estimated views based on interaction density
    const estimatedReads = totalArticles > 0 ? (totalLikes * 25) + (totalComments * 40) + (totalArticles * 120) : 0;
    const engagementScore = estimatedReads > 0 ? (((totalLikes + totalComments) / estimatedReads) * 100).toFixed(1) : "0.0";

    // Category distribution
    const categoryMap: Record<string, number> = {};
    articles.forEach(art => {
        const cat = art.category || "General";
        categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    // Top articles sorted by engagement (likes + comments)
    const sortedArticles = [...articles].sort((a, b) => {
        const engA = a.likes.length + a.comments.length;
        const engB = b.likes.length + b.comments.length;
        return engB - engA;
    });

    return (
        <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-2">
                        <BarChart3 className="h-7 w-7 text-primary" /> Content Analytics
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Track readership trends, community reactions, and publication health.
                    </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Link href="/dashboard/articles/create" className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto gap-2 rounded-xl text-xs sm:text-sm shadow-sm">
                            <FileText className="h-4 w-4" /> Publish New Piece
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Overview Metric Cards Grid */}
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                <Card className="border border-border/60 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6 sm:pb-2">
                        <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">
                            Est. Total Reads
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <Eye className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
                            {estimatedReads.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-emerald-500" /> Community readership
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-border/60 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6 sm:pb-2">
                        <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">
                            Total Likes
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-pink-500/10 text-pink-600 dark:text-pink-400">
                            <Heart className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
                            {totalLikes.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Positive reader endorsements
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-border/60 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6 sm:pb-2">
                        <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">
                            Discussion Comments
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                            <MessageCircle className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
                            {totalComments.toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Conversations sparked
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-border/60 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6 sm:pb-2">
                        <CardTitle className="text-xs sm:text-sm font-semibold text-muted-foreground">
                            Engagement Rate
                        </CardTitle>
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                            <Sparkles className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
                            {engagementScore}%
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Interactions per 100 reads
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Performance Breakdown Columns */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Category Distribution Card */}
                <Card className="border border-border/60 shadow-sm lg:col-span-1">
                    <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4 border-b border-border/40">
                        <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                            <Layers className="h-4 w-4 text-primary" /> Category Distribution
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Breakdown of topics you publish in
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-4">
                        {Object.keys(categoryMap).length > 0 ? (
                            Object.entries(categoryMap).map(([category, count]) => {
                                const percentage = totalArticles > 0 ? Math.round((count / totalArticles) * 100) : 0;
                                return (
                                    <div key={category} className="space-y-1.5">
                                        <div className="flex justify-between text-xs font-medium">
                                            <span className="text-foreground">{category}</span>
                                            <span className="text-muted-foreground">{count} ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
                                            <div 
                                                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-500" 
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-xs text-muted-foreground text-center py-6">
                                Publish articles to see topic distribution analytics.
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Top Performing Articles Card */}
                <Card className="border border-border/60 shadow-sm lg:col-span-2 overflow-hidden">
                    <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4 border-b border-border/40 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-emerald-500" /> Top Performing Stories
                            </CardTitle>
                            <CardDescription className="text-xs">
                                Articles ranked by likes and reader comments
                            </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs">
                            {sortedArticles.length} Total
                        </Badge>
                    </CardHeader>
                    <CardContent className="p-0">
                        {sortedArticles.length > 0 ? (
                            <div className="w-full overflow-x-auto">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-muted/30 text-muted-foreground border-b border-border/40">
                                        <tr>
                                            <th className="p-3 pl-4 sm:pl-6 font-semibold">Article</th>
                                            <th className="p-3 text-center font-semibold">Likes</th>
                                            <th className="p-3 text-center font-semibold">Comments</th>
                                            <th className="p-3 pr-4 sm:pr-6 text-right font-semibold">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40">
                                        {sortedArticles.slice(0, 5).map((art, idx) => (
                                            <tr key={art.id} className="hover:bg-muted/10 transition-colors">
                                                <td className="p-3 pl-4 sm:pl-6 font-medium text-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-muted-foreground font-bold w-4 text-center">
                                                            {idx + 1}
                                                        </span>
                                                        <div className="truncate max-w-[140px] sm:max-w-xs" title={art.title}>
                                                            {art.title}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-3 text-center text-pink-500 font-semibold">
                                                    {art.likes.length}
                                                </td>
                                                <td className="p-3 text-center text-indigo-500 font-semibold">
                                                    {art.comments.length}
                                                </td>
                                                <td className="p-3 pr-4 sm:pr-6 text-right">
                                                    <Link href={`/articles/${art.id}`}>
                                                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs gap-1">
                                                            <span>Read</span>
                                                            <ArrowUpRight className="h-3 w-3" />
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-8 text-center text-xs text-muted-foreground">
                                No articles to rank yet.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Author Insights Callout */}
            <Card className="border border-border/80 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-transparent p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Optimization Insights
                        </h3>
                        <p className="text-xs text-muted-foreground max-w-xl leading-relaxed">
                            Articles with an average reading time between 4 and 8 minutes receive 40% more comments and reactions. Continue pairing clear technical step-by-steps with clean code snippets!
                        </p>
                    </div>
                    <Link href="/dashboard/articles/create" className="shrink-0 w-full sm:w-auto">
                        <Button size="sm" className="w-full sm:w-auto rounded-full text-xs">
                            Create New Post
                        </Button>
                    </Link>
                </div>
            </Card>
        </main>
    );
}
