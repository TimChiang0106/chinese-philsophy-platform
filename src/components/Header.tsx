'use client';

import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Menu } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
    const { state, toggleOriginal, toggleTranslation } = useLanguage();

    const triggerSearch = () => {
        const event = new KeyboardEvent('keydown', {
            key: 'k',
            metaKey: true,
            bubbles: true
        });
        window.dispatchEvent(event);
    };

    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 z-50 flex items-center px-4 justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 lg:hidden"
                >
                    <Menu className="w-6 h-6" />
                </button>
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded text-white font-bold font-serif">
                        哲
                    </div>
                    <span className="text-xl font-medium tracking-tight text-stone-700 dark:text-stone-200 group-hover:text-blue-600 transition-colors">
                        Chinese Philosophy <span className="text-stone-400 font-normal ml-1">Platform</span>
                    </span>
                </Link>
            </div>

            <div
                onClick={triggerSearch}
                className="hidden md:flex flex-1 max-w-2xl mx-8 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-2 items-center text-stone-500 cursor-text hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            >
                <Search className="w-4 h-4 mr-3" />
                <span className="text-sm">Search across all books...</span>
                <span className="ml-auto text-xs bg-stone-200 dark:bg-stone-700 px-1.5 py-0.5 rounded text-stone-500 font-medium">⌘K</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={toggleOriginal}
                    className={clsx(
                        "px-3 py-1.5 text-sm font-medium rounded-md transition-colors border",
                        state.showOriginal
                            ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300"
                            : "bg-white border-transparent text-stone-500 hover:text-stone-900 dark:bg-stone-900 dark:text-stone-500 dark:hover:text-stone-300"
                    )}
                >
                    中文
                </button>
                <button
                    onClick={toggleTranslation}
                    className={clsx(
                        "px-3 py-1.5 text-sm font-medium rounded-md transition-colors border",
                        state.showTranslation
                            ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-300"
                            : "bg-white border-transparent text-stone-500 hover:text-stone-900 dark:bg-stone-900 dark:text-stone-500 dark:hover:text-stone-300"
                    )}
                >
                    English
                </button>
            </div>
        </header>
    );
}
