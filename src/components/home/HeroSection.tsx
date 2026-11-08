import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { 
    ArrowRight, 
    Compass, 
    PenTool, 
    Sparkles, 
    Flame, 
    BookOpen, 
    Heart, 
    MessageCircle,
    TrendingUp
} from "lucide-react";

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

            <div className="container relative mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
                <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
                    
                    {/* Left Column: Headline & Action */}
                    <div className="space-y-8 text-center lg:col-span-7 lg:text-left">
                        {/* Pill Tagline */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-purple-200 backdrop-blur-md shadow-inner shadow-purple-500/20">
                            <Sparkles className="h-4 w-4 text-purple-300 animate-pulse" />
                            <span>Next-Gen Engineering & Tech Publishing</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-[1.15]">
                            Explore The World Through{" "}
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
                                Words & Code
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto max-w-2xl text-base sm:text-lg text-purple-100/80 lg:mx-0 leading-relaxed">
                            Discover curated tutorials, architectural retrospectives, and deep perspectives on software engineering, artificial intelligence, and modern technology.
                        </p>

                        {/* CTA Buttons Row */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                            <Link href="/articles" className="w-full sm:w-auto">
                                <Button 
                                    size="lg" 
                                    className="w-full sm:w-auto rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-purple-500/25 px-8 py-6 text-base gap-2"
                                >
                                    Start Reading <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>

                            <Link href="/topics" className="w-full sm:w-auto">
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    className="w-full sm:w-auto rounded-full border-white/20 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-6 text-base gap-2"
                                >
                                    <Compass className="h-4 w-4" /> Explore Topics
                                </Button>
                            </Link>

                            <Link href="/dashboard/articles/create" className="w-full sm:w-auto">
                                <Button 
                                    variant="ghost" 
                                    size="lg" 
                                    className="w-full sm:w-auto rounded-full text-purple-200 hover:text-white hover:bg-white/10 px-6 py-6 text-base gap-2"
                                >
                                    <PenTool className="h-4 w-4" /> Write
                                </Button>
                            </Link>
                        </div>

                        {/* High-Contrast Frosted Stats Row */}
                        <div className="grid grid-cols-3 gap-3 pt-4 sm:gap-4 max-w-lg mx-auto lg:mx-0">
                            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center backdrop-blur-md">
                                <div className="text-2xl sm:text-3xl font-extrabold text-white">1K+</div>
                                <div className="text-xs text-purple-200/80 mt-1 font-medium">Articles</div>
                            </div>
                            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center backdrop-blur-md">
                                <div className="text-2xl sm:text-3xl font-extrabold text-white">50+</div>
                                <div className="text-xs text-purple-200/80 mt-1 font-medium">Authors</div>
                            </div>
                            <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-center backdrop-blur-md">
                                <div className="text-2xl sm:text-3xl font-extrabold text-white">100K+</div>
                                <div className="text-xs text-purple-200/80 mt-1 font-medium">Dev Readers</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Mockup Card */}
                    <div className="lg:col-span-5 flex justify-center">
                        <div className="relative w-full max-w-md">
                            
                            {/* Floating Top Badge */}
                            <div className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-500/90 text-white px-3.5 py-1 text-xs font-semibold shadow-lg backdrop-blur-md">
                                <TrendingUp className="h-3.5 w-3.5" /> Next.js 15 App Router
                            </div>

                            {/* Glassmorphism Window Container */}
                            <div className="overflow-hidden rounded-2xl border border-white/20 bg-slate-900/80 shadow-2xl shadow-purple-500/20 backdrop-blur-xl">
                                
                                {/* Window Control Bar */}
                                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                                        <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                                        <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                                    </div>
                                    <span className="text-xs font-mono text-purple-200/60">nextblog.dev/featured</span>
                                    <div className="flex items-center gap-1 text-xs text-purple-300 font-semibold">
                                        <Flame className="h-3.5 w-3.5 text-amber-400 fill-amber-400" /> Hot Story
                                    </div>
                                </div>

                                {/* Preview Card Content */}
                                <div className="p-5 sm:p-6 space-y-4">
                                    <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/10">
                                        <Image
                                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
                                            alt="Featured Architecture Story"
                                            fill
                                            className="object-cover transition-transform duration-700 hover:scale-105"
                                            priority
                                        />
                                        <div className="absolute top-3 left-3 rounded-full bg-purple-950/80 px-2.5 py-1 text-xs font-semibold text-purple-200 backdrop-blur-md">
                                            Technology
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-white leading-snug">
                                            Architecting Scalable Web Applications with React 19 Server Actions
                                        </h3>
                                        <p className="text-xs text-purple-200/70 line-clamp-2">
                                            A comprehensive breakdown of data mutation patterns, optimistic updates, and zero-bundle server logic.
                                        </p>
                                    </div>

                                    {/* Author & Interactions Row */}
                                    <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs text-purple-200/80">
                                        <div className="flex items-center gap-2">
                                            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-400 flex items-center justify-center font-bold text-slate-900 text-xs">
                                                A
                                            </div>
                                            <span className="font-medium text-white">Alex Morgan</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="flex items-center gap-1 text-pink-400">
                                                <Heart className="h-3.5 w-3.5 fill-pink-400" /> 142
                                            </span>
                                            <span className="flex items-center gap-1 text-purple-300">
                                                <MessageCircle className="h-3.5 w-3.5" /> 28
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Bottom Badge */}
                            <div className="absolute -bottom-4 -left-2 z-20 hidden sm:flex items-center gap-2 rounded-xl bg-slate-900/90 border border-white/15 text-purple-100 p-2.5 text-xs font-medium shadow-xl backdrop-blur-md">
                                <BookOpen className="h-4 w-4 text-purple-400" />
                                <span>Zero-lag optimistic interactions</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
