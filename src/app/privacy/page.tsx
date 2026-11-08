import React from "react";
import Navbar from "@/components/home/header/Navbar";
import { BlogFooter } from "@/components/home/BlogFooter";
import { Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Privacy Policy | Next Blog",
    description: "Read our comprehensive privacy policy regarding data collection, user rights, and security."
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <div className="border-b bg-gradient-to-b from-purple-500/10 via-background to-background py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
                        <Shield className="h-3.5 w-3.5" /> Legal & Transparency
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Last updated: November 2026 · Effective Date: November 1, 2026
                    </p>
                </div>
            </div>

            {/* Content */}
            <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-4xl">
                <div className="prose prose-neutral dark:prose-invert max-w-none space-y-10">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <Lock className="h-5 w-5 text-primary" /> 1. Overview & Commitment
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            At Next Blog (&quot;we&quot;, &quot;our&quot;, or &quot;the platform&quot;), we believe privacy is a fundamental right. We do not sell your personal data, run intrusive tracking scripts, or build shadow profiles. This Privacy Policy details what information we collect when you use our blogging service, why we collect it, and how your data is protected.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <Eye className="h-5 w-5 text-primary" /> 2. Information We Collect
                        </h2>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                                <span><strong>Account Information:</strong> When you register via Clerk Authentication, we store your name, email address, profile avatar URL, and Clerk User ID in our PostgreSQL database.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                                <span><strong>User-Generated Content:</strong> Articles, comments, rich text formatting, and likes you create are stored in our relational database to display on the platform.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-1" />
                                <span><strong>Media Uploads:</strong> Images uploaded for article covers are processed and stored securely via Cloudinary CDN infrastructure.</span>
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" /> 3. How We Use Your Information
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We use the collected information strictly to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                            <li>Provide, operate, and maintain our blogging platform and dashboard.</li>
                            <li>Attribute article authorship and display comment contributions.</li>
                            <li>Authenticate user sessions and protect against spam, abuse, and CSRF attacks.</li>
                            <li>Maintain server performance and cache invalidation.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground">4. Third-Party Service Providers</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We partner with industry-standard, GDPR-compliant infrastructure providers:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4 not-prose">
                            <div className="p-4 rounded-xl border border-border/60 bg-card">
                                <h4 className="font-bold text-foreground">Clerk</h4>
                                <p className="text-xs text-muted-foreground mt-1">Handles authentication, multi-factor security, session tokens, and identity management.</p>
                            </div>
                            <div className="p-4 rounded-xl border border-border/60 bg-card">
                                <h4 className="font-bold text-foreground">Cloudinary</h4>
                                <p className="text-xs text-muted-foreground mt-1">Processes, optimizes, and distributes article cover images globally.</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground">5. Your Rights & Data Portability</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            You maintain total ownership of your articles and comments. You have the right to request deletion of your account and all associated articles at any time from your dashboard or by contacting us.
                        </p>
                    </section>

                    <section className="space-y-4 pt-6 border-t border-border">
                        <h2 className="text-xl font-bold text-foreground">Questions or Concerns?</h2>
                        <p className="text-muted-foreground text-sm">
                            If you have questions about this policy or your personal data, reach out to our team at <span className="text-primary font-medium">privacy@nextblog.dev</span>.
                        </p>
                        <Link href="/about">
                            <Button variant="outline" className="rounded-full">Back to About Us</Button>
                        </Link>
                    </section>
                </div>
            </main>

            <BlogFooter />
        </div>
    );
}
