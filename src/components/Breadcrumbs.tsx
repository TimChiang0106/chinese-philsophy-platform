'use client';

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import booksData from "@/data/books.json";

export function Breadcrumbs({ bookId, chapterId }: { bookId?: string, chapterId?: string }) {
    if (!bookId) return null;

    const book = booksData.find(b => b.id === bookId);
    if (!book) return null;

    return (
        <div className="flex items-center text-sm text-stone-500 mb-6 overflow-x-auto whitespace-nowrap pb-2">
            <Link href="/" className="hover:text-blue-600 transition-colors">Library</Link>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <span className="hover:text-stone-800">{book.school}</span>
            <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
            <Link href={`/library/${bookId}`} className="hover:text-blue-600 transition-colors font-medium text-stone-800 dark:text-stone-200">
                {book.title}
            </Link>
            {chapterId && (
                <>
                    <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
                    <span className="text-stone-800 dark:text-stone-200 font-medium truncate">
                        Chapter {chapterId}
                        {/* We don't have the title here easily without fetching, so just ID or simple label */}
                    </span>
                </>
            )}
        </div>
    );
}
