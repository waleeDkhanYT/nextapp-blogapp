"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    FolderGit2, 
    Plus, 
    Edit, 
    Trash2, 
    ExternalLink, 
    Github, 
    Loader2, 
    AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    adminCreateProjectAction, 
    adminUpdateProjectAction, 
    adminDeleteProjectAction 
} from "@/actions/admin-projects";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export type AdminProjectItem = {
    id: number;
    title: string;
    description: string;
    githubUrl: string | null;
    liveUrl: string | null;
    techStack: string;
    projectImage: string;
    createdAt: Date;
    author: {
        name: string | null;
        email: string;
    };
};

export default function AdminProjectsManager({
    projects: initialProjects
}: {
    projects: AdminProjectItem[];
}) {
    const [projects, setProjects] = useState(initialProjects);
    const [isPending, startTransition] = useTransition();

    // Create Modal
    const [createOpen, setCreateOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState("Next.js, TypeScript, Tailwind, Prisma");
    const [projectImage, setProjectImage] = useState("https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop");
    const [githubUrl, setGithubUrl] = useState("");
    const [liveUrl, setLiveUrl] = useState("");

    // Edit Modal
    const [editProject, setEditProject] = useState<AdminProjectItem | null>(null);

    // Delete Modal
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleCreate = () => {
        if (!title.trim() || !description.trim()) return;
        startTransition(async () => {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("techStack", techStack);
            formData.append("projectImage", projectImage);
            if (githubUrl) formData.append("githubUrl", githubUrl);
            if (liveUrl) formData.append("liveUrl", liveUrl);

            const res = await adminCreateProjectAction({}, formData);
            if (res.success) {
                setCreateOpen(false);
                setTitle("");
                setDescription("");
                window.location.reload();
            } else {
                alert(res.error || "Failed to create project");
            }
        });
    };

    const handleEditSave = () => {
        if (!editProject) return;
        startTransition(async () => {
            const formData = new FormData();
            formData.append("title", editProject.title);
            formData.append("description", editProject.description);
            formData.append("techStack", editProject.techStack);
            formData.append("projectImage", editProject.projectImage);
            if (editProject.githubUrl) formData.append("githubUrl", editProject.githubUrl);
            if (editProject.liveUrl) formData.append("liveUrl", editProject.liveUrl);

            const res = await adminUpdateProjectAction(editProject.id, {}, formData);
            if (res.success) {
                setProjects((prev) =>
                    prev.map((p) => (p.id === editProject.id ? editProject : p))
                );
                setEditProject(null);
            } else {
                alert(res.error || "Failed to update project");
            }
        });
    };

    const handleDeleteConfirm = () => {
        if (deleteId === null) return;
        startTransition(async () => {
            const res = await adminDeleteProjectAction(deleteId);
            if (res.success) {
                setProjects((prev) => prev.filter((p) => p.id !== deleteId));
                setDeleteId(null);
            } else {
                alert(res.error || "Failed to delete project");
            }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        Active Showcases ({projects.length})
                    </h2>
                </div>
                <Button
                    onClick={() => setCreateOpen(true)}
                    className="gap-2 rounded-xl text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                    <Plus className="w-4 h-4" /> Add Showcase Project
                </Button>
            </div>

            {/* Grid of Projects */}
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map((proj) => (
                        <Card key={proj.id} className="border border-border/70 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="relative w-full h-44 bg-muted overflow-hidden">
                                    <Image
                                        src={proj.projectImage}
                                        alt={proj.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardHeader className="p-4 pb-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <CardTitle className="text-base font-bold text-foreground truncate">
                                            {proj.title}
                                        </CardTitle>
                                        <span className="text-[10px] text-muted-foreground shrink-0 font-mono">
                                            #{proj.id}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                                        {proj.description}
                                    </p>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 space-y-3">
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                        {proj.techStack.split(",").map((t, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-[10px] px-2 py-0">
                                                {t.trim()}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                                        {proj.githubUrl && (
                                            <Link href={proj.githubUrl} target="_blank" className="hover:text-foreground flex items-center gap-1">
                                                <Github className="w-3.5 h-3.5" /> Code
                                            </Link>
                                        )}
                                        {proj.liveUrl && (
                                            <Link href={proj.liveUrl} target="_blank" className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
                                                <ExternalLink className="w-3.5 h-3.5" /> Demo
                                            </Link>
                                        )}
                                    </div>
                                </CardContent>
                            </div>

                            <div className="p-4 pt-2 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                                <span>By {proj.author.name || "Admin"}</span>
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setEditProject(proj)}
                                        className="h-8 w-8 text-indigo-600 hover:text-indigo-700"
                                    >
                                        <Edit className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setDeleteId(proj.id)}
                                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="p-12 text-center border border-dashed border-border rounded-2xl space-y-3">
                    <FolderGit2 className="w-10 h-10 mx-auto text-muted-foreground opacity-50" />
                    <p className="text-sm font-semibold text-foreground">No Showcase Projects Yet</p>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Add portfolio projects and technical case studies to highlight engineering work across the platform.
                    </p>
                    <Button
                        onClick={() => setCreateOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs gap-1.5"
                    >
                        <Plus className="w-4 h-4" /> Create First Project
                    </Button>
                </div>
            )}

            {/* Create Project Modal */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FolderGit2 className="w-4 h-4 text-indigo-500" /> New Showcase Project
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Add a technical portfolio project with live links, tech stack, and preview media.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-3 py-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="projTitle" className="text-xs font-semibold">Project Title</Label>
                            <Input
                                id="projTitle"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. AI-Powered Analytics Dashboard"
                                className="h-9 text-xs sm:text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="projDesc" className="text-xs font-semibold">Description</Label>
                            <textarea
                                id="projDesc"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Summary of architecture, features, and key challenges..."
                                className="w-full rounded-xl border border-input bg-background p-2.5 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="projStack" className="text-xs font-semibold">Tech Stack (comma-separated)</Label>
                            <Input
                                id="projStack"
                                value={techStack}
                                onChange={(e) => setTechStack(e.target.value)}
                                placeholder="Next.js, TypeScript, PostgreSQL, Tailwind"
                                className="h-9 text-xs sm:text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="projImg" className="text-xs font-semibold">Project Image URL</Label>
                            <Input
                                id="projImg"
                                value={projectImage}
                                onChange={(e) => setProjectImage(e.target.value)}
                                placeholder="https://images.unsplash.com/..."
                                className="h-9 text-xs sm:text-sm font-mono"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <Label htmlFor="projGit" className="text-xs font-semibold">GitHub Repo URL</Label>
                                <Input
                                    id="projGit"
                                    value={githubUrl}
                                    onChange={(e) => setGithubUrl(e.target.value)}
                                    placeholder="https://github.com/..."
                                    className="h-9 text-xs sm:text-sm"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="projLive" className="text-xs font-semibold">Live Site URL</Label>
                                <Input
                                    id="projLive"
                                    value={liveUrl}
                                    onChange={(e) => setLiveUrl(e.target.value)}
                                    placeholder="https://myproject.com"
                                    className="h-9 text-xs sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setCreateOpen(false)} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreate}
                            disabled={isPending || !title.trim() || !description.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish Project"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Project Modal */}
            <Dialog open={!!editProject} onOpenChange={(open) => !open && setEditProject(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Edit className="w-4 h-4 text-indigo-500" /> Edit Showcase Project
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Update project details, links, or tech stack.
                        </DialogDescription>
                    </DialogHeader>

                    {editProject && (
                        <div className="space-y-3 py-2">
                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Project Title</Label>
                                <Input
                                    value={editProject.title}
                                    onChange={(e) => setEditProject({ ...editProject, title: e.target.value })}
                                    className="h-9 text-xs sm:text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Description</Label>
                                <textarea
                                    rows={3}
                                    value={editProject.description}
                                    onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                                    className="w-full rounded-xl border border-input bg-background p-2.5 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Tech Stack</Label>
                                <Input
                                    value={editProject.techStack}
                                    onChange={(e) => setEditProject({ ...editProject, techStack: e.target.value })}
                                    className="h-9 text-xs sm:text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-xs font-semibold">Project Image URL</Label>
                                <Input
                                    value={editProject.projectImage}
                                    onChange={(e) => setEditProject({ ...editProject, projectImage: e.target.value })}
                                    className="h-9 text-xs sm:text-sm font-mono"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold">GitHub URL</Label>
                                    <Input
                                        value={editProject.githubUrl || ""}
                                        onChange={(e) => setEditProject({ ...editProject, githubUrl: e.target.value })}
                                        className="h-9 text-xs sm:text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs font-semibold">Live URL</Label>
                                    <Input
                                        value={editProject.liveUrl || ""}
                                        onChange={(e) => setEditProject({ ...editProject, liveUrl: e.target.value })}
                                        className="h-9 text-xs sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setEditProject(null)} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button onClick={handleEditSave} disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Modal */}
            <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="w-5 h-5" /> Delete Project?
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm">
                            Are you sure you want to delete this showcase project? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isPending}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isPending}>
                            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
