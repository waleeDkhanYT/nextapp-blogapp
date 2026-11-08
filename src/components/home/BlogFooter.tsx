"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Linkedin, Github, Twitter, CheckCircle2, Sparkles } from "lucide-react";

export function BlogFooter() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubscribed(true);
            setEmail("");
        }
    };

    return (
        <footer className="border-t bg-card/40 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
                    {/* Branding Section */}
                    <div className="md:col-span-2 lg:col-span-2 space-y-4">
                        <Link href="/" className="inline-flex items-center space-x-2">
                            <span className="text-2xl font-bold">
                                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-300 dark:to-pink-400 bg-clip-text text-transparent">
                                    Next
                                </span>
                                <span className="text-foreground">Blog</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                            Where ideas meet engineering innovation. Dive into a world of insightful
                            articles, real-world architectures, and tutorials written by passionate builders.
                        </p>

                        <div className="flex items-center gap-2 pt-2">
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Twitter"
                            >
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                                    <Twitter className="h-4 w-4" />
                                </Button>
                            </a>
                            <a 
                                href="https://github.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="GitHub"
                            >
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                                    <Github className="h-4 w-4" />
                                </Button>
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="LinkedIn"
                            >
                                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
                                    <Linkedin className="h-4 w-4" />
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Explore</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/articles" className="text-muted-foreground hover:text-primary transition-colors">
                                    All Articles
                                </Link>
                            </li>
                            <li>
                                <Link href="/topics" className="text-muted-foreground hover:text-primary transition-colors">
                                    Topics & Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/authors" className="text-muted-foreground hover:text-primary transition-colors">
                                    Authors Directory
                                </Link>
                            </li>
                            <li>
                                <Link href="/tutorials" className="text-muted-foreground hover:text-primary transition-colors">
                                    Tutorials & Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="/podcasts" className="text-muted-foreground hover:text-primary transition-colors">
                                    Podcasts & Audio
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Legal & Info</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                                    About Next Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/licenses" className="text-muted-foreground hover:text-primary transition-colors">
                                    Licenses & Credits
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4 md:col-span-2 lg:col-span-1">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">Stay Updated</h3>
                        <p className="text-xs text-muted-foreground">
                            Get our weekly roundup of top articles and tech architecture directly in your inbox.
                        </p>
                        {isSubscribed ? (
                            <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 shrink-0" />
                                <span>You&apos;re subscribed! Thanks for joining us.</span>
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5">
                                <div className="relative">
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Enter your email"
                                        className="pl-10 text-sm h-10"
                                    />
                                    <Mail className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full text-xs font-semibold h-10 rounded-lg gap-1.5"
                                >
                                    <Sparkles className="h-3.5 w-3.5" /> Subscribe
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 border-t border-border/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Next Blog. Engineered for modern web builders.</p>
                    <p className="flex items-center gap-1">
                        Built with Next.js 15, React 19 & Tailwind CSS v4.
                    </p>
                </div>
            </div>
        </footer>
    );
}
