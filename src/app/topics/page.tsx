import React from "react";
import Navbar from "@/components/home/header/Navbar";
import { BlogFooter } from "@/components/home/BlogFooter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { 
    Cpu, 
    Code2, 
    Globe, 
    Sparkles, 
    Shield, 
    Database, 
    Smartphone, 
    Cloud, 
    Palette, 
    Layers, 
    ArrowRight 
} from "lucide-react";

export const metadata = {
    title: "Explore Topics & Categories | Next Blog",
    description: "Browse articles, tutorials, and insights categorized by tech stack, programming languages, and industry domains."
};

const curatedTopics = [
    {
        name: "Technology",
        slug: "technology",
        description: "High-level software architecture, industry shifts, and hardware engineering innovations.",
        icon: Cpu,
        color: "from-blue-500 to-indigo-600"
    },
    {
        name: "Programming",
        slug: "programming",
        description: "Algorithms, language paradigms, clean code practices, and compiler internals.",
        icon: Code2,
        color: "from-purple-500 to-pink-600"
    },
    {
        name: "Web Development",
        slug: "web-development",
        description: "Modern JavaScript/TypeScript, Next.js, React, CSS architectures, and Core Web Vitals.",
        icon: Globe,
        color: "from-emerald-500 to-teal-600"
    },
    {
        name: "Cloud & DevOps",
        slug: "cloud",
        description: "Containerization, Kubernetes, CI/CD automated pipelines, and serverless edge functions.",
        icon: Cloud,
        color: "from-cyan-500 to-blue-600"
    },
    {
        name: "AI & Machine Learning",
        slug: "ai",
        description: "Large Language Models, vector retrieval, generative tools, and neural architectures.",
        icon: Sparkles,
        color: "from-amber-500 to-orange-600"
    },
    {
        name: "Databases & Data",
        slug: "database",
        description: "SQL, PostgreSQL, vector stores, Prisma ORM, Redis caching, and distributed storage.",
        icon: Database,
        color: "from-violet-500 to-purple-700"
    },
    {
        name: "Security & Auth",
        slug: "security",
        description: "Zero-trust architectures, authentication protocols, cryptography, and penetration testing.",
        icon: Shield,
        color: "from-rose-500 to-red-600"
    },
    {
        name: "Mobile & Cross-Platform",
        slug: "mobile",
        description: "React Native, Flutter, Swift, Kotlin, and offline-first mobile applications.",
        icon: Smartphone,
        color: "from-lime-500 to-emerald-600"
    },
    {
        name: "UI/UX & Design Systems",
        slug: "design",
        description: "Component accessibility, Radix UI primitives, design tokens, and user psychology.",
        icon: Palette,
        color: "from-fuchsia-500 to-purple-600"
    }
];

export default async function TopicsPage() {
    // Fetch live counts from Prisma
    const categoryCounts: Record<string, number> = {};
    try {
        const groups = await prisma.articles.groupBy({
            by: ['category'],
            _count: {
                category: true
            }
        });
        groups.forEach(g => {
            if (g.category) {
                categoryCounts[g.category.toLowerCase()] = g._count.category;
            }
        });
    } catch {
        // Fallback silently if DB call has issues
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <div className="relative overflow-hidden border-b bg-gradient-to-b from-purple-500/10 via-background to-background py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
                        <Layers className="h-3.5 w-3.5" /> Topic Index
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                        Explore by <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">Topic</span>
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Discover specialized knowledge organized by domain, language, framework, and engineering discipline.
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {curatedTopics.map((topic) => {
                        const Icon = topic.icon;
                        const matchCount = categoryCounts[topic.name.toLowerCase()] || 
                                           categoryCounts[topic.slug.toLowerCase()] || 0;

                        return (
                            <Card 
                                key={topic.slug} 
                                className="group flex flex-col justify-between overflow-hidden border border-border/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 bg-card/60 backdrop-blur-sm"
                            >
                                <div>
                                    <div className={`h-1.5 w-full bg-gradient-to-r ${topic.color}`} />
                                    <CardHeader className="space-y-3 pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                {matchCount > 0 ? `${matchCount} Articles` : "Curated Topic"}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                                            {topic.name}
                                        </CardTitle>
                                        <CardDescription className="text-sm leading-relaxed">
                                            {topic.description}
                                        </CardDescription>
                                    </CardHeader>
                                </div>

                                <CardContent className="pt-2">
                                    <Link href={`/articles?search=${encodeURIComponent(topic.name)}`}>
                                        <Button variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            <span>Browse {topic.name}</span>
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Search Bar Callout */}
                <div className="mt-16 text-center max-w-xl mx-auto space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">Can&apos;t find what you&apos;re looking for?</h3>
                    <p className="text-muted-foreground text-sm">
                        Use our full-text multi-criteria search to find articles across all categories and titles.
                    </p>
                    <Link href="/articles">
                        <Button size="lg" className="rounded-full px-8 gap-2">
                            Go to All Articles <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </main>

            <BlogFooter />
        </div>
    );
}
