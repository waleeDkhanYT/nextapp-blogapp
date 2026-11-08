"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
    BarChart3, 
    FileText, 
    LayoutDashboard, 
    MessageCircle, 
    Settings, 
    Menu, 
    PlusCircle,
    Home,
    ArrowUpRight
} from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Articles", href: "/dashboard/articles", icon: FileText },
    { label: "Comments", href: "/dashboard/comments", icon: MessageCircle },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Top Navbar with Sheet Drawer */}
            <div className="md:hidden sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-3">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Open navigation menu">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[280px] p-0 flex flex-col justify-between">
                            <div>
                                <SheetTitle className="border-b px-6 py-4 text-left">
                                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                                        <span className="text-xl font-bold">
                                            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-300 dark:to-pink-400 bg-clip-text text-transparent">
                                                Next
                                            </span>
                                            <span className="text-foreground">Blog</span>
                                        </span>
                                    </Link>
                                </SheetTitle>
                                <div className="px-3 py-4">
                                    <DashboardNav closeSheet={() => setIsOpen(false)} />
                                </div>
                            </div>

                            {/* Mobile Drawer Bottom Actions */}
                            <div className="border-t p-4 space-y-2">
                                <Link href="/dashboard/articles/create" onClick={() => setIsOpen(false)} className="block">
                                    <Button className="w-full gap-2 text-xs font-semibold rounded-lg">
                                        <PlusCircle className="h-4 w-4" /> New Article
                                    </Button>
                                </Link>
                                <Link href="/" onClick={() => setIsOpen(false)} className="block">
                                    <Button variant="ghost" className="w-full justify-start text-xs text-muted-foreground gap-2">
                                        <Home className="h-4 w-4" /> Back to Website
                                    </Button>
                                </Link>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Link href="/" className="flex items-center space-x-1">
                        <span className="font-bold text-lg">
                            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">Next</span>
                            <span className="text-foreground">Blog</span>
                        </span>
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <Link href="/dashboard/articles/create">
                        <Button size="sm" className="h-8 gap-1.5 text-xs rounded-full">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span>Create</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Desktop Fixed Sidebar */}
            <aside className="hidden md:flex sticky top-0 h-screen w-64 shrink-0 flex-col justify-between border-r bg-card/40 backdrop-blur-md">
                <div>
                    {/* Brand Header */}
                    <div className="flex h-16 items-center px-6 border-b border-border/50">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold tracking-tight">
                                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:via-indigo-300 dark:to-pink-400 bg-clip-text text-transparent">
                                    Next
                                </span>
                                <span className="text-foreground">Blog</span>
                            </span>
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <div className="px-3 py-6">
                        <DashboardNav />
                    </div>
                </div>

                {/* Bottom Desktop Actions */}
                <div className="border-t border-border/50 p-4 space-y-2">
                    <Link href="/dashboard/articles/create" className="block">
                        <Button className="w-full gap-2 rounded-xl text-xs font-semibold shadow-sm">
                            <PlusCircle className="h-4 w-4" /> New Article
                        </Button>
                    </Link>
                    <Link href="/" className="block">
                        <Button variant="ghost" className="w-full justify-between text-xs text-muted-foreground hover:text-foreground">
                            <span className="flex items-center gap-2">
                                <Home className="h-4 w-4" /> Live Website
                            </span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </Button>
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

function DashboardNav({ closeSheet }: { closeSheet?: () => void }) {
    const pathname = usePathname();

    return (
        <nav className="space-y-1">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                    <Link key={item.href} href={item.href} onClick={closeSheet} className="block">
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                                isActive
                                    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-sm shadow-primary/20 font-semibold"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("h-4 w-4", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                            <span>{item.label}</span>
                        </Button>
                    </Link>
                );
            })}
        </nav>
    );
}
