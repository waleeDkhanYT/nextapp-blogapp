import React from "react";
import Navbar from "@/components/home/header/Navbar";
import { BlogFooter } from "@/components/home/BlogFooter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Users, PenTool, FileText, ArrowRight, MessageSquare, Sparkles } from "lucide-react";

export const metadata = {
    title: "Authors & Contributors | Next Blog",
    description: "Meet the engineers, writers, and thinkers publishing on Next Blog."
};

export default async function AuthorsPage() {
    let authors: Array<{
        id: string;
        name: string;
        email: string;
        imageUrl: string | null;
        role: string | null;
        _count: {
            articles: number;
            comments: number;
        };
    }> = [];

    try {
        authors = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                imageUrl: true,
                role: true,
                _count: {
                    select: {
                        articles: true,
                        comments: true
                    }
                }
            },
            orderBy: {
                articles: {
                    _count: "desc"
                }
            }
        });
    } catch {
        // Fallback silently if DB error
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <div className="relative overflow-hidden border-b bg-gradient-to-b from-purple-500/10 via-background to-background py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
                        <Users className="h-3.5 w-3.5" /> Community Directory
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                        Meet Our <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">Authors</span>
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Passionate engineers, architects, and storytellers sharing deep insights and hard-won knowledge.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link href="/dashboard/articles/create">
                            <Button size="lg" className="rounded-full px-8 gap-2">
                                <PenTool className="h-4 w-4" /> Become a Writer
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                {authors.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {authors.map((author) => {
                            const initial = author.name ? author.name.charAt(0).toUpperCase() : "U";
                            return (
                                <Card 
                                    key={author.id}
                                    className="group overflow-hidden border border-border/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 bg-card/60 backdrop-blur-sm"
                                >
                                    <CardHeader className="text-center pb-2">
                                        <div className="relative mx-auto mb-4">
                                            <Avatar className="h-20 w-20 ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all">
                                                <AvatarImage src={author.imageUrl || undefined} alt={author.name} />
                                                <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                                                    {initial}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <CardTitle className="text-xl font-bold text-foreground">
                                            {author.name || "Anonymous Author"}
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            {author.role || "Contributing Engineer"}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4 text-center">
                                        <div className="flex justify-center gap-6 py-2 border-y border-border/40 text-xs">
                                            <div className="space-y-0.5">
                                                <div className="font-bold text-base text-foreground flex items-center justify-center gap-1">
                                                    <FileText className="h-3.5 w-3.5 text-primary" />
                                                    {author._count.articles}
                                                </div>
                                                <div className="text-muted-foreground">Articles</div>
                                            </div>
                                            <div className="space-y-0.5">
                                                <div className="font-bold text-base text-foreground flex items-center justify-center gap-1">
                                                    <MessageSquare className="h-3.5 w-3.5 text-primary" />
                                                    {author._count.comments}
                                                </div>
                                                <div className="text-muted-foreground">Comments</div>
                                            </div>
                                        </div>

                                        <Link href={`/articles?search=${encodeURIComponent(author.name)}`} className="block">
                                            <Button variant="outline" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                <span>View Articles</span>
                                                <ArrowRight className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center max-w-md mx-auto py-16 space-y-4">
                        <div className="p-4 rounded-full bg-primary/10 text-primary w-fit mx-auto">
                            <Sparkles className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold">Be the First Author</h3>
                        <p className="text-sm text-muted-foreground">
                            Sign in and publish your first article today to be featured on our community author directory.
                        </p>
                        <Link href="/dashboard/articles/create">
                            <Button className="rounded-full px-6">Write an Article</Button>
                        </Link>
                    </div>
                )}
            </main>

            <BlogFooter />
        </div>
    );
}
