"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import Image from "next/image";
import type { Prisma } from "@prisma/client";
import Link from "next/link";

type SearchPageProps = {
    articles: Prisma.ArticlesGetPayload<{
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    }>[];
};

const AllArticlesPage = ({ articles }: SearchPageProps) => {
    if (articles.length === 0) return <NoSearchResults />;

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <Card
                    key={article.id}
                    className="group relative overflow-hidden transition-all hover:shadow-lg"
                >
                    <Link href={`/articles/${article.id}`}>
                        <div className="p-6">
                            {/* Image Container */}
                            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                                <Image
                                    src={article.featuredImage as string}
                                    alt={article.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Article Content */}
                            <h3 className="text-xl font-semibold text-foreground">
                                {article.title}
                            </h3>
                            <p className="mt-2 text-muted-foreground">{article.category}</p>

                            {/* Author & Metadata */}
                            <div className="mt-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={article.author.imageUrl as string} />
                                        <AvatarFallback>{article.author.name}</AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm text-muted-foreground">
                                        {article.author.name}
                                    </span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {article.createdAt.toDateString()}
                                </div>
                            </div>
                        </div>
                    </Link>
                </Card>
            ))}
        </div>
    )
}

export default AllArticlesPage;

export function NoSearchResults() {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            {/* Icon */}
            <div className="mb-4 rounded-full bg-muted p-4">
                <Search className="h-8 w-8 text-muted-foreground" />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-foreground">
                No Results Found
            </h3>

            {/* Description */}
            <p className="mt-2 text-muted-foreground">
                We could not find any articles matching your search. Try a different
                keyword or phrase.
            </p>
        </div>
    );
}

export function AllArticlesPageSkeleton() {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
                <Card
                    key={index}
                    className="group relative overflow-hidden transition-all hover:shadow-lg"
                >
                    <div className="p-6">
                        {/* Article Image Skeleton */}
                        <Skeleton
                            className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20" />

                        {/* Article Title Skeleton */}
                        <Skeleton className="h-6 w-3/4 rounded-lg" />

                        {/* Article Category Skeleton */}
                        <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />

                        {/* Author & Metadata Skeleton */}
                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {/* Author Avatar Skeleton */}
                                <Skeleton className="h-8 w-8 rounded-full" />

                                {/* Author Name Skeleton */}
                                <Skeleton className="h-4 w-20 rounded-lg " />
                            </div>

                            {/* Date Skeleton */}
                            <Skeleton className="h-4 w-24 rounded-lg " />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
