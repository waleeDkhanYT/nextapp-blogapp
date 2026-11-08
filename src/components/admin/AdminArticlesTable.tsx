"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
    Search, 
    Trash2, 
    Edit, 
    ExternalLink, 
    Heart, 
    MessageSquare, 
    Loader2, 
    AlertTriangle,
    PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { adminDeleteArticleAction } from "@/actions/admin-articles";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export type AdminArticleItem = {
    id: string;
    title: string;
    category: string;
    featuredImage: string;
    createdAt: Date;
    author: {
        id: string;
        name: string | null;
        email: string;
        imageUrl: string | null;
    };
    _count: {
        comments: number;
        likes: number;
    };
};

export default function AdminArticlesTable({
    articles: initialArticles,
    categories
}: {
    articles: AdminArticleItem[];
    categories: string[];
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [articles, setArticles] = useState(initialArticles);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const filtered = articles.filter((art) => {
        const matchesSearch = 
            art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (art.author.name && art.author.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            art.author.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || art.category.toLowerCase() === selectedCategory.toLowerCase();
        return matchesSearch && matchesCategory;
    });

    const handleDeleteConfirm = () => {
        if (!deleteId) return;
        startTransition(async () => {
            try {
                await adminDeleteArticleAction(deleteId);
                setArticles((prev) => prev.filter((a) => a.id !== deleteId));
                setDeleteId(null);
            } catch (err) {
                alert("Failed to delete article: " + String(err));
            }
        });
    };

    return (
        <div className="space-y-4">
            {/* Filter and Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-2">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by title, author, email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 h-10 rounded-xl text-xs sm:text-sm"
                        />
                    </div>

                    <div className="relative w-40">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((c) => (
                                <option key={c} value={c} className="capitalize">
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <Link href="/admin/articles/create">
                    <Button className="w-full sm:w-auto gap-2 rounded-xl text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                        <PlusCircle className="h-4 w-4" /> Create Article
                    </Button>
                </Link>
            </div>

            {/* Articles Table */}
            <div className="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-sm">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-muted/40 text-muted-foreground border-b border-border/50 font-semibold uppercase tracking-wider text-[11px]">
                            <tr>
                                <th className="p-3.5 pl-4 sm:pl-6">Article</th>
                                <th className="p-3.5">Author</th>
                                <th className="p-3.5">Category</th>
                                <th className="p-3.5 text-center">Reactions</th>
                                <th className="p-3.5">Date</th>
                                <th className="p-3.5 pr-4 sm:pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {filtered.length > 0 ? (
                                filtered.map((art) => (
                                    <tr key={art.id} className="hover:bg-muted/15 transition-colors">
                                        <td className="p-3.5 pl-4 sm:pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-border shrink-0 bg-muted">
                                                    {art.featuredImage ? (
                                                        <Image
                                                            src={art.featuredImage}
                                                            alt={art.title}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">
                                                            No img
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="min-w-0 max-w-[180px] sm:max-w-xs md:max-w-sm">
                                                    <p className="font-bold text-foreground truncate" title={art.title}>
                                                        {art.title}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground font-mono truncate">
                                                        ID: {art.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-3.5">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="w-6 h-6">
                                                    <AvatarImage src={art.author.imageUrl || undefined} />
                                                    <AvatarFallback>{art.author.name?.charAt(0) || "A"}</AvatarFallback>
                                                </Avatar>
                                                <div className="min-w-0">
                                                    <p className="font-medium text-foreground truncate max-w-[120px]">
                                                        {art.author.name || "Author"}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                                                        {art.author.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-3.5">
                                            <Badge variant="outline" className="capitalize text-[10px]">
                                                {art.category}
                                            </Badge>
                                        </td>

                                        <td className="p-3.5 text-center">
                                            <span className="inline-flex items-center gap-2 text-muted-foreground">
                                                <span className="inline-flex items-center gap-0.5 text-pink-500 font-medium">
                                                    <Heart className="w-3 h-3" /> {art._count.likes}
                                                </span>
                                                <span className="inline-flex items-center gap-0.5 text-indigo-500 font-medium">
                                                    <MessageSquare className="w-3 h-3" /> {art._count.comments}
                                                </span>
                                            </span>
                                        </td>

                                        <td className="p-3.5 text-muted-foreground text-[11px] whitespace-nowrap">
                                            {new Date(art.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="p-3.5 pr-4 sm:pr-6 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Link href={`/articles/${art.id}`} target="_blank">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" title="View Article">
                                                        <ExternalLink className="h-3.5 w-3.5" />
                                                    </Button>
                                                </Link>

                                                <Link href={`/admin/articles/${art.id}/edit`}>
                                                    <Button variant="outline" size="icon" className="h-8 w-8 text-indigo-600 hover:text-indigo-700" title="Edit Article">
                                                        <Edit className="h-3.5 w-3.5" />
                                                    </Button>
                                                </Link>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteId(art.id)}
                                                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                    title="Delete Article"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-xs text-muted-foreground">
                                        No articles found matching criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal Dialog */}
            <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="w-5 h-5" /> Permanently Delete Article?
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm">
                            This action will completely delete this article and all associated comments and likes from the database. This action cannot be undone.
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
