"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    LayoutDashboard, 
    FileText, 
    MessageSquare, 
    Users, 
    FolderGit2, 
    Heart, 
    Activity, 
    LogOut, 
    Globe, 
    ShieldAlert, 
    Menu, 
    Sparkles,
    ChevronRight
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { adminLogoutAction } from "@/actions/admin-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
    {
        title: "Overview",
        href: "/admin",
        icon: LayoutDashboard,
        badge: "Live"
    },
    {
        title: "Articles",
        href: "/admin/articles",
        icon: FileText
    },
    {
        title: "Comments",
        href: "/admin/comments",
        icon: MessageSquare
    },
    {
        title: "Users & Roles",
        href: "/admin/users",
        icon: Users
    },
    {
        title: "Projects",
        href: "/admin/projects",
        icon: FolderGit2
    },
    {
        title: "Likes & Engagement",
        href: "/admin/likes",
        icon: Heart
    },
    {
        title: "System Diagnostic",
        href: "/admin/system",
        icon: Activity
    }
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    const sidebarContent = (
        <div className="flex flex-col h-full justify-between">
            {/* Top Brand Header */}
            <div>
                <div className="p-5 border-b border-border/60">
                    <Link href="/admin" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-sm tracking-tight text-foreground">
                                    NextBlog
                                </span>
                                <span className="px-1.5 py-0.2 text-[10px] font-bold uppercase rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                    Admin
                                </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground font-mono">
                                Command Center
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="p-3 space-y-1">
                    <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80">
                        Management
                    </div>
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                                    active
                                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold"
                                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon className={`w-4 h-4 ${active ? "text-white" : "text-muted-foreground"}`} />
                                    <span>{item.title}</span>
                                </div>
                                {item.badge && (
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                        active ? "bg-white/20 text-white" : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                    }`}>
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Admin User Box & Shortcuts */}
            <div className="p-3 border-t border-border/60 space-y-2">
                <Link
                    href="/"
                    target="_blank"
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                >
                    <span className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5" /> View Public Site
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </Link>

                <div className="p-2.5 rounded-xl bg-muted/40 border border-border/50 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <Avatar className="w-8 h-8 border border-border">
                            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" />
                            <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                            <p className="text-xs font-bold truncate text-foreground flex items-center gap-1">
                                Master Admin <Sparkles className="w-3 h-3 text-amber-500 shrink-0" />
                            </p>
                            <p className="text-[10px] text-muted-foreground truncate font-mono">
                                admin@nextblogapp.com
                            </p>
                        </div>
                    </div>

                    <form action={adminLogoutAction}>
                        <Button
                            type="submit"
                            variant="ghost"
                            size="icon"
                            title="Sign out of Admin"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg cursor-pointer shrink-0"
                        >
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sticky Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-border bg-card/75 backdrop-blur-md sticky top-0 h-screen z-30">
                {sidebarContent}
            </aside>

            {/* Mobile Top Header with Drawer */}
            <div className="lg:hidden w-full border-b border-border bg-card/90 backdrop-blur-md sticky top-0 z-40 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
                                <Menu className="w-4 h-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-72 bg-card">
                            <SheetHeader className="sr-only">
                                <SheetTitle>Admin Navigation</SheetTitle>
                            </SheetHeader>
                            {sidebarContent}
                        </SheetContent>
                    </Sheet>

                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                            <ShieldAlert className="w-4 h-4" />
                        </div>
                        <span className="font-extrabold text-sm tracking-tight">Admin Console</span>
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <Link href="/" target="_blank">
                        <Button variant="ghost" size="sm" className="h-8 text-xs gap-1">
                            <Globe className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Site</span>
                        </Button>
                    </Link>
                    <form action={adminLogoutAction}>
                        <Button
                            type="submit"
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs text-destructive hover:bg-destructive/10"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
