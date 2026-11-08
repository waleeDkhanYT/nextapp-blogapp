"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { 
    Search, 
    Trash2, 
    Edit3, 
    ExternalLink, 
    MessageSquarePlus, 
    Loader2, 
    AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
    adminDeleteCommentAction, 
    adminEditCommentAction, 
    adminCreateCommentAction 
} from "@/actions/admin-comments";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export type AdminCommentItem = {
    id: string;
    body: string;
    createdAt: Date;
    author: {
        id: string;
        name: string | null;
        email: string;
        imageUrl: string | null;
    };
    article: {
        id: string;
        title: string;
    };
};

export type AdminArticleOption = {
    id: string;
    title: string;
};

export default function AdminCommentsTable({
    comments: initialComments,
    articles
}: {
    comments: AdminCommentItem[];
    articles: AdminArticleOption[];
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [comments, setComments] = useState(initialComments);

    // Edit Modal State
    const [editComment, setEditComment] = useState<AdminCommentItem | null>(null);
    const [editBody, setEditBody] = useState("");

    // Delete Modal State
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // New Comment Modal State
    const [newCommentOpen, setNewCommentOpen] = useState(false);
    const [selectedArticleId, setSelectedArticleId] = useState(articles[0]?.id || "");
    const [newBody, setNewBody] = useState("");

    const [isPending, startTransition] = useTransition();

    const filtered = comments.filter((c) => {
        const query = searchTerm.toLowerCase();
        return (
            c.body.toLowerCase().includes(query) ||
            (c.author.name && c.author.name.toLowerCase().includes(query)) ||
            c.author.email.toLowerCase().includes(query) ||
            c.article.title.toLowerCase().includes(query)
        );
    });

    const handleEditSave = () => {
        if (!editComment) return;
        startTransition(async () => {
            const res = await adminEditCommentAction(editComment.id, editBody);
            if (res.success) {
                setComments((prev) =>
                    prev.map((c) => (c.id === editComment.id ? { ...c, body: editBody } : c))
                );
                setEditComment(null);
            } else {
                alert(res.error || "Failed to update comment");
            }
        });
    };

    const handleDeleteConfirm = () => {
        if (!deleteId) return;
        startTransition(async () => {
            const res = await adminDeleteCommentAction(deleteId);
            if (res.success) {
                setComments((prev) => prev.filter((c) => c.id !== deleteId));
                setDeleteId(null);
            } else {
                alert(res.error || "Failed to delete comment");
            }
        });
    };

    const handleCreateComment = () => {
        if (!selectedArticleId || !newBody.trim()) return;
        startTransition(async () => {
            const formData = new FormData();
            formData.append("articleId", selectedArticleId);
            formData.append("body", newBody);
            const res = await adminCreateCommentAction({}, formData);
            if (res.success) {
                setNewCommentOpen(false);
                setNewBody("");
                window.location.reload();
            } else {
                alert(res.error || "Failed to create comment");
            }
        });
    };

    return (
        <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search comments, commenters, articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 h-10 rounded-xl text-xs sm:text-sm"
                    />
                </div>

                <Button
                    onClick={() => setNewCommentOpen(true)}
                    className="gap-2 rounded-xl text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                    <MessageSquarePlus className="w-4 h-4" /> Post Admin Announcement
                </Button>
            </div>

            {/* Comments Table */}
            <div className="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-sm">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-muted/40 text-muted-foreground border-b border-border/50 font-semibold uppercase tracking-wider text-[11px]">
                            <tr>
                                <th className="p-3.5 pl-4 sm:pl-6">Commenter</th>
                                <th className="p-3.5">Article</th>
                                <th className="p-3.5">Comment Snippet</th>
                                <th className="p-3.5">Timestamp</th>
                                <th className="p-3.5 pr-4 sm:pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {filtered.length > 0 ? (
                                filtered.map((c) => (
                                    <tr key={c.id} className="hover:bg-muted/15 transition-colors">
                                        <td className="p-3.5 pl-4 sm:pl-6">
                                            <div className="flex items-center gap-2.5">
                                                <Avatar className="w-7 h-7">
                                                    <AvatarImage src={c.author.imageUrl || undefined} />
                                                    <AvatarFallback>{c.author.name?.charAt(0) || "U"}</AvatarFallback>
                                                </Avatar>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-foreground truncate max-w-[130px]">
                                                        {c.author.name || "Anonymous"}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground truncate max-w-[130px]">
                                                        {c.author.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-3.5">
                                            <Link
                                                href={`/articles/${c.article.id}`}
                                                target="_blank"
                                                className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium inline-flex items-center gap-1 truncate max-w-[160px] sm:max-w-xs"
                                                title={c.article.title}
                                            >
                                                <span className="truncate">{c.article.title}</span>
                                                <ExternalLink className="w-3 h-3 shrink-0" />
                                            </Link>
                                        </td>

                                        <td className="p-3.5">
                                            <p className="line-clamp-2 max-w-sm sm:max-w-md text-foreground/90 font-normal">
                                                {c.body}
                                            </p>
                                        </td>

                                        <td className="p-3.5 text-muted-foreground whitespace-nowrap text-[11px]">
                                            {new Date(c.createdAt).toLocaleString([], {
                                                dateStyle: "short",
                                                timeStyle: "short"
                                            })}
                                        </td>

                                        <td className="p-3.5 pr-4 sm:pr-6 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        setEditComment(c);
                                                        setEditBody(c.body);
                                                    }}
                                                    className="h-8 w-8 text-indigo-600 hover:text-indigo-700"
                                                    title="Moderate / Edit Comment"
                                                >
                                                    <Edit3 className="w-3.5 h-3.5" />
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteId(c.id)}
                                                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                    title="Delete Comment"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-xs text-muted-foreground">
                                        No comments found matching query.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit/Moderate Modal Dialog */}
            <Dialog open={!!editComment} onOpenChange={(open) => !open && setEditComment(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Edit3 className="w-4 h-4 text-indigo-500" /> Moderate Comment Content
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Edit the body of this comment to remove inappropriate language or clarify information.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 py-2">
                        <Label htmlFor="commentBody" className="text-xs font-semibold">
                            Comment Body
                        </Label>
                        <textarea
                            id="commentBody"
                            rows={4}
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                            className="w-full rounded-xl border border-input bg-background p-3 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            placeholder="Enter updated comment text..."
                        />
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setEditComment(null)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleEditSave}
                            disabled={isPending || !editBody.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-1.5">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                                </span>
                            ) : (
                                "Update Comment"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Post Admin Announcement Comment Dialog */}
            <Dialog open={newCommentOpen} onOpenChange={setNewCommentOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <MessageSquarePlus className="w-4 h-4 text-indigo-500" /> Post Official Admin Comment
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Post an official announcement or administrative clarification directly on any article.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="targetArticle" className="text-xs font-semibold">
                                Target Article
                            </Label>
                            <select
                                id="targetArticle"
                                value={selectedArticleId}
                                onChange={(e) => setSelectedArticleId(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                {articles.map((art) => (
                                    <option key={art.id} value={art.id}>
                                        {art.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="newBody" className="text-xs font-semibold">
                                Announcement Message
                            </Label>
                            <textarea
                                id="newBody"
                                rows={4}
                                value={newBody}
                                onChange={(e) => setNewBody(e.target.value)}
                                className="w-full rounded-xl border border-input bg-background p-3 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="Write the official administrative comment..."
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setNewCommentOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateComment}
                            disabled={isPending || !newBody.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-1.5">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Posting...
                                </span>
                            ) : (
                                "Post Comment"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal Dialog */}
            <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="w-5 h-5" /> Delete Comment?
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm">
                            Are you sure you want to delete this comment? This action is permanent and cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteId(null)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className="flex items-center gap-1.5">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                                </span>
                            ) : (
                                "Confirm Delete"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
