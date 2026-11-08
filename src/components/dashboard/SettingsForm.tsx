"use client";

import React, { useActionState } from "react";
import { updateUserProfile } from "@/actions/update-user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { 
    CheckCircle2, 
    AlertCircle, 
    Loader2, 
    User, 
    Moon, 
    Sun, 
    Laptop, 
    ShieldCheck, 
    Mail, 
    Save 
} from "lucide-react";

type SettingsFormProps = {
    user: {
        id: string;
        name: string;
        email: string;
        imageUrl: string | null;
        role: string | null;
    };
};

export default function SettingsForm({ user }: SettingsFormProps) {
    const [formState, action, isPending] = useActionState(updateUserProfile, { errors: {} });
    const { theme, setTheme } = useTheme();

    const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Profile Settings Card */}
            <Card className="border border-border/60 shadow-sm overflow-hidden">
                <CardHeader className="p-4 sm:p-6 border-b border-border/40">
                    <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" /> Author Profile Settings
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Update your public display name, professional role, and author bio attributes.
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-4 sm:p-6">
                    <form action={action} className="space-y-6">
                        {/* Avatar Display */}
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 ring-4 ring-primary/10">
                                <AvatarImage src={user.imageUrl || undefined} alt={user.name} />
                                <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                                    {initial}
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <div className="font-semibold text-sm text-foreground">{user.name}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Mail className="h-3 w-3" /> {user.email}
                                </div>
                                <div className="text-xs text-muted-foreground/80">
                                    Avatar synced from your Clerk account
                                </div>
                            </div>
                        </div>

                        {/* Name Field */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs sm:text-sm font-semibold">
                                Display Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={user.name}
                                placeholder="Your full name"
                                className="h-10 text-sm max-w-lg"
                                required
                            />
                            {formState?.errors?.name && (
                                <p className="text-xs text-red-500 font-medium">
                                    {formState.errors.name[0]}
                                </p>
                            )}
                        </div>

                        {/* Professional Role / Title Field */}
                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-xs sm:text-sm font-semibold">
                                Professional Title / Bio Role
                            </Label>
                            <Input
                                id="role"
                                name="role"
                                defaultValue={user.role || ""}
                                placeholder="e.g. Senior Software Architect · Tech Writer"
                                className="h-10 text-sm max-w-lg"
                            />
                            <p className="text-xs text-muted-foreground">
                                Displayed beneath your author byline on published articles.
                            </p>
                            {formState?.errors?.role && (
                                <p className="text-xs text-red-500 font-medium">
                                    {formState.errors.role[0]}
                                </p>
                            )}
                        </div>

                        {/* Email (Readonly) */}
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs sm:text-sm font-semibold">
                                Registered Email Address
                            </Label>
                            <Input
                                id="email"
                                value={user.email}
                                disabled
                                className="h-10 text-sm max-w-lg bg-muted/50 cursor-not-allowed"
                            />
                            <p className="text-xs text-muted-foreground">
                                Managed securely by Clerk Identity.
                            </p>
                        </div>

                        {/* Notifications / Success / Error Alerts */}
                        {formState?.success && (
                            <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 font-medium">
                                <CheckCircle2 className="h-4 w-4 shrink-0" />
                                <span>Profile updated successfully! Changes are live across all your articles.</span>
                            </div>
                        )}

                        {formState?.errors?.formErrors && (
                            <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs flex items-center gap-2 font-medium">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                <span>{formState.errors.formErrors[0]}</span>
                            </div>
                        )}

                        <div className="pt-2">
                            <Button 
                                type="submit" 
                                disabled={isPending}
                                className="gap-2 rounded-xl text-xs sm:text-sm font-semibold px-6 shadow-sm"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" /> Save Profile Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Appearance & Theme Settings Card */}
            <Card className="border border-border/60 shadow-sm overflow-hidden">
                <CardHeader className="p-4 sm:p-6 border-b border-border/40">
                    <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
                        <Sun className="h-5 w-5 text-amber-500" /> Interface Theme
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Select how Next Blog looks on your current device.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-3 gap-3 max-w-md">
                        <Button
                            type="button"
                            variant={theme === "light" ? "default" : "outline"}
                            onClick={() => setTheme("light")}
                            className="flex-col h-auto py-3 gap-2 rounded-xl text-xs font-semibold"
                        >
                            <Sun className="h-5 w-5" /> Light
                        </Button>
                        <Button
                            type="button"
                            variant={theme === "dark" ? "default" : "outline"}
                            onClick={() => setTheme("dark")}
                            className="flex-col h-auto py-3 gap-2 rounded-xl text-xs font-semibold"
                        >
                            <Moon className="h-5 w-5" /> Dark
                        </Button>
                        <Button
                            type="button"
                            variant={theme === "system" ? "default" : "outline"}
                            onClick={() => setTheme("system")}
                            className="flex-col h-auto py-3 gap-2 rounded-xl text-xs font-semibold"
                        >
                            <Laptop className="h-5 w-5" /> System
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Security & Clerk Identity Card */}
            <Card className="border border-border/60 shadow-sm overflow-hidden">
                <CardHeader className="p-4 sm:p-6 border-b border-border/40">
                    <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-emerald-500" /> Authentication & Security
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Enterprise identity verification and account protection.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/50 bg-muted/20">
                        <div>
                            <div className="font-semibold text-foreground">Clerk Multi-Factor Authentication</div>
                            <div className="text-xs text-muted-foreground">Passwordless passkeys, email magic links, and Google OAuth.</div>
                        </div>
                        <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                            Active
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl border border-border/50 bg-muted/20">
                        <div>
                            <div className="font-semibold text-foreground">Relational Identity Storage</div>
                            <div className="text-xs text-muted-foreground">Synchronized with PostgreSQL & Prisma CUID keys.</div>
                        </div>
                        <span className="text-xs font-bold text-purple-500 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full">
                            Verified
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
