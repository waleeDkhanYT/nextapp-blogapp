"use client"
import { Suspense, useState } from "react";
import Link from "next/link";
import { Button } from "../../ui/button";
import SearchInput from "./SearchInput";
import { ModeToggle } from "./ModeToggle";
import { Menu, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { searchAction } from "@/actions/search";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user } = useUser();

    return (
        <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold tracking-tight">
                                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-300 dark:to-pink-400 bg-clip-text text-transparent">
                                    Next
                                </span>
                                <span className="text-foreground">Blog</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/articles"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Articles
                        </Link>
                        <Link
                            href="/topics"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Topics
                        </Link>
                        <Link
                            href="/tutorials"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Tutorials
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            About
                        </Link>
                        {user && (
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3 sm:gap-4">
                        <Suspense fallback={<div className="hidden md:block w-48 h-9" />}>
                            <SearchInput />
                        </Suspense>
                        <ModeToggle />

                        {/* User Actions */}
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            <div className="hidden sm:flex items-center gap-2">
                                <SignInButton>
                                    <Button variant="outline" size="sm" className="rounded-full px-4">Login</Button>
                                </SignInButton>
                                <SignUpButton>
                                    <Button size="sm" className="rounded-full px-4">Sign up</Button>
                                </SignUpButton>
                            </div>
                        </SignedOut>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-muted-foreground hover:text-foreground"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden py-4 space-y-4 border-t bg-background/95 backdrop-blur">
                    {/* Search Bar (Mobile) */}
                    <div className="px-4">
                        <form action={searchAction} className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                name="search"
                                type="search"
                                placeholder="Search articles..."
                                className="pl-10 w-full focus-visible:ring-1 rounded-full text-sm"
                            />
                        </form>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="space-y-1 px-4">
                        <Link
                            href="/articles"
                            className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Articles
                        </Link>
                        <Link
                            href="/topics"
                            className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Topics
                        </Link>
                        <Link
                            href="/tutorials"
                            className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Tutorials
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                        {user && (
                            <Link
                                href="/dashboard"
                                className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        )}
                    </div>

                    {/* Mobile Auth Buttons */}
                    <SignedOut>
                        <div className="px-4 pt-2 border-t border-border/50 flex flex-col gap-2">
                            <SignInButton>
                                <Button variant="outline" className="w-full rounded-full">
                                    Login
                                </Button>
                            </SignInButton>
                            <SignUpButton>
                                <Button className="w-full rounded-full">Sign up</Button>
                            </SignUpButton>
                        </div>
                    </SignedOut>
                </div>
            )}
        </div>
    )
}

export default Navbar;
