"use client";

import { useState } from "react";
import { AnalectsChapter } from "@/types/analects";
import { ArrowLeft, BookOpen, Type, Languages, Flame } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useReadingStreak } from "@/hooks/useReadingStreak";

interface ReaderProps {
    chapter: AnalectsChapter;
    bookId?: string;
}

import { useLanguage } from "@/contexts/LanguageContext";

export function Reader({ chapter, bookId = 'analects' }: ReaderProps) {
    const { state } = useLanguage();
    // const [showTranslation, setShowTranslation] = useState(true); // Removed local state
    const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
    const streak = useReadingStreak();

    const fontSizeClasses = {
        sm: "text-lg",
        base: "text-xl",
        lg: "text-2xl",
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
            <nav className="flex items-center justify-end mb-12 sticky top-0 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-md py-4 z-10 transition-colors">
                <div className="flex items-center gap-4">
                    {/* ... streak ... */}
                    {streak > 0 && (
                        <div className="flex items-center text-orange-500 font-sans font-medium text-sm gap-1" title="Reading Streak">
                            <Flame className="w-4 h-4 fill-orange-500" />
                            <span>{streak}</span>
                        </div>
                    )}
                    <div className="w-px h-4 bg-stone-300 dark:bg-stone-700 mx-2" />

                    {/* Removed redundant local toggle button since it is now in header */}

                    <button
                        onClick={() =>
                            setFontSize((prev) =>
                                prev === "sm" ? "base" : prev === "base" ? "lg" : "sm"
                            )
                        }
                        className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                        title="Cycle Font Size"
                    >
                        <Type className="w-5 h-5" />
                    </button>
                </div>
            </nav>

            {/* Chapter Header */}
            <header className="mb-16 text-center">
                <span className="text-stone-400 font-sans text-sm uppercase tracking-widest mb-2 block">
                    Chapter {chapter.chapter_number}
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    {chapter.title}
                </h1>
            </header>

            <div className="space-y-12">
                {chapter.paragraphs?.map((paragraph) => (
                    <div
                        id={paragraph.id} // Added ID for TOC scrolling
                        key={paragraph.id}
                        className="relative pl-6 md:pl-0 md:border-l-0 border-l-2 border-stone-200 dark:border-stone-800 scroll-mt-24" // scroll-mt for offset
                    >
                        {state.showOriginal && (
                            <p
                                className={clsx(
                                    "font-serif font-medium leading-loose text-stone-800 dark:text-stone-200 mb-4 transition-all duration-300",
                                    fontSizeClasses[fontSize]
                                )}
                            >
                                {paragraph.original}
                            </p>
                        )}

                        <AnimatePresence>
                            {state.showTranslation && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="font-sans text-stone-500 dark:text-stone-400 leading-relaxed text-base md:text-lg">
                                        {paragraph.translation}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <div className="mt-24 text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-stone-100 dark:bg-stone-900 text-stone-400">
                    <BookOpen className="w-6 h-6" />
                </div>
            </div>
        </div>
    );
}
