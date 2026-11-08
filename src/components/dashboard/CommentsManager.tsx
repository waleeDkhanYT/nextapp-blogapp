"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ExternalLink, Loader2, Clock } from "lucide-react";
import { deleteComment } from "@/actions/delete-comment";

export type DashboardCommentItem = {
    id: string;
    body: string;
    createdAt: Date;
    articleId: string;
    article: {
        id: string;
        title: string;
    };
    author: {
        name: string;
        email: string;
        imageUrl: string | null;
    };
};

export default function CommentsManager({ comments }: { comments: DashboardCommentItem[] }) {
    return (
        <div className="space-y-4">
            {comments.map((comment) => (
                <CommentRow key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

function CommentRow({ comment }: { comment: DashboardCommentItem }) {
    const [isPending, startTransition] = useTransition();
    const initial = comment.author?.name ? comment.author.name.charAt(0).toUpperCase() : "U";

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this comment?")) {
            startTransition(async () => {
                await deleteComment(comment.id);
            });
        }
    };

    return (
        <Card className="border border-border/60 overflow-hidden shadow-sm hover:border-primary/40 transition-colors">
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start justify-between gap-4">
                <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                    <Avatar className="h-10 w-10 shrink-0 ring-2 ring-primary/10">
                        <AvatarImage src={comment.author?.imageUrl || undefined} alt={comment.author?.name || "Commenter"} />
                        <AvatarFallback className="font-bold text-xs bg-primary/10 text-primary">
                            {initial}
                        </AvatarFallback>
                    </Avatar>

                    <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-sm text-foreground truncate">
                                {comment.author?.name || "Community Member"}
                            </span>
                            <span className="text-xs text-muted-foreground truncate hidden sm:inline">
                                ({comment.author?.email})
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(comment.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                        </div>

                        {/* Article attribution pill */}
                        <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-muted-foreground">On article:</span>
                            <Link 
                                href={`/articles/${comment.articleId}`}
                                className="font-medium text-primary hover:underline truncate max-w-[200px] sm:max-w-md inline-block"
                            >
                                {comment.article.title}
                            </Link>
                        </div>

                        {/* Comment text */}
                        <p className="text-sm text-foreground/90 leading-relaxed pt-1 break-words">
                            {comment.body}
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto justify-end">
                    <Link href={`/articles/${comment.articleId}`}>
                        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs rounded-lg">
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span>View</span>
                        </Button>
                    </Link>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleDelete}
                        disabled={isPending}
                        className="h-8 gap-1.5 text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-lg"
                        aria-label="Delete comment"
                    >
                        {isPending ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                        )}
                        <span>Delete</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
