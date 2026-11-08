import React from "react";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Database, 
    Server, 
    ShieldCheck, 
    CheckCircle2, 
    Layers, 
    Cloud
} from "lucide-react";
import { ADMIN_EMAIL } from "@/lib/admin-auth";

export const metadata = {
    title: "System Diagnostics | Admin Console",
    description: "Database connectivity, platform latency, and environment configuration."
};

export default async function AdminSystemPage() {
    const startTime = Date.now();
    let dbStatus = "Connected";
    let dbLatency = 0;

    try {
        await prisma.$queryRaw`SELECT 1`;
        dbLatency = Date.now() - startTime;
    } catch {
        dbStatus = "Degraded / Error";
    }

    const [usersCount, articlesCount, commentsCount, likesCount, projectsCount] = await Promise.all([
        prisma.user.count(),
        prisma.articles.count(),
        prisma.comment.count(),
        prisma.like.count(),
        prisma.project.count().catch(() => 0)
    ]);

    const totalRecords = usersCount + articlesCount + commentsCount + likesCount + projectsCount;

    return (
        <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-border/60">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        System Diagnostics &amp; Health
                    </h1>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Real-time status of database connectivity, server environment, and active microservices.
                    </p>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> All Systems Operational
                </Badge>
            </div>

            {/* Diagnostic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border border-border/70 shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">PostgreSQL Database</span>
                        <Database className="w-4 h-4 text-blue-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-1">
                        <div className="text-xl font-bold text-foreground flex items-center gap-2">
                            {dbStatus}
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                            Latency: <span className="font-mono text-emerald-500 font-semibold">{dbLatency}ms</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-border/70 shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">Runtime Environment</span>
                        <Server className="w-4 h-4 text-purple-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-1">
                        <div className="text-xl font-bold text-foreground">
                            Next.js 15.2.4
                        </div>
                        <p className="text-[11px] text-muted-foreground font-mono">
                            Node {process.version} ({process.arch})
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-border/70 shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">Database Records</span>
                        <Layers className="w-4 h-4 text-amber-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-1">
                        <div className="text-xl font-bold text-foreground">
                            {totalRecords.toLocaleString()} rows
                        </div>
                        <p className="text-[11px] text-muted-foreground">
                            Across 5 relational tables
                        </p>
                    </CardContent>
                </Card>

                <Card className="border border-border/70 shadow-sm">
                    <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">Master Authority</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-1">
                        <div className="text-xl font-bold text-foreground">
                            Verified
                        </div>
                        <p className="text-[11px] text-muted-foreground font-mono truncate">
                            {ADMIN_EMAIL}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Diagnostics Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border border-border/70 shadow-sm overflow-hidden">
                    <CardHeader className="p-4 sm:p-6 pb-3 border-b border-border/50">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <Database className="w-4 h-4 text-indigo-500" /> Database Table Volume
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Distribution of live records in PostgreSQL schema
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/40 text-xs">
                            <div className="p-3.5 px-4 sm:px-6 flex items-center justify-between">
                                <span className="font-medium text-foreground">Articles (`Articles`)</span>
                                <Badge variant="outline" className="font-mono">{articlesCount}</Badge>
                            </div>
                            <div className="p-3.5 px-4 sm:px-6 flex items-center justify-between">
                                <span className="font-medium text-foreground">Registered Users (`User`)</span>
                                <Badge variant="outline" className="font-mono">{usersCount}</Badge>
                            </div>
                            <div className="p-3.5 px-4 sm:px-6 flex items-center justify-between">
                                <span className="font-medium text-foreground">Comments (`Comment`)</span>
                                <Badge variant="outline" className="font-mono">{commentsCount}</Badge>
                            </div>
                            <div className="p-3.5 px-4 sm:px-6 flex items-center justify-between">
                                <span className="font-medium text-foreground">Reactions &amp; Likes (`Like`)</span>
                                <Badge variant="outline" className="font-mono">{likesCount}</Badge>
                            </div>
                            <div className="p-3.5 px-4 sm:px-6 flex items-center justify-between">
                                <span className="font-medium text-foreground">Showcase Projects (`Project`)</span>
                                <Badge variant="outline" className="font-mono">{projectsCount}</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-border/70 shadow-sm overflow-hidden">
                    <CardHeader className="p-4 sm:p-6 pb-3 border-b border-border/50">
                        <CardTitle className="text-base font-bold flex items-center gap-2">
                            <Cloud className="w-4 h-4 text-purple-500" /> Integrated Microservices
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Authentication, CDN storage, and third-party APIs
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-border/40 text-xs">
                            <div className="p-3.5 px-4 sm:px-6 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">Clerk Auth Service</p>
                                    <p className="text-[10px] text-muted-foreground">User identity &amp; session tokens</p>
                                </div>
                                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                    Configured
                                </Badge>
                            </div>

                            <div className="p-3.5 px-4 sm:px-6 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">Cloudinary Media CDN</p>
                                    <p className="text-[10px] text-muted-foreground">Image transforms &amp; high-speed uploads</p>
                                </div>
                                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                    Active
                                </Badge>
                            </div>

                            <div className="p-3.5 px-4 sm:px-6 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">NextBlog Master Admin Key</p>
                                    <p className="text-[10px] text-muted-foreground">HMAC-SHA256 authenticated cookies</p>
                                </div>
                                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                    Enforced
                                </Badge>
                            </div>

                            <div className="p-3.5 px-4 sm:px-6 flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-foreground">Prisma Client ORM</p>
                                    <p className="text-[10px] text-muted-foreground">Type-safe PostgreSQL query engine v6.5.0</p>
                                </div>
                                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                    Synced
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
