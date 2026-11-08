import React from "react";
import Navbar from "@/components/home/header/Navbar";
import { BlogFooter } from "@/components/home/BlogFooter";
import { Award, FileCode, ExternalLink, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
    title: "Open Source Licenses | Next Blog",
    description: "Third-party open source software acknowledgments and licensing information for Next Blog."
};

const openSourceLibs = [
    { name: "Next.js", license: "MIT License", copyright: "Vercel, Inc.", url: "https://nextjs.org" },
    { name: "React & React DOM", license: "MIT License", copyright: "Meta Platforms, Inc.", url: "https://react.dev" },
    { name: "Tailwind CSS", license: "MIT License", copyright: "Tailwind Labs, Inc.", url: "https://tailwindcss.com" },
    { name: "Prisma ORM", license: "Apache 2.0", copyright: "Prisma Data, Inc.", url: "https://www.prisma.io" },
    { name: "Clerk Next.js SDK", license: "MIT License", copyright: "Clerk, Inc.", url: "https://clerk.com" },
    { name: "Lucide Icons", license: "ISC License", copyright: "Lucide Contributors", url: "https://lucide.dev" },
    { name: "Radix UI Primitives", license: "MIT License", copyright: "WorkOS, Inc.", url: "https://www.radix-ui.com" },
    { name: "Zod", license: "MIT License", copyright: "Colin McDonnell", url: "https://zod.dev" },
    { name: "Cloudinary Node SDK", license: "MIT License", copyright: "Cloudinary, Ltd.", url: "https://cloudinary.com" },
    { name: "next-themes", license: "MIT License", copyright: "Paco Coursey", url: "https://github.com/pacocoursey/next-themes" }
];

export default function LicensesPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <div className="border-b bg-gradient-to-b from-purple-500/10 via-background to-background py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
                        <Award className="h-3.5 w-3.5" /> Open Source Attribution
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
                        Licenses & Credits
                    </h1>
                    <p className="mt-4 text-sm text-muted-foreground">
                        Next Blog is proudly built on open-source foundations. We thank the incredible community of maintainers and contributors.
                    </p>
                </div>
            </div>

            <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-4xl space-y-12">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <FileCode className="h-5 w-5 text-primary" /> Core Platform License
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Next Blog application code is distributed under the <strong>MIT License</strong>. You are free to explore our architecture, learn from our code patterns, and adapt our components for your own projects.
                    </p>
                    <div className="p-4 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
{`MIT License

Copyright (c) 2026 Next Blog

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.`}
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-bold text-foreground">
                        Third-Party Open Source Libraries
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        The following open source libraries and packages power Next Blog:
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {openSourceLibs.map((lib, idx) => (
                            <Card key={idx} className="border-border/60 hover:border-primary/40 transition-colors">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-base font-bold text-foreground">
                                            {lib.name}
                                        </CardTitle>
                                        <Badge variant="outline" className="text-xs">
                                            {lib.license}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-0 flex items-center justify-between text-xs text-muted-foreground">
                                    <span>© {lib.copyright}</span>
                                    <a 
                                        href={lib.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-primary hover:underline flex items-center gap-1"
                                    >
                                        Visit <ExternalLink className="h-3 w-3" />
                                    </a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                <div className="pt-8 border-t border-border flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4 text-red-500 fill-current" /> Made with passion for the developer ecosystem.
                    </div>
                    <Link href="/">
                        <Button variant="outline" className="rounded-full">Back to Home</Button>
                    </Link>
                </div>
            </main>

            <BlogFooter />
        </div>
    );
}
