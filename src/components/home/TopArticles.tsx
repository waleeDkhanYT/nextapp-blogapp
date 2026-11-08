import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { Clock, MessageCircle, ArrowUpRight, Sparkles, PenTool } from "lucide-react";

type TopArticleItem = Prisma.ArticlesGetPayload<{
    include: {
        comments: true;
        author: {
            select: {
                name: true;
                email: true;
                imageUrl: true;
            };
        };
    };
}>;

const TopArticles = async () => {
    let articles: TopArticleItem[] = [];

    try {
        articles = await prisma.articles.findMany({
            take: 3,
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
    } catch {
        // Fallback silently if DB is unreachable
    }

    if (!articles || articles.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-border/80 bg-muted/20 p-12 text-center max-w-xl mx-auto space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">No articles published yet</h3>
                <p className="text-sm text-muted-foreground">
                    Be the pioneer who publishes the very first technical article on Next Blog!
                </p>
                <Link href="/dashboard/articles/create">
                    <Button className="rounded-full px-6 gap-2">
                        <PenTool className="h-4 w-4" /> Create Article
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((item) => {
                const authorInitial = item.author?.name ? item.author.name.charAt(0).toUpperCase() : "U";
                
                // Dynamic reading time calculation (approx 200 words per minute)
                const plainText = item.content ? item.content.replace(/<[^>]*>/g, "") : "";
                const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;
                const readingTime = Math.max(1, Math.ceil(wordCount / 200));

                return (
                    <Card 
                        key={item.id} 
                        className="group flex flex-col justify-between overflow-hidden border border-border/60 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1.5 hover:border-primary/40"
                    >
                        <Link href={`/articles/${item.id}`} className="block flex-1 p-6 space-y-4">
                            {/* Image with Category Pill Overlay */}
                            <div className="relative h-48 w-full overflow-hidden rounded-xl border border-border/40 bg-muted/30">
                                <Image
                                    src={item.featuredImage}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-3 left-3">
                                    <Badge className="bg-background/90 text-foreground backdrop-blur-md border border-border/50 text-xs font-semibold shadow-sm">
                                        {item.category || "General"}
                                    </Badge>
                                </div>
                            </div>

                            {/* Author Row */}
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                                    <AvatarImage src={item.author?.imageUrl || undefined} alt={item.author?.name || "Author"} />
                                    <AvatarFallback className="font-bold text-xs bg-primary/10 text-primary">
                                        {authorInitial}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="truncate">
                                    <span className="font-semibold text-foreground block truncate">
                                        {item.author?.name || "NextBlog Contributor"}
                                    </span>
                                </div>
                            </div>

                            {/* Title with hover arrow */}
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors flex items-start justify-between gap-2">
                                    <span className="line-clamp-2">{item.title}</span>
                                    <ArrowUpRight className="h-5 w-5 shrink-0 opacity-0 -translate-x-2 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-primary" />
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                    {plainText || "Click to explore this in-depth article, join the conversation, and discover key technical takeaways."}
                                </p>
                            </div>

                            {/* Meta Info: Date, Reading time, Comments */}
                            <div className="flex items-center justify-between border-t border-border/50 pt-4 text-xs text-muted-foreground">
                                <span>{new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5 text-primary" /> {readingTime} min read
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageCircle className="h-3.5 w-3.5" /> {item.comments?.length || 0}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </Card>
                );
            })}
        </div>
    );
};

export default TopArticles;
