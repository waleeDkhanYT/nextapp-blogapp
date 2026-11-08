"use client";

import React, { FormEvent, startTransition, useActionState, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import "react-quill-new/dist/quill.snow.css";
import { editArticle } from "@/actions/edit-article";
import type { Articles } from "@prisma/client";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type EditArticleProps = {
  article: Articles;
};

const EditArticlePage: React.FC<EditArticleProps> = ({ article }) => {
  const [content, setContent] = useState(article.content || "");
  const [formState, action, isPending] = useActionState(
    editArticle.bind(null, article.id),
    { errors: {} }
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("content", content);

    startTransition(() => {
      action(formData);
    });
  };

  return (
    <div className="w-full min-w-0 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="border border-border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Edit Article</CardTitle>
          <p className="text-sm text-muted-foreground">
            Update your article details, category, or content.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Article Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={article.title}
                placeholder="Enter article title"
                className="w-full"
              />
              {formState.errors.title && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.title}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                name="category"
                defaultValue={article.category}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select Category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web Development</option>
              </select>
              {formState.errors.category && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.category}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured Image</Label>
              <Input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/*"
                className="cursor-pointer file:cursor-pointer"
              />
              {article.featuredImage && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="relative w-24 h-16 rounded-md overflow-hidden border border-border">
                    <Image
                      src={article.featuredImage}
                      alt="Current featured"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Current featured image will be kept unless replaced.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <div className="rounded-md border border-input overflow-hidden">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                />
              </div>
              {formState.errors.content && (
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>

            {formState.errors.formErrors && (
              <div className="dark:bg-transparent bg-red-100 p-3 rounded-md border border-red-600">
                <span className="font-medium text-sm text-red-500">
                  {formState.errors.formErrors}
                </span>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/articles">Cancel</Link>
              </Button>
              <Button disabled={isPending} type="submit">
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditArticlePage;
