'use client';

import Link from "next/link";
import booksData from "@/data/books.json";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChevronRight, ChevronDown, Book } from "lucide-react";
import { useState } from "react";

// Helper to group books by school
const groupedBooks = booksData.reduce((acc, book) => {
    const school = book.school || "Other";
    if (!acc[school]) acc[school] = [];
    acc[school].push(book);
    return acc;
}, {} as Record<string, typeof booksData>);

export function Sidebar({ isOpen, closeSidebar }: { isOpen: boolean, closeSidebar: () => void }) {
    const pathname = usePathname();
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        "Confucianism": true, // Default open
        "Daoism": true
    });

    const toggleSection = (school: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [school]: !prev[school]
        }));
    };

    const [activeChapters, setActiveChapters] = useState<Record<string, { id: string, title: string }[]>>({});

    // Effect to load chapters when a book is active
    // We check the pathname to see if we are inside a book
    const currentBookId = pathname.split('/')[2]; // /library/[bookId]/...

    // We can't use useEffect with async inside directly, but we can call a loader
    // We only load if we haven't loaded yet for this book
    if (currentBookId && !activeChapters[currentBookId]) {
        import(`@/data/books/${currentBookId}/chapters.json`)
            .then(mod => {
                setActiveChapters(prev => ({
                    ...prev,
                    [currentBookId]: mod.default
                }));
            })
            .catch(err => {
                // Ignore errors (maybe not a valid book ID or no chapters yet)
            });
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar Container */}
            <aside className={clsx(
                "fixed top-16 bottom-0 left-0 w-72 bg-white dark:bg-stone-950 border-r border-stone-200 dark:border-stone-800 overflow-y-auto z-40 transform transition-transform duration-300 lg:translate-x-0 custom-scrollbar",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <nav className="p-4 space-y-6 pb-20">
                    {/* Home Link */}
                    <Link
                        href="/"
                        className={clsx(
                            "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                            pathname === "/"
                                ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-900"
                        )}
                    >
                        Library Overview
                    </Link>

                    {/* Grouped Books */}
                    {Object.entries(groupedBooks).map(([school, books]) => (
                        <div key={school}>
                            <button
                                onClick={() => toggleSection(school)}
                                className="flex items-center w-full px-2 py-1 text-xs font-bold text-stone-500 uppercase tracking-wider hover:text-stone-800 transition-colors mb-2"
                            >
                                {expandedSections[school] ? <ChevronDown className="w-3 h-3 mr-1" /> : <ChevronRight className="w-3 h-3 mr-1" />}
                                {school}
                            </button>

                            {expandedSections[school] && (
                                <div className="space-y-1 ml-2 border-l border-stone-200 dark:border-stone-800 pl-2">
                                    {books.map(book => {
                                        const isBookActive = pathname.startsWith(`/library/${book.id}`);
                                        const isBookExact = pathname === `/library/${book.id}`;

                                        return (
                                            <div key={book.id}>
                                                <Link
                                                    href={`/library/${book.id}`}
                                                    className={clsx(
                                                        "flex items-center px-3 py-2 text-sm rounded-md transition-colors group justify-between",
                                                        isBookActive
                                                            ? "text-blue-700 font-bold bg-blue-50 dark:text-blue-300 dark:bg-blue-900/20"
                                                            : "text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900"
                                                    )}
                                                >
                                                    <span className="truncate">{book.title}</span>
                                                </Link>

                                                {/* Chapter List (GCP Style) */}
                                                {isBookActive && activeChapters[book.id] && (
                                                    <div className="mt-1 ml-2 space-y-0.5 border-l border-stone-200 dark:border-stone-700 pl-2">
                                                        {activeChapters[book.id].map(chapter => {
                                                            const chapterPath = `/library/${book.id}/${chapter.id}`;
                                                            const isChapterActive = pathname === chapterPath;
                                                            return (
                                                                <Link
                                                                    key={chapter.id}
                                                                    href={chapterPath}
                                                                    className={clsx(
                                                                        "block px-3 py-1.5 text-xs truncate rounded-md transition-colors border-l-2 border-transparent",
                                                                        isChapterActive
                                                                            ? "text-blue-600 dark:text-blue-400 bg-stone-50 dark:bg-stone-900 font-medium -ml-[9px] border-blue-500" // -ml to align border
                                                                            : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                                                                    )}
                                                                >
                                                                    {chapter.title}
                                                                </Link>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
}
