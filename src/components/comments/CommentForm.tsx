"use client";

import React, { useActionState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createComment } from "@/actions/create-comment";
import { CommentFormProps } from "@/types";
import { LogIn } from "lucide-react";

const CommentForm: React.FC<CommentFormProps> = ({ articleId }) => {
    const [formState, action, isPending] = useActionState(
        createComment.bind(null, articleId),
        { errors: {} }
    );

    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return <div className="text-sm text-muted-foreground py-4">Loading conversation...</div>;
    }

    if (!isSignedIn) {
        return (
            <div className="mb-8 p-6 rounded-2xl border border-dashed border-border/80 bg-muted/20 text-center space-y-2">
                <p className="text-sm font-medium text-foreground">
                    Join the conversation
                </p>
                <p className="text-xs text-muted-foreground">
                    Sign in to share your thoughts and reply to other developers.
                </p>
                <div className="pt-1">
                    <SignInButton>
                        <Button variant="outline" size="sm" className="rounded-full gap-1.5 text-xs">
                            <LogIn className="w-3.5 h-3.5" /> Sign In to Comment
                        </Button>
                    </SignInButton>
                </div>
            </div>
        );
    }

    const firstLetter = user?.firstName?.slice(0, 1).toUpperCase() || "U";

    return (
        <form className="mb-8" action={action}>
            <div className="flex gap-4">
                <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>{firstLetter}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                    <Input
                        placeholder="Add a comment..."
                        name="body"
                        className="py-5 text-sm rounded-xl"
                    />
                    {formState.errors.body && (
                        <p className="text-red-500 text-xs font-medium">
                            {formState.errors.body[0]}
                        </p>
                    )}
                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="rounded-xl text-xs h-9"
                        >
                            {isPending ? "Posting..." : "Post Comment"}
                        </Button>
                    </div>
                    {formState.errors.formErrors && (
                        <div className="p-2.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-500 text-xs">
                            {formState.errors.formErrors[0]}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
};

export default CommentForm;
