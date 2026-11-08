import Sidebar from "@/components/dashboard/Sidebar";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-background">
            <div className="flex flex-col md:flex-row min-h-screen">
                <Sidebar />
                <div className="flex-1 min-w-0 w-full overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
