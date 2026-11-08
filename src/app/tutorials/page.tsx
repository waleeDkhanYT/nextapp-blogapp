import React from "react";
import Navbar from "@/components/home/header/Navbar";
import { BlogFooter } from "@/components/home/BlogFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
    BookOpen, 
    Code2, 
    Sparkles, 
    Clock, 
    ArrowRight, 
    CheckCircle2, 
    Flame, 
    Terminal, 
    Layers, 
    Database 
} from "lucide-react";

export const metadata = {
    title: "Tutorials & Guides | Next Blog",
    description: "Step-by-step programming tutorials, architectural guides, and full-stack development walk-throughs."
};

const tutorialsData = [
    {
        id: "nextjs-15-mastery",
        title: "Mastering Next.js 15 & React 19 Server Actions",
        category: "Web Development",
        level: "Intermediate",
        duration: "25 min",
        description: "Deep dive into async request memoization, optimistic UI updates with useActionState and useOptimistic, and zero-bundle-size server components.",
        icon: Code2,
        color: "from-purple-500 to-indigo-500",
        steps: ["Server Actions Setup", "useActionState & useOptimistic", "Cache Revalidation & Tags", "Streaming & Suspense"],
        searchQuery: "Next"
    },
    {
        id: "prisma-postgres-scaling",
        title: "Production PostgreSQL with Prisma ORM 6",
        category: "Backend & Database",
        level: "Advanced",
        duration: "35 min",
        description: "Learn robust database modeling, connection pooling with PgBouncer, complex relations, transactions, and automated migration pipelines.",
        icon: Database,
        color: "from-blue-500 to-cyan-500",
        steps: ["Schema Design & Relations", "Prisma Accelerate & Poolers", "Transactions & Indexes", "Zero-downtime Migrations"],
        searchQuery: "Programming"
    },
    {
        id: "auth-security-clerk",
        title: "Full-Stack Authentication & RBAC with Clerk",
        category: "Security & Auth",
        level: "Beginner",
        duration: "18 min",
        description: "Implement seamless user onboarding, multi-factor authentication, organization roles, and protect App Router server actions with middleware.",
        icon: Terminal,
        color: "from-emerald-500 to-teal-500",
        steps: ["Clerk Middleware Config", "User Webhooks & DB Sync", "Role-Based Access Control", "Session Management"],
        searchQuery: "Technology"
    },
    {
        id: "tailwind-v4-theming",
        title: "Design Systems with Tailwind CSS v4 & OKLCH",
        category: "Frontend & UI",
        level: "Beginner",
        duration: "15 min",
        description: "Harness CSS variables, OKLCH color palettes, dynamic dark mode transitions, and build reusable Radix UI primitives.",
        icon: Layers,
        color: "from-amber-500 to-orange-500",
        steps: ["Tailwind v4 @theme inline", "OKLCH Color Theory", "Component Primitives", "Dark/Light Synchronization"],
        searchQuery: "web-development"
    },
    {
        id: "ai-rag-pipeline",
        title: "Building Production AI & LLM Assistants",
        category: "Artificial Intelligence",
        level: "Advanced",
        duration: "40 min",
        description: "End-to-end guide to Retrieval-Augmented Generation, vector embeddings with pgvector, and streaming generative responses in Next.js.",
        icon: Sparkles,
        color: "from-rose-500 to-pink-500",
        steps: ["Vector Embeddings 101", "Hybrid Search with PostgreSQL", "Streaming Responses", "Prompt Engineering"],
        searchQuery: "technology"
    },
    {
        id: "cloudinary-media-pipeline",
        title: "High-Performance Cloudinary Media Delivery",
        category: "Cloud & Performance",
        level: "Intermediate",
        duration: "20 min",
        description: "Upload user images securely with Node.js buffer streams, perform automatic format transformations (WebP/AVIF), and optimize Core Web Vitals.",
        icon: Flame,
        color: "from-violet-500 to-purple-600",
        steps: ["Signed Buffer Uploads", "Responsive Breakpoints", "Next-Cloudinary CldImage", "SEO Image Optimization"],
        searchQuery: "programming"
    }
];

export default function TutorialsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Header Banner */}
            <div className="relative overflow-hidden border-b bg-gradient-to-b from-purple-500/10 via-background to-background py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-semibold text-purple-700 dark:text-purple-300">
                        <BookOpen className="h-3.5 w-3.5" /> Curated Developer Curriculum
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                        Interactive <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">Tutorials</span> & Deep Dives
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Hands-on guides engineered to take you from architectural fundamentals to production deployment.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link href="/articles">
                            <Button size="lg" className="rounded-full gap-2">
                                Browse All Articles <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/topics">
                            <Button size="lg" variant="outline" className="rounded-full">
                                Explore All Topics
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tutorial Grid */}
            <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {tutorialsData.map((tut) => {
                        const Icon = tut.icon;
                        return (
                            <Card 
                                key={tut.id} 
                                className="group flex flex-col justify-between overflow-hidden border border-border/60 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-1 bg-card/60 backdrop-blur-sm"
                            >
                                <div>
                                    {/* Card Top Accent Bar */}
                                    <div className={`h-2 w-full bg-gradient-to-r ${tut.color}`} />
                                    <CardHeader className="space-y-3 pb-4">
                                        <div className="flex items-center justify-between">
                                            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="text-xs font-medium">
                                                    {tut.level}
                                                </Badge>
                                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Clock className="h-3 w-3" /> {tut.duration}
                                                </span>
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                                            {tut.title}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                                            {tut.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4 pt-0">
                                        <div className="space-y-1.5 border-t border-border/50 pt-4">
                                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                Key Milestones
                                            </p>
                                            <ul className="space-y-1">
                                                {tut.steps.map((step, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </div>

                                <div className="p-6 pt-0">
                                    <Link href={`/articles?search=${encodeURIComponent(tut.searchQuery)}`} className="block w-full">
                                        <Button variant="outline" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            Read Tutorial Articles
                                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Bottom Callout */}
                <div className="mt-16 rounded-2xl border border-border/80 bg-gradient-to-r from-purple-500/10 via-indigo-500/5 to-transparent p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-foreground">Want to author a developer guide?</h3>
                        <p className="text-muted-foreground max-w-xl text-sm sm:text-base">
                            Join our author community to share your technical discoveries, open-source architectures, and engineering breakthroughs.
                        </p>
                    </div>
                    <Link href="/dashboard/articles/create">
                        <Button size="lg" className="rounded-full px-8 gap-2 shrink-0">
                            Create an Article <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </main>

            <BlogFooter />
        </div>
    );
}
