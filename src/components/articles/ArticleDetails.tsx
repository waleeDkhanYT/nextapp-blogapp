import { Prisma } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LikeButton from "./LikeButton";
import { Card } from "../ui/card";
import { MessageCircle, Clock, Calendar } from "lucide-react";
import CommentList from "../comments/CommentList";
import { prisma } from "@/lib/prisma";
import CommentForm from "../comments/CommentForm";
import { auth } from "@clerk/nextjs/server";
import Navbar from "../home/header/Navbar";
import { BlogFooter } from "../home/BlogFooter";

type ArticleDetailsProps = {
    article: Prisma.ArticlesGetPayload<{
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    }>
};

const ArticleDetails: React.FC<ArticleDetailsProps> = async ({ article }) => {
    const comments = await prisma.comment.findMany({
        where: { articleId: article.id },
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        },
        orderBy: { createdAt: "desc" }
    });

    const { userId } = await auth();
    const likes = await prisma.like.findMany({ where: { articleId: article.id } });
    const user = userId
        ? await prisma.user.findUnique({ where: { clerkUserId: userId } })
        : null;

    const isLiked: boolean = user ? likes.some((like) => like.userId === user.id) : false;

    // Calculate real dynamic reading time from text content
    const rawText = article.content ? article.content.replace(/<[^>]*>/g, "") : "";
    const wordCount = rawText.trim().split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(1, Math.round(wordCount / 200));

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container mx-auto px-4 py-8 sm:py-12 lg:px-8">
                <article className="mx-auto max-w-3xl lg:max-w-4xl">
                    {/* Article Header */}
                    <header className="mb-8 sm:mb-10 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 px-3.5 py-1 text-xs font-semibold capitalize tracking-wide">
                                {article.category}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {readTime} min read
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2]">
                            {article.title}
                        </h1>

                        <div className="flex items-center justify-between flex-wrap gap-4 pt-3 border-y border-border/60 py-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-11 w-11 border border-border shadow-sm">
                                    <AvatarImage src={article.author.imageUrl || undefined} />
                                    <AvatarFallback className="font-bold">
                                        {article.author.name?.charAt(0) || "A"}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold text-sm sm:text-base text-foreground">
                                        {article.author.name || "Community Author"}
                                    </p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(article.createdAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric"
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Featured Article Image */}
                    {article.featuredImage && (
                        <div className="mb-10 sm:mb-14">
                            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-border/70 shadow-xl bg-muted/40">
                                <Image
                                    src={article.featuredImage}
                                    alt={article.title}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 960px"
                                    className="object-cover transition-transform duration-500 hover:scale-[1.01]"
                                />
                            </div>
                        </div>
                    )}

                    {/* Article Content */}
                    <section
                        className="prose prose-lg dark:prose-invert max-w-none mb-12 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Article Actions (Like & Share) */}
                    <LikeButton articleId={article.id} likes={likes} isLiked={isLiked} />

                    {/* Comments Section */}
                    <Card className="p-6 sm:p-8 border border-border/70 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-2.5 mb-8 pb-4 border-b border-border/50">
                            <MessageCircle className="h-6 w-6 text-indigo-500" />
                            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                                {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
                            </h2>
                        </div>

                        <CommentForm articleId={article.id} />
                        <CommentList comments={comments} />
                    </Card>
                </article>
            </main>

            <BlogFooter />
        </div>
    );
};

export default ArticleDetails;
