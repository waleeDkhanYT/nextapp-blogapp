"use client";

import React, { useState, useTransition } from "react";
import { 
    Search, 
    UserPlus, 
    Trash2, 
    Edit, 
    Loader2, 
    AlertTriangle,
    FileText,
    MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { 
    adminCreateUserAction, 
    adminUpdateUserAction, 
    adminDeleteUserAction 
} from "@/actions/admin-users";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export type AdminUserItem = {
    id: string;
    name: string | null;
    email: string;
    role: string | null;
    imageUrl: string | null;
    clerkUserId: string;
    _count: {
        articles: number;
        comments: number;
    };
};

export default function AdminUsersTable({
    users: initialUsers
}: {
    users: AdminUserItem[];
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState(initialUsers);

    // Create User Modal State
    const [createOpen, setCreateOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newRole, setNewRole] = useState("author");

    // Edit User Modal State
    const [editUser, setEditUser] = useState<AdminUserItem | null>(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editRole, setEditRole] = useState("");

    // Delete Modal State
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const [isPending, startTransition] = useTransition();

    const filtered = users.filter((u) => {
        const query = searchTerm.toLowerCase();
        return (
            (u.name && u.name.toLowerCase().includes(query)) ||
            u.email.toLowerCase().includes(query) ||
            (u.role && u.role.toLowerCase().includes(query))
        );
    });

    const handleCreateUser = () => {
        if (!newName.trim() || !newEmail.trim()) return;
        startTransition(async () => {
            const formData = new FormData();
            formData.append("name", newName);
            formData.append("email", newEmail);
            formData.append("role", newRole);

            const res = await adminCreateUserAction({}, formData);
            if (res.success) {
                setCreateOpen(false);
                setNewName("");
                setNewEmail("");
                window.location.reload();
            } else {
                alert(res.error || "Failed to create user");
            }
        });
    };

    const handleUpdateUser = () => {
        if (!editUser) return;
        startTransition(async () => {
            const res = await adminUpdateUserAction(editUser.id, {
                name: editName,
                email: editEmail,
                role: editRole
            });
            if (res.success) {
                setUsers((prev) =>
                    prev.map((u) =>
                        u.id === editUser.id
                            ? { ...u, name: editName, email: editEmail, role: editRole }
                            : u
                    )
                );
                setEditUser(null);
            } else {
                alert(res.error || "Failed to update user");
            }
        });
    };

    const handleDeleteConfirm = () => {
        if (!deleteId) return;
        startTransition(async () => {
            const res = await adminDeleteUserAction(deleteId);
            if (res.success) {
                setUsers((prev) => prev.filter((u) => u.id !== deleteId));
                setDeleteId(null);
            } else {
                alert(res.error || "Failed to delete user");
            }
        });
    };

    const getRoleBadge = (role: string | null) => {
        const r = (role || "user").toLowerCase();
        if (r === "admin" || r === "superadmin") {
            return (
                <Badge className="bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20 text-[10px] uppercase font-bold">
                    Admin
                </Badge>
            );
        }
        if (r === "editor") {
            return (
                <Badge className="bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-[10px] uppercase font-bold">
                    Editor
                </Badge>
            );
        }
        if (r === "author") {
            return (
                <Badge className="bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] uppercase font-bold">
                    Author
                </Badge>
            );
        }
        return (
            <Badge variant="outline" className="text-[10px] uppercase">
                Reader
            </Badge>
        );
    };

    return (
        <div className="space-y-4">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or role..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 h-10 rounded-xl text-xs sm:text-sm"
                    />
                </div>

                <Button
                    onClick={() => setCreateOpen(true)}
                    className="gap-2 rounded-xl text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                    <UserPlus className="w-4 h-4" /> Add User / Author
                </Button>
            </div>

            {/* Users Table */}
            <div className="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-sm">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-muted/40 text-muted-foreground border-b border-border/50 font-semibold uppercase tracking-wider text-[11px]">
                            <tr>
                                <th className="p-3.5 pl-4 sm:pl-6">User / Author</th>
                                <th className="p-3.5">Assigned Role</th>
                                <th className="p-3.5 text-center">Published Articles</th>
                                <th className="p-3.5 text-center">Comments</th>
                                <th className="p-3.5 pr-4 sm:pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40">
                            {filtered.length > 0 ? (
                                filtered.map((u) => (
                                    <tr key={u.id} className="hover:bg-muted/15 transition-colors">
                                        <td className="p-3.5 pl-4 sm:pl-6">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-8 h-8 border border-border">
                                                    <AvatarImage src={u.imageUrl || undefined} />
                                                    <AvatarFallback>{u.name?.charAt(0) || "U"}</AvatarFallback>
                                                </Avatar>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-foreground truncate max-w-[150px] sm:max-w-xs">
                                                        {u.name || "Unnamed User"}
                                                    </p>
                                                    <p className="text-[10px] text-muted-foreground truncate max-w-[150px] sm:max-w-xs">
                                                        {u.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-3.5">
                                            {getRoleBadge(u.role)}
                                        </td>

                                        <td className="p-3.5 text-center">
                                            <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                                                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                                                {u._count.articles}
                                            </span>
                                        </td>

                                        <td className="p-3.5 text-center">
                                            <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                                                <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                                                {u._count.comments}
                                            </span>
                                        </td>

                                        <td className="p-3.5 pr-4 sm:pr-6 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        setEditUser(u);
                                                        setEditName(u.name || "");
                                                        setEditEmail(u.email);
                                                        setEditRole(u.role || "user");
                                                    }}
                                                    className="h-8 w-8 text-indigo-600 hover:text-indigo-700"
                                                    title="Edit User & Role"
                                                >
                                                    <Edit className="w-3.5 h-3.5" />
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteId(u.id)}
                                                    disabled={u.email.toLowerCase() === "admin@nextblogapp.com"}
                                                    className="h-8 w-8 text-destructive hover:bg-destructive/10 disabled:opacity-30"
                                                    title={u.email.toLowerCase() === "admin@nextblogapp.com" ? "Cannot delete Master Admin" : "Delete User"}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-xs text-muted-foreground">
                                        No users found matching query.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create User Modal Dialog */}
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <UserPlus className="w-4 h-4 text-indigo-500" /> Add New User / Author
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Manually register an author, editor, or administrator into the database.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="userName" className="text-xs font-semibold">
                                Full Name
                            </Label>
                            <Input
                                id="userName"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="e.g. Sarah Jenkins"
                                className="h-9 text-xs sm:text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="userEmail" className="text-xs font-semibold">
                                Email Address
                            </Label>
                            <Input
                                id="userEmail"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                placeholder="sarah@example.com"
                                className="h-9 text-xs sm:text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="userRole" className="text-xs font-semibold">
                                System Role
                            </Label>
                            <select
                                id="userRole"
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="author">Author (Publish Stories)</option>
                                <option value="editor">Editor (Review &amp; Edit)</option>
                                <option value="admin">Administrator (Full Access)</option>
                                <option value="user">Reader (Comment &amp; Like)</option>
                            </select>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setCreateOpen(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateUser}
                            disabled={isPending || !newName.trim() || !newEmail.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-1.5">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Creating...
                                </span>
                            ) : (
                                "Create User"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit User Modal Dialog */}
            <Dialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Edit className="w-4 h-4 text-indigo-500" /> Edit User &amp; Permissions
                        </DialogTitle>
                        <DialogDescription className="text-xs">
                            Update user profile information or modify role permissions.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="editName" className="text-xs font-semibold">
                                Full Name
                            </Label>
                            <Input
                                id="editName"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="h-9 text-xs sm:text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="editEmail" className="text-xs font-semibold">
                                Email Address
                            </Label>
                            <Input
                                id="editEmail"
                                type="email"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                className="h-9 text-xs sm:text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="editRole" className="text-xs font-semibold">
                                Role Permission
                            </Label>
                            <select
                                id="editRole"
                                value={editRole}
                                onChange={(e) => setEditRole(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="admin">Administrator (Full Access)</option>
                                <option value="editor">Editor (Review &amp; Edit)</option>
                                <option value="author">Author (Publish Stories)</option>
                                <option value="user">Reader (Standard Member)</option>
                            </select>
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setEditUser(null)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdateUser}
                            disabled={isPending || !editName.trim() || !editEmail.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-1.5">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                                </span>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal Dialog */}
            <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="w-5 h-5" /> Permanently Delete User?
                        </DialogTitle>
                        <DialogDescription className="text-xs sm:text-sm">
                            This will delete this user and safely cascade all of their published articles, comments, and likes. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setDeleteId(null)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className="flex items-center gap-1.5">
                                    <Loader2 className="w-4 h-4 animate-spin" /> Deleting...
                                </span>
                            ) : (
                                "Confirm Delete User"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
