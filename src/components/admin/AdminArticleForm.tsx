"use client";

import React, { FormEvent, startTransition, useActionState, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { 
    adminCreateArticleAction, 
    adminEditArticleAction, 
    AdminArticleActionState 
} from "@/actions/admin-articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export type AdminAuthorOption = {
    id: string;
    name: string | null;
    email: string;
};

export type AdminArticleFormProps = {
    mode: "create" | "edit";
    articleId?: string;
    initialData?: {
        title: string;
        category: string;
        content: string;
        authorId: string;
        featuredImage: string;
    };
    authors: AdminAuthorOption[];
};

export default function AdminArticleForm({
    mode,
    articleId,
    initialData,
    authors
}: AdminArticleFormProps) {
    const [content, setContent] = useState(initialData?.content || "");
    const [customImageUrl, setCustomImageUrl] = useState(initialData?.featuredImage || "");

    const actionHandler = mode === "edit" && articleId
        ? adminEditArticleAction.bind(null, articleId)
        : adminCreateArticleAction;

    const [formState, action, isPending] = useActionState<AdminArticleActionState, FormData>(
        actionHandler,
        {}
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("content", content);
        formData.append("customImageUrl", customImageUrl);

        startTransition(() => {
            action(formData);
        });
    };

    return (
        <div className="w-full min-w-0 max-w-4xl mx-auto space-y-4">
            <Link
                href="/admin/articles"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles List
            </Link>

            <Card className="border border-border/80 shadow-md">
                <CardHeader className="border-b border-border/50 pb-4">
                    <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                        {mode === "create" ? (
                            <>
                                <Sparkles className="w-5 h-5 text-indigo-500" /> Create Article as Admin
                            </>
                        ) : (
                            "Edit Article"
                        )}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        {mode === "create"
                            ? "Publish new content on behalf of any author or master administrator."
                            : "Modify article title, category, author attribution, and rich content."}
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-6">
                    {formState.errors?.formErrors && (
                        <div className="mb-6 p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs">
                            {formState.errors.formErrors.join(", ")}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-xs font-semibold">
                                Article Title <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                defaultValue={initialData?.title || ""}
                                placeholder="e.g. Modern Full-Stack Architecture in 2026"
                                required
                                className="h-10 text-sm"
                            />
                            {formState.errors?.title && (
                                <p className="text-xs text-destructive">{formState.errors.title[0]}</p>
                            )}
                        </div>

                        {/* Category & Author Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-xs font-semibold">
                                    Category <span className="text-destructive">*</span>
                                </Label>
                                <select
                                    id="category"
                                    name="category"
                                    defaultValue={initialData?.category || "technology"}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="technology">Technology</option>
                                    <option value="programming">Programming</option>
                                    <option value="web-development">Web Development</option>
                                    <option value="devops">DevOps & Cloud</option>
                                    <option value="artificial-intelligence">Artificial Intelligence</option>
                                    <option value="design">UI/UX Design</option>
                                </select>
                                {formState.errors?.category && (
                                    <p className="text-xs text-destructive">{formState.errors.category[0]}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="authorId" className="text-xs font-semibold">
                                    Author Attribution <span className="text-destructive">*</span>
                                </Label>
                                <select
                                    id="authorId"
                                    name="authorId"
                                    defaultValue={initialData?.authorId || (authors[0]?.id || "")}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    {authors.map((auth) => (
                                        <option key={auth.id} value={auth.id}>
                                            {auth.name || "Unnamed"} ({auth.email})
                                        </option>
                                    ))}
                                </select>
                                {formState.errors?.authorId && (
                                    <p className="text-xs text-destructive">{formState.errors.authorId[0]}</p>
                                )}
                            </div>
                        </div>

                        {/* Featured Image - File or URL */}
                        <div className="space-y-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                            <Label className="text-xs font-semibold flex items-center gap-1.5">
                                <ImageIcon className="w-4 h-4 text-indigo-500" /> Featured Image
                            </Label>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <span className="text-[11px] text-muted-foreground">Upload from device:</span>
                                    <Input
                                        id="featuredImage"
                                        name="featuredImage"
                                        type="file"
                                        accept="image/*"
                                        className="h-10 text-xs cursor-pointer"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <span className="text-[11px] text-muted-foreground">Or Direct Image URL:</span>
                                    <Input
                                        value={customImageUrl}
                                        onChange={(e) => setCustomImageUrl(e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="h-10 text-xs font-mono"
                                    />
                                </div>
                            </div>

                            {customImageUrl && (
                                <div className="mt-2 flex items-center gap-3">
                                    <div className="relative w-24 h-14 rounded-lg overflow-hidden border border-border">
                                        <Image
                                            src={customImageUrl}
                                            alt="Preview"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        Current cover preview
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Quill Rich Text Editor */}
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold">
                                Article Content <span className="text-destructive">*</span>
                            </Label>
                            <div className="rounded-md border border-input overflow-hidden min-h-[260px]">
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    placeholder="Write rich article content here..."
                                />
                            </div>
                            {formState.errors?.content && (
                                <p className="text-xs text-destructive">{formState.errors.content[0]}</p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/50">
                            <Link href="/admin/articles">
                                <Button type="button" variant="outline" className="h-10 rounded-xl text-xs sm:text-sm">
                                    Cancel
                                </Button>
                            </Link>

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="h-10 rounded-xl text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white min-w-[140px]"
                            >
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                                    </span>
                                ) : mode === "create" ? (
                                    "Publish Article"
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
