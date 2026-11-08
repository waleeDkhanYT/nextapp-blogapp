"use client";

import React, { useTransition } from "react";
import { Prisma } from "@prisma/client";
import { EditIcon, MoveRight, TrashIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { deleteArticle } from "@/actions/delete-article";

type RecentArticlesProps = {
    articles: Prisma.ArticlesGetPayload<{
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
    }>[];
};

const RecentArticles: React.FC<RecentArticlesProps> = ({ articles }) => {
    return (
        <Card className="mb-8 border border-border/60 overflow-hidden shadow-sm">
            <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4 border-b border-border/40">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg sm:text-xl font-bold">Recent Articles</CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">Your latest published writing</p>
                    </div>
                    <Link href="/dashboard/articles">
                        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1.5">
                            View All <MoveRight className="h-3.5 w-3.5" />
                        </Button>
                    </Link>
                </div>
            </CardHeader>

            {articles?.length === 0 ? (
                <CardContent className="p-8 text-center text-muted-foreground space-y-2">
                    <p className="text-sm">No articles published yet.</p>
                    <Link href="/dashboard/articles/create">
                        <Button size="sm" variant="outline" className="rounded-full text-xs">
                            Write Your First Article
                        </Button>
                    </Link>
                </CardContent>
            ) : (
                <CardContent className="p-0">
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/30">
                                    <TableHead className="w-[45%]">Title</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-center">Comments</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {articles.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-muted/20">
                                        <TableCell className="font-medium">
                                            <div className="max-w-[140px] sm:max-w-xs md:max-w-sm truncate" title={item.title}>
                                                <Link href={`/articles/${item.id}`} className="hover:text-primary transition-colors">
                                                    {item.title}
                                                </Link>
                                            </div>
                                            <span className="text-xs text-muted-foreground sm:hidden block mt-0.5">
                                                {item.category}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-medium">
                                                Published
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center text-xs font-semibold">
                                            {item.comments?.length || 0}
                                        </TableCell>
                                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                                            {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link href={`/dashboard/articles/${item.id}/edit`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-500/10" aria-label="Edit Article">
                                                        <EditIcon className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <DeleteButton articleId={item.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            )}
        </Card>
    );
};

export default RecentArticles;

type DeleteButtonProps = {
    articleId: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
    const [isPending, startTransition] = useTransition();

    return (
        <form
            action={async () => {
                startTransition(async () => {
                    await deleteArticle(articleId);
                });
            }}
        >
            <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                disabled={isPending}
                aria-label="Delete Article"
            >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrashIcon className="h-4 w-4" />}
            </Button>
        </form>
    );
};
