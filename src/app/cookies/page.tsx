import React from "react";
import Navbar from "@/components/home/header/Navbar";
import { BlogFooter } from "@/components/home/BlogFooter";
import { Cookie, Settings, ShieldCheck, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Cookie Policy | Next Blog",
    description: "Understand how Next Blog uses cookies and local browser storage for authentication and theme persistence."
};

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <div className="border-b bg-gradient-to-b from-purple-500/10 via-background to-background py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
                        <Cookie className="h-3.5 w-3.5" /> Storage & Preferences
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
                        Cookie Policy
                    </h1>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Last updated: November 2026 · Understanding our transparent approach to cookies
                    </p>
                </div>
            </div>

            {/* Content */}
            <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-4xl">
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <Cookie className="h-5 w-5 text-primary" /> 1. What Are Cookies?
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Cookies are small data files placed on your device by websites you visit. They are widely used to make websites work properly, provide a personalized browsing experience, and remember your preferences over time.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-primary" /> 2. What Cookies We Use & Why
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use cookies only when strictly necessary for platform functionality:
                        </p>

                        <div className="space-y-4 not-prose">
                            <div className="p-5 rounded-xl border border-border/70 bg-card">
                                <div className="flex items-center gap-2 font-bold text-foreground">
                                    <Check className="h-4 w-4 text-emerald-500" /> Essential Authentication Cookies (Clerk)
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                                    These encrypted session cookies allow you to log in securely, navigate between dashboard pages, and stay authenticated without re-entering your password on every page transition.
                                </p>
                            </div>

                            <div className="p-5 rounded-xl border border-border/70 bg-card">
                                <div className="flex items-center gap-2 font-bold text-foreground">
                                    <Check className="h-4 w-4 text-emerald-500" /> Preference Storage (next-themes)
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                                    We use browser local storage and cookies to remember whether you prefer Light mode, Dark mode, or your System color scheme across sessions.
                                </p>
                            </div>

                            <div className="p-5 rounded-xl border border-border/70 bg-card">
                                <div className="flex items-center gap-2 font-bold text-foreground">
                                    <Check className="h-4 w-4 text-emerald-500" /> Zero Invasive Tracking
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                                    We <strong>do not</strong> use cross-site tracking cookies, third-party advertising cookies, or data-brokering beacons.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <Settings className="h-5 w-5 text-primary" /> 3. Managing Your Cookies
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You can choose to disable or clear cookies in your browser settings at any time. However, please note that disabling essential cookies will prevent you from signing in to your Next Blog author dashboard.
                        </p>
                    </section>

                    <section className="space-y-4 pt-6 border-t border-border">
                        <h2 className="text-xl font-bold text-foreground">Have Questions?</h2>
                        <p className="text-muted-foreground text-sm">
                            If you have questions regarding our cookie implementation, contact us at <span className="text-primary font-medium">privacy@nextblog.dev</span>.
                        </p>
                        <Link href="/privacy">
                            <Button variant="outline" className="rounded-full">Read Privacy Policy</Button>
                        </Link>
                    </section>
                </div>
            </main>

            <BlogFooter />
        </div>
    );
}
