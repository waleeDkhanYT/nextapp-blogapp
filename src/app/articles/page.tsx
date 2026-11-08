import React, { Suspense } from "react";
import ArticleSearchInput from "@/components/articles/ArticleSearchInput";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AllArticlesPage, { AllArticlesPageSkeleton } from "@/components/articles/AllArticlesPage";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";
import Navbar from "@/components/home/header/Navbar";
import { SearchPageProps } from "@/types";
import { BlogFooter } from "@/components/home/BlogFooter";

const Articles = async ({ searchParams }: SearchPageProps) => {
    const ITEMS_PER_PAGE = 3; // Number of items per page
    const params = await searchParams;
    const searchText = params.search || "";
    const currentPage = Number(params.page) || 1;
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;
    const take = ITEMS_PER_PAGE;

    const { articles, total } = await fetchArticleByQuery(searchText, skip, take);
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="mb-12 space-y-6 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        All Articles
                    </h1>
                    {/* Search Bar */}
                    <Suspense>
                        <ArticleSearchInput />
                    </Suspense>
                </div>

                {/* All article page  */}
                <Suspense fallback={<AllArticlesPageSkeleton />}>
                    <AllArticlesPage articles={articles} />
                </Suspense>

                {/* Pagination */}
                <div className="my-12 flex justify-center gap-2">
                    {/* Prev Button */}
                    <Link
                        href={`?search=${searchText}&page=${currentPage - 1}`}
                        passHref
                    >
                        <Button
                            variant="ghost" size="sm"
                            disabled={currentPage === 1}
                        >
                            ← Prev
                        </Button>
                    </Link>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <Link
                            key={index}
                            href={`?search=${searchText}&page=${index + 1}`}
                            passHref
                        >
                            <Button
                                variant={`${currentPage === index + 1 ? 'destructive' : 'ghost'}`}
                                size="sm"
                                disabled={currentPage === index + 1}
                            >
                                {index + 1}
                            </Button>
                        </Link>
                    ))}

                    {/* Next Button */}
                    <Link
                        href={`?search=${searchText}&page=${currentPage + 1}`}
                        passHref
                    >
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={currentPage === totalPages}
                        >
                            Next →
                        </Button>
                    </Link>
                </div>

                <BlogFooter />
            </main>
        </div>
    )
}

export default Articles;
