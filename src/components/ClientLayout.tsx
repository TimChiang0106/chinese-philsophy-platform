'use client';

import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import clsx from "clsx";

import { Footer } from "./Footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default open on desktop

    // ...

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="flex flex-col min-h-screen">
            <Header toggleSidebar={toggleSidebar} />

            <div className="flex flex-1 pt-16">
                <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />

                <main className={clsx(
                    "flex-1 transition-all duration-300 w-full flex flex-col min-h-[calc(100vh-64px)]",
                    isSidebarOpen ? "lg:ml-72" : ""
                )}>
                    <div className="flex-1">
                        {children}
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
}
