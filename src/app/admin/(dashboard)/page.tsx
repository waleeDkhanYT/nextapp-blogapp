import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
    FileText, 
    Users, 
    MessageSquare, 
    Heart, 
    FolderGit2, 
    PlusCircle, 
    ArrowUpRight, 
    CheckCircle2
} from "lucide-react";

export const metadata = {
    title: "Admin Overview | Next Blog App",
    description: "System overview, high-level metrics, and immediate actions."
};

export default async function AdminOverviewPage() {
    // Run aggregated counts in parallel
    const [
        totalArticles,
        totalUsers,
        totalComments,
        totalLikes,
        totalProjects,
        recentArticles,
        recentComments,
        recentUsers
    ] = await Promise.all([
        prisma.articles.count(),
        prisma.user.count(),
        prisma.comment.count(),
        prisma.like.count(),
        prisma.project.count().catch(() => 0),
        prisma.articles.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: {
                author: { select: { name: true, imageUrl: true } },
                _count: { select: { comments: true, likes: true } }
            }
        }),
        prisma.comment.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: {
                author: { select: { name: true, imageUrl: true, email: true } },
                article: { select: { id: true, title: true } }
            }
        }),
        prisma.user.findMany({
            take: 5,
            orderBy: { id: "desc" },
            include: {
                _count: { select: { articles: true, comments: true } }
            }
        })
    ]);

    const metrics = [
        {
            title: "Total Articles",
            value: totalArticles.toLocaleString(),
            icon: FileText,
            color: "text-blue-500 bg-blue-500/10",
            href: "/admin/articles",
            sub: "Published content"
        },
        {
            title: "Registered Users",
            value: totalUsers.toLocaleString(),
            icon: Users,
            color: "text-purple-500 bg-purple-500/10",
            href: "/admin/users",
            sub: "Platform authors & readers"
        },
        {
            title: "Total Comments",
            value: totalComments.toLocaleString(),
            icon: MessageSquare,
            color: "text-emerald-500 bg-emerald-500/10",
            href: "/admin/comments",
            sub: "Community discussions"
        },
        {
            title: "Community Likes",
            value: totalLikes.toLocaleString(),
            icon: Heart,
            color: "text-pink-500 bg-pink-500/10",
            href: "/admin/likes",
            sub: "Audience appreciation"
        },
        {
            title: "Portfolio Projects",
            value: totalProjects.toLocaleString(),
            icon: FolderGit2,
            color: "text-amber-500 bg-amber-500/10",
            href: "/admin/projects",
            sub: "Showcase items"
        }
    ];

    return (
        <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-8">
            {/* Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border/60">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                            Administrative Console
                        </h1>
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3 mr-1" /> System Online
                        </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Full administrative access and real-time oversight of the NextBlog platform.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <Link href="/admin/articles/create">
                        <Button className="gap-2 rounded-xl text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                            <PlusCircle className="w-4 h-4" /> New Article
                        </Button>
                    </Link>
                    <Link href="/admin/users">
                        <Button variant="outline" className="gap-2 rounded-xl text-xs sm:text-sm">
                            <Users className="w-4 h-4" /> Manage Users
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3.5 sm:gap-4">
                {metrics.map((m) => {
                    const Icon = m.icon;
                    return (
                        <Link key={m.title} href={m.href} className="group">
                            <Card className="border border-border/70 shadow-sm hover:shadow-md hover:border-indigo-500/40 transition-all h-full">
                                <CardHeader className="flex flex-row items-center justify-between p-3.5 sm:p-4 pb-2">
                                    <span className="text-xs font-semibold text-muted-foreground truncate">
                                        {m.title}
                                    </span>
                                    <div className={`p-2 rounded-xl ${m.color} group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-3.5 sm:p-4 pt-0">
                                    <div className="text-xl sm:text-2xl font-black text-foreground">
                                        {m.value}
                                    </div>
                                    <p className="text-[11px] text-muted-foreground truncate mt-0.5">
                                        {m.sub}
                                    </p>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            {/* Two Column Grid: Recent Articles & Comments */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Articles (2 cols) */}
                <Card className="lg:col-span-2 border border-border/70 shadow-sm overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6 pb-3 border-b border-border/50">
                        <div>
                            <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                                <FileText className="w-4 h-4 text-indigo-500" /> Recent Articles
                            </CardTitle>
                            <CardDescription className="text-xs">
                                Latest stories published by community authors
                            </CardDescription>
                        </div>
                        <Link href="/admin/articles">
                            <Button variant="ghost" size="sm" className="text-xs gap-1">
                                View All <ArrowUpRight className="w-3.5 h-3.5" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-0">
                        {recentArticles.length > 0 ? (
                            <div className="w-full overflow-x-auto">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-muted/30 text-muted-foreground border-b border-border/40 font-semibold">
                                        <tr>
                                            <th className="p-3 pl-4 sm:pl-6">Article</th>
                                            <th className="p-3">Author</th>
                                            <th className="p-3 text-center">Engagement</th>
                                            <th className="p-3 pr-4 sm:pr-6 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40">
                                        {recentArticles.map((art) => (
                                            <tr key={art.id} className="hover:bg-muted/10 transition-colors">
                                                <td className="p-3 pl-4 sm:pl-6 font-medium text-foreground">
                                                    <div className="truncate max-w-[160px] sm:max-w-xs" title={art.title}>
                                                        {art.title}
                                                    </div>
                                                    <span className="text-[10px] text-muted-foreground capitalize">
                                                        {art.category} &bull; {new Date(art.createdAt).toLocaleDateString()}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="w-5 h-5">
                                                            <AvatarImage src={art.author.imageUrl || undefined} />
                                                            <AvatarFallback>{art.author.name?.charAt(0) || "A"}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="truncate max-w-[100px] text-foreground">
                                                            {art.author.name || "Author"}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-3 text-center text-muted-foreground">
                                                    <span className="inline-flex items-center gap-1.5">
                                                        <Heart className="w-3 h-3 text-pink-500" /> {art._count.likes}
                                                        <MessageSquare className="w-3 h-3 text-indigo-500 ml-1" /> {art._count.comments}
                                                    </span>
                                                </td>
                                                <td className="p-3 pr-4 sm:pr-6 text-right">
                                                    <Link href={`/admin/articles/${art.id}/edit`}>
                                                        <Button variant="outline" size="sm" className="h-7 text-[11px] px-2.5">
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-6 text-center text-xs text-muted-foreground">
                                No articles in database.
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Recent Users List (1 col) */}
                <Card className="border border-border/70 shadow-sm overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6 pb-3 border-b border-border/50">
                        <div>
                            <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                                <Users className="w-4 h-4 text-purple-500" /> Platform Users
                            </CardTitle>
                            <CardDescription className="text-xs">
                                Registered accounts &amp; roles
                            </CardDescription>
                        </div>
                        <Link href="/admin/users">
                            <Button variant="ghost" size="sm" className="text-xs gap-1">
                                All <ArrowUpRight className="w-3.5 h-3.5" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 divide-y divide-border/40">
                        {recentUsers.map((u) => (
                            <div key={u.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src={u.imageUrl || undefined} />
                                        <AvatarFallback>{u.name?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <p className="text-xs font-bold text-foreground truncate">
                                            {u.name || "User"}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground truncate">
                                            {u.email}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="outline" className="text-[10px] capitalize shrink-0">
                                    {u.role || "Member"}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Recent Comments Feed */}
            <Card className="border border-border/70 shadow-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6 pb-3 border-b border-border/50">
                    <div>
                        <CardTitle className="text-base sm:text-lg font-bold flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-emerald-500" /> Community Discussion Stream
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Latest comments posted across all published stories
                        </CardDescription>
                    </div>
                    <Link href="/admin/comments">
                        <Button variant="ghost" size="sm" className="text-xs gap-1">
                            Moderate Comments <ArrowUpRight className="w-3.5 h-3.5" />
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 divide-y divide-border/40">
                    {recentComments.length > 0 ? (
                        recentComments.map((comment) => (
                            <div key={comment.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="space-y-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-5 h-5">
                                            <AvatarImage src={comment.author.imageUrl || undefined} />
                                            <AvatarFallback>{comment.author.name?.charAt(0) || "C"}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs font-bold text-foreground">
                                            {comment.author.name || comment.author.email}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground">on</span>
                                        <Link 
                                            href={`/articles/${comment.article.id}`} 
                                            target="_blank"
                                            className="text-xs font-medium text-indigo-500 hover:underline truncate max-w-[200px]"
                                        >
                                            {comment.article.title}
                                        </Link>
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-1 italic">
                                        &ldquo;{comment.body}&rdquo;
                                    </p>
                                </div>
                                <div className="text-[10px] text-muted-foreground sm:text-right shrink-0">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs text-muted-foreground text-center py-4">
                            No comments posted yet.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
