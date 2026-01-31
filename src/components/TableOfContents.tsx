"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

interface TableOfContentsProps {
    paragraphs: { id: string; original: string }[];
}

export function TableOfContents({ paragraphs }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observers: IntersectionObserverEntry[] = [];
        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(callback, {
            rootMargin: "-20% 0px -60% 0px", // Trigger when top of element is 20% down
        });

        paragraphs.forEach((p) => {
            const el = document.getElementById(p.id); // Assuming paragraphs have IDs in Reader
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [paragraphs]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            setActiveId(id);
        }
    };

    return (
        <div className="hidden xl:block w-64 sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pl-8 border-l border-stone-200 dark:border-stone-800">
            <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest mb-4">
                On this page
            </h4>
            <ul className="space-y-1">
                {paragraphs.map((p, idx) => {
                    const isActive = activeId === p.id;
                    return (
                        <li key={p.id}>
                            <button
                                onClick={() => scrollTo(p.id)}
                                className={clsx(
                                    "text-left text-xs transition-colors w-full py-1 leading-snug truncate",
                                    isActive
                                        ? "text-blue-600 dark:text-blue-400 font-medium"
                                        : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
                                )}
                                title={p.original}
                            >
                                {p.original.substring(0, 12)}...
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
