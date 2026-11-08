import React from "react";
import Navbar from "@/components/home/header/Navbar";
import { BlogFooter } from "@/components/home/BlogFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
    Zap, 
    ShieldCheck, 
    Users, 
    Globe, 
    Code2, 
    Sparkles, 
    Heart, 
    ArrowRight, 
    Layers, 
    Cpu 
} from "lucide-react";

export const metadata = {
    title: "About Us | Next Blog",
    description: "Learn about the mission, engineering philosophy, and community behind Next Blog."
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden border-b bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-background py-20 md:py-28">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
                        <Sparkles className="h-3.5 w-3.5" /> Our Story & Architecture
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                        Where Code Meets <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-300 dark:to-pink-400 bg-clip-text text-transparent">Insight</span>
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
                        Next Blog was engineered to bridge the gap between deep technical implementation and accessible, beautiful publishing. We empower developers, researchers, and creators to share actionable knowledge without friction.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href="/articles">
                            <Button size="lg" className="rounded-full px-8 gap-2">
                                Start Reading <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/dashboard/articles/create">
                            <Button size="lg" variant="outline" className="rounded-full px-8">
                                Write an Article
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Row */}
            <section className="border-b bg-muted/30 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="space-y-1">
                            <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">100%</div>
                            <div className="text-xs md:text-sm font-medium text-muted-foreground">Type-Safe Fullstack</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">&lt; 100ms</div>
                            <div className="text-xs md:text-sm font-medium text-muted-foreground">Edge Response Time</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">Next 15</div>
                            <div className="text-xs md:text-sm font-medium text-muted-foreground">App Router & React 19</div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">Global CDN</div>
                            <div className="text-xs md:text-sm font-medium text-muted-foreground">Cloudinary Media Delivery</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-20">
                <section>
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Our Core Principles
                        </h2>
                        <p className="mt-3 text-muted-foreground text-sm sm:text-base">
                            The standards that guide every line of code we write and every feature we ship.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <Card className="border-border/60 hover:shadow-lg transition-shadow">
                            <CardContent className="pt-6 space-y-4">
                                <div className="p-3 w-fit rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">Zero-Lag User Experience</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Using React 19 Server Actions, optimistic mutations, and streaming Suspense boundaries, every like, comment, and navigation feels instantaneous.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-border/60 hover:shadow-lg transition-shadow">
                            <CardContent className="pt-6 space-y-4">
                                <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">Enterprise Security</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Powered by Clerk authentication with encrypted session tokens, strict schema validation via Zod, and PostgreSQL foreign key integrity.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-border/60 hover:shadow-lg transition-shadow">
                            <CardContent className="pt-6 space-y-4">
                                <div className="p-3 w-fit rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400">
                                    <Heart className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">Developer-First Community</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    A platform designed by developers for developers. Free from bloated popups, intrusive trackers, and paywalls—pure knowledge sharing.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Technology Stack Grid */}
                <section className="rounded-2xl border border-border/80 bg-card/60 p-8 sm:p-12">
                    <div className="max-w-3xl mb-8">
                        <Badge variant="outline" className="mb-2">Under The Hood</Badge>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Built on the Modern Web Stack</h2>
                        <p className="text-muted-foreground text-sm sm:text-base mt-2">
                            Crafted with the latest generation of developer tools for durability, speed, and elegance.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { name: "Next.js 15", desc: "App Router & SSR", icon: Globe },
                            { name: "React 19", desc: "Actions & Hooks", icon: Code2 },
                            { name: "Tailwind CSS v4", desc: "OKLCH & Utility Design", icon: Layers },
                            { name: "Prisma ORM", desc: "Type-Safe DB Models", icon: Cpu },
                            { name: "PostgreSQL", desc: "Relational Persistence", icon: Layers },
                            { name: "Clerk Auth", desc: "Identity & MFA", icon: Users },
                        ].map((tech, idx) => {
                            const Icon = tech.icon;
                            return (
                                <div key={idx} className="p-4 rounded-xl border border-border/50 bg-background/50 text-center space-y-2 hover:border-primary/50 transition-colors">
                                    <div className="mx-auto p-2 w-fit rounded-lg bg-primary/10 text-primary">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="font-semibold text-sm text-foreground">{tech.name}</div>
                                    <div className="text-xs text-muted-foreground">{tech.desc}</div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Team / Community CTA */}
                <section className="text-center max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                        Ready to contribute your voice?
                    </h2>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        Whether you are sharing your latest architectural retrospective, deep dive, or step-by-step tutorial, there is a place for your ideas here.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/dashboard/articles/create">
                            <Button size="lg" className="rounded-full px-8 gap-2">
                                Start Writing Today <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            <BlogFooter />
        </div>
    );
}
