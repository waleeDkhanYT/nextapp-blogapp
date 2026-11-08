import React, { Suspense } from "react";
import Link from "next/link";
import { BlogFooter } from "@/components/home/BlogFooter";
import Navbar from "@/components/home/header/Navbar";
import HeroSection from "@/components/home/HeroSection";
import TopArticles from "@/components/home/TopArticles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AllArticlesPageSkeleton } from "@/components/articles/AllArticlesPage";
import { 
    Sparkles, 
    ArrowRight, 
    Zap, 
    PenTool, 
    ShieldCheck, 
    BookOpen, 
    Code2, 
    Layers, 
    MessageCircle,
    Compass,
    TrendingUp
} from "lucide-react";

const quickCategories = [
    { name: "All Topics", query: "", icon: Compass },
    { name: "Technology", query: "Technology", icon: Layers },
    { name: "Programming", query: "Programming", icon: Code2 },
    { name: "Web Development", query: "Web Development", icon: Zap },
    { name: "AI & ML", query: "AI", icon: Sparkles },
    { name: "Cloud & DevOps", query: "Cloud", icon: TrendingUp },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div>
        <Navbar />
        <HeroSection />

        {/* Quick Category Discovery Strip */}
        <section className="border-b border-border/50 bg-card/30 backdrop-blur-sm py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2 shrink-0 hidden md:inline-block">
                Explore:
              </span>
              {quickCategories.map((cat, idx) => {
                const Icon = cat.icon;
                const href = cat.query ? `/articles?search=${encodeURIComponent(cat.query)}` : "/articles";
                return (
                  <Link key={idx} href={href} className="shrink-0">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="rounded-full text-xs font-medium border border-border/40 hover:border-primary/40 hover:bg-primary/10 gap-1.5 h-8 px-3.5 transition-all"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      <span>{cat.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Articles Section */}
        <section className="relative py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Handpicked Engineering Stories
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                Featured Articles
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Discover the latest architectural writeups, tutorials, and insights published by our community.
              </p>
            </div>

            {/* Articles Grid with Fallback */}
            <Suspense fallback={<AllArticlesPageSkeleton />}>
              <TopArticles />
            </Suspense>

            {/* View All Button */}
            <div className="mt-12 sm:mt-16 text-center">
              <Link href="/articles">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 py-6 text-base font-semibold border-border hover:bg-primary hover:text-primary-foreground gap-2 transition-all shadow-sm"
                >
                  View All Articles <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Platform Capabilities & Value Proposition */}
        <section className="border-y border-border/50 bg-muted/20 py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <Badge variant="outline" className="px-3 py-1 text-xs">
                Next-Gen Architecture
              </Badge>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                Engineered for Modern Technical Storytellers
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Every component was crafted with speed, developer ergonomics, and reader experience in mind.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-3 backdrop-blur-sm hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Next 15 & React 19</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Leveraging Server Actions, Partial Prerendering, and static optimization for sub-100ms response times.
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-3 backdrop-blur-sm hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <PenTool className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Rich Text Drafting</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Intuitive Quill WYSIWYG editor paired with automated Cloudinary Node.js streaming image uploads.
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-3 backdrop-blur-sm hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Optimistic Likes & Comments</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Instant visual feedback with React 19 useOptimistic and atomic database transactions.
                </p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-card/60 p-6 space-y-3 backdrop-blur-sm hover:border-primary/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground">Clerk Auth & Prisma</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Safe user sync, role-based author dashboards, and strict relational integrity on PostgreSQL.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tutorials / Learning Tracks Spotlight Banner */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 p-8 sm:p-12 lg:p-16 text-white shadow-2xl shadow-purple-500/10">
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-purple-200 backdrop-blur-md">
                  <BookOpen className="h-3.5 w-3.5 text-purple-300" /> New Curriculum
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Master Full-Stack Architecture with Our Guided Tutorials
                </h2>
                <p className="text-purple-100/80 text-sm sm:text-base leading-relaxed">
                  From zero-downtime PostgreSQL migrations with Prisma to fine-tuning Next.js 15 App Router caching, explore our step-by-step developer walk-throughs.
                </p>
                <div className="pt-4 flex flex-wrap gap-4">
                  <Link href="/tutorials">
                    <Button size="lg" className="rounded-full bg-white text-slate-900 hover:bg-white/90 font-bold px-8 gap-2">
                      View All Tutorials <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/topics">
                    <Button size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md px-6">
                      Explore Topics
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Decorative Background Blob */}
              <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
            </div>
          </div>
        </section>
      </div>

      <BlogFooter />
    </div>
  );
}
