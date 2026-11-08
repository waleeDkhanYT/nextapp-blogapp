import React from "react";
import Navbar from "@/components/home/header/Navbar";
import { BlogFooter } from "@/components/home/BlogFooter";
import { Scale, FileCheck, AlertCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Terms of Service | Next Blog",
    description: "Terms and conditions governing the use of the Next Blog publishing platform."
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <div className="border-b bg-gradient-to-b from-purple-500/10 via-background to-background py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
                        <Scale className="h-3.5 w-3.5" /> Platform Governance
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
                        Terms of Service
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
                            <FileCheck className="h-5 w-5 text-primary" /> 1. Acceptance of Terms
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            By accessing or using Next Blog, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you disagree with any part of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-primary" /> 2. User Responsibilities & Content Standards
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            As a registered author or commenter, you agree that any article, comment, or media you post will not:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                            <li>Infringe on copyright, trademark, patent, or intellectual property rights.</li>
                            <li>Contain malicious code, phishing links, malware, or vulnerability exploits.</li>
                            <li>Defame, harass, abuse, or incite violence against individuals or groups.</li>
                            <li>Engage in automated scraping or denial-of-service activities without authorization.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground">3. Intellectual Property Rights</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            <strong>Your Content Remains Yours:</strong> You retain full copyright to any original articles or material you publish on Next Blog. By publishing on our site, you grant Next Blog a worldwide, non-exclusive license to host, display, and distribute your content across our platform and CDN.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <ShieldAlert className="h-5 w-5 text-primary" /> 4. Account Termination
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            We reserve the right to suspend or terminate accounts that repeatedly violate content policies, publish spam, or engage in malicious security attempts against our database or API routes.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground">5. Disclaimer & Limitation of Liability</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Next Blog is provided &quot;as is&quot; without warranties of any kind. We strive for 99.9% uptime and zero data loss, but we cannot be held liable for incidental, indirect, or consequential damages resulting from platform downtime or third-party service interruptions.
                        </p>
                    </section>

                    <section className="space-y-4 pt-6 border-t border-border">
                        <h2 className="text-xl font-bold text-foreground">Contact & Inquiries</h2>
                        <p className="text-muted-foreground text-sm">
                            Questions regarding these terms should be addressed to <span className="text-primary font-medium">legal@nextblog.dev</span>.
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
