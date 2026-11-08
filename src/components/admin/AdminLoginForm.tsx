"use client";

import React, { useActionState, useState } from "react";
import Link from "next/link";
import { adminLoginAction, AdminLoginFormState } from "@/actions/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ShieldAlert, Lock, Mail, Eye, EyeOff, Loader2, ArrowLeft, KeyRound } from "lucide-react";

export default function AdminLoginForm() {
    const [state, formAction, isPending] = useActionState<AdminLoginFormState, FormData>(
        adminLoginAction,
        {}
    );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Card className="w-full max-w-md border border-border/80 shadow-2xl bg-card/95 backdrop-blur-md rounded-2xl overflow-hidden">
            <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-purple-600 to-indigo-600" />

            <CardHeader className="text-center pt-8 pb-4 space-y-2">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-2 shadow-inner">
                    <ShieldAlert className="w-7 h-7 text-indigo-500 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-2xl font-extrabold tracking-tight">
                    Admin Portal
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                    Restricted Area &mdash; System Management &amp; Full CRUD Operations
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
                {state?.error && (
                    <div className="p-3 text-xs sm:text-sm rounded-xl bg-destructive/10 border border-destructive/30 text-destructive flex items-center gap-2 animate-in fade-in">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>{state.error}</span>
                    </div>
                )}

                <form action={formAction} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-semibold flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-muted-foreground" /> Admin Email
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="admin@nextblogapp.com"
                            className="h-11 rounded-xl text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-xs font-semibold flex items-center gap-1.5">
                                <Lock className="w-3.5 h-3.5 text-muted-foreground" /> Security Passkey
                            </Label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                            >
                                {showPassword ? (
                                    <>
                                        <EyeOff className="w-3 h-3" /> Hide
                                    </>
                                ) : (
                                    <>
                                        <Eye className="w-3 h-3" /> Show
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter admin password"
                                className="h-11 rounded-xl pr-10 text-sm font-mono"
                            />
                            <div className="absolute right-3 top-3 text-muted-foreground">
                                <KeyRound className="w-5 h-5 opacity-40" />
                            </div>
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-11 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
                    >
                        {isPending ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
                            </span>
                        ) : (
                            "Access Admin Console"
                        )}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="flex justify-center pb-6 pt-2 border-t border-border/40">
                <Link
                    href="/"
                    className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Website
                </Link>
            </CardFooter>
        </Card>
    );
}
