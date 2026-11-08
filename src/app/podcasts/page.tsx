import React from "react";
import Navbar from "@/components/home/header/Navbar";
import { BlogFooter } from "@/components/home/BlogFooter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Headphones, 
    Play, 
    Clock, 
    Calendar, 
    Radio 
} from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Podcasts & Audio Stories | Next Blog",
    description: "Deep dive conversations with software architects, frontend specialists, and startup founders."
};

const podcastEpisodes = [
    {
        id: "ep-12",
        title: "The Reality of React 19 & Next.js 15 in Production",
        guest: "Sarah Lin (Principal Frontend Architect)",
        duration: "48 min",
        date: "Nov 2026",
        category: "Frontend Architecture",
        description: "An unfiltered discussion about server actions, cache tags, PPR (Partial Prerendering), and navigating modern React performance pitfalls.",
        tag: "Featured"
    },
    {
        id: "ep-11",
        title: "Scaling PostgreSQL & Prisma to Millions of Rows",
        guest: "Alex Rivera (Database Infrastructure Lead)",
        duration: "52 min",
        date: "Oct 2026",
        category: "Backend & Data",
        description: "Indexing strategies, partitioning, read replicas, avoiding ORM N+1 query traps, and handling connection pool exhaustion under high concurrency.",
        tag: "Popular"
    },
    {
        id: "ep-10",
        title: "AI Agents & Autonomous Coding: Hype vs Utility",
        guest: "Dr. Maya Chen (AI Systems Researcher)",
        duration: "41 min",
        date: "Oct 2026",
        category: "Artificial Intelligence",
        description: "How autonomous coding agents, LLM tool-calling, and retrieval architectures are reshaping the daily workflows of modern engineering teams.",
        tag: "Trending"
    },
    {
        id: "ep-09",
        title: "Tailwind CSS v4 & The Evolution of Design Tokens",
        guest: "Markus Vane (UI Systems Engineer)",
        duration: "36 min",
        date: "Sep 2026",
        category: "UI & Design Systems",
        description: "Exploring Tailwind's new CSS-first engine, OKLCH dynamic color models, and building accessible component libraries without bloated bundles.",
        tag: "Design"
    },
    {
        id: "ep-08",
        title: "Zero-Trust Identity and Modern Authentication",
        guest: "Elena Rostova (Cybersecurity Consultant)",
        duration: "45 min",
        date: "Sep 2026",
        category: "Security & Cloud",
        description: "Passkeys, biometric auth, multi-tenant RBAC, and defending modern web applications against token manipulation and session hijacking.",
        tag: "Security"
    },
    {
        id: "ep-07",
        title: "From Side Project to Sustainable Micro-SaaS",
        guest: "Devon Hayes (Indie Hacker & Founder)",
        duration: "39 min",
        date: "Aug 2026",
        category: "Startups & Career",
        description: "Lessons learned shipping fast, gathering customer feedback, handling payments, and marketing technical products without VC backing.",
        tag: "Founder"
    }
];

export default function PodcastsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <div className="relative overflow-hidden border-b bg-gradient-to-b from-purple-500/10 via-background to-background py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
                        <Radio className="h-3.5 w-3.5 animate-pulse" /> The NextBlog Audio Channel
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                        Engineering <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">Conversations</span>
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Tune in for in-depth technical discussions with software engineers, open-source contributors, and technology leaders.
                    </p>

                    {/* Platform links */}
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Button variant="outline" size="sm" className="rounded-full gap-2 text-xs">
                            <Headphones className="h-3.5 w-3.5 text-green-500" /> Spotify
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full gap-2 text-xs">
                            <Headphones className="h-3.5 w-3.5 text-purple-500" /> Apple Podcasts
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full gap-2 text-xs">
                            <Headphones className="h-3.5 w-3.5 text-red-500" /> YouTube Music
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-full gap-2 text-xs">
                            <Radio className="h-3.5 w-3.5 text-orange-500" /> RSS Feed
                        </Button>
                    </div>
                </div>
            </div>

            <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-5xl space-y-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">All Episodes</h2>
                        <p className="text-sm text-muted-foreground">Stream our latest technical interviews</p>
                    </div>
                    <Badge variant="secondary" className="px-3 py-1 text-xs">
                        6 Episodes
                    </Badge>
                </div>

                <div className="space-y-4">
                    {podcastEpisodes.map((ep) => (
                        <Card 
                            key={ep.id}
                            className="group overflow-hidden border border-border/60 transition-all duration-300 hover:shadow-lg hover:border-primary/40 bg-card/60 backdrop-blur-sm"
                        >
                            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <button 
                                        type="button"
                                        aria-label={`Play episode ${ep.title}`}
                                        className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform"
                                    >
                                        <Play className="h-6 w-6 fill-current ml-0.5" />
                                    </button>
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <Badge variant="outline" className="text-xs font-semibold">
                                                {ep.category}
                                            </Badge>
                                            <Badge className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 border-0">
                                                {ep.tag}
                                            </Badge>
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                            {ep.title}
                                        </h3>
                                        <p className="text-xs font-medium text-primary">
                                            With {ep.guest}
                                        </p>
                                        <p className="text-sm text-muted-foreground line-clamp-2 pt-1">
                                            {ep.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0 self-end md:self-center">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3.5 w-3.5" /> {ep.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" /> {ep.date}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Newsletter Box */}
                <div className="mt-16 rounded-2xl border border-border/80 bg-gradient-to-r from-purple-500/10 via-background to-background p-8 text-center space-y-4">
                    <Headphones className="h-8 w-8 text-primary mx-auto" />
                    <h3 className="text-2xl font-bold text-foreground">Never miss a developer episode</h3>
                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                        Get audio highlights, technical show notes, and code snippets delivered straight to your inbox.
                    </p>
                    <div className="flex justify-center gap-3">
                        <Link href="/articles">
                            <Button className="rounded-full px-6">Explore Related Articles</Button>
                        </Link>
                    </div>
                </div>
            </main>

            <BlogFooter />
        </div>
    );
}
