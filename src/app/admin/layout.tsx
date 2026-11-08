import React from "react";

export const metadata = {
    title: "Admin Portal | Next Blog App",
    description: "Administrative console and management portal."
};

export default function AdminRootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
