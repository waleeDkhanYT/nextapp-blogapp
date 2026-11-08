"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { Trash2, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { adminDeleteLikeAction } from "@/actions/admin-likes";

export type AdminLikeItem = {
    id: string;
    createdAt: Date;
    user: {
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

export default function AdminLikesManager({
    likes: initialLikes
}: {
    likes: AdminLikeItem[];
}) {
    const [likes, setLikes] = useState(initialLikes);
    const [search, setSearch] = useState("");
    const [isPending, startTransition] = useTransition();

    const filtered = likes.filter((l) => {
        const q = search.toLowerCase();
        return (
            (l.user.name && l.user.name.toLowerCase().includes(q)) ||
            l.user.email.toLowerCase().includes(q) ||
            l.article.title.toLowerCase().includes(q)
        );
    });

    const handleDelete = (likeId: string) => {
        if (!confirm("Are you sure you want to remove this like endorsement?")) return;
        startTransition(async () => {
            const res = await adminDeleteLikeAction(likeId);
            if (res.success) {
                setLikes((prev) => prev.filter((l) => l.id !== likeId));
            } else {
                alert("Failed to delete like");
            }
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search likes by user or article..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 h-10 rounded-xl text-xs sm:text-sm"
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-sm">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-muted/40 text-muted-foreground border-b border-border/50 font-semibold uppercase tracking-wider text-[11px]">
                            <tr>
                                <th className="p-3.5 pl-4 sm:pl-6">Reader</th>
                                <th className="p-3.5">Liked Article</th>
                                <th className="p-3.5">Recorded At</th>
                                <th className="p-3.5 pr-4 sm:pr-6 text-right">Moderation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {filtered.length > 0 ? (
                                filtered.map((l) => (
                                    <tr key={l.id} className="hover:bg-muted/15 transition-colors">
                                        <td className="p-3.5 pl-4 sm:pl-6">
                                            <div className="flex items-center gap-2.5">
                                                <Avatar className="w-6 h-6">
                                                    <AvatarImage src={l.user.imageUrl || undefined} />
                                                    <AvatarFallback>{l.user.name?.charAt(0) || "U"}</AvatarFallback>
                                                </Avatar>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-foreground truncate max-w-[140px]">
                                                        {l.user.name || "Reader"}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground truncate max-w-[140px]">
                                                        {l.user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-3.5">
                                            <Link
                                                href={`/articles/${l.article.id}`}
                                                target="_blank"
                                                className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium inline-flex items-center gap-1 truncate max-w-[200px] sm:max-w-xs"
                                            >
                                                <span className="truncate">{l.article.title}</span>
                                                <ExternalLink className="w-3 h-3 shrink-0" />
                                            </Link>
                                        </td>

                                        <td className="p-3.5 text-muted-foreground whitespace-nowrap text-[11px]">
                                            {new Date(l.createdAt).toLocaleString()}
                                        </td>

                                        <td className="p-3.5 pr-4 sm:pr-6 text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(l.id)}
                                                disabled={isPending}
                                                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                title="Remove spam like"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-xs text-muted-foreground">
                                        No likes found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
