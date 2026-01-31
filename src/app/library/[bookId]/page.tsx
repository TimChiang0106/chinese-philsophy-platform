import { ChapterList } from "@/components/ChapterList";
import booksData from "@/data/books.json";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// Generate static params for all books
export function generateStaticParams() {
    return booksData.map((book) => ({
        bookId: book.id,
    }));
}

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
    const { bookId } = await params;
    const book = booksData.find((b) => b.id === bookId);

    if (!book) {
        return notFound();
    }

    return (
        <div className="bg-stone-50 dark:bg-stone-950 p-8 md:p-12 lg:p-16 min-h-[calc(100vh-64px)]">
            <div className="max-w-5xl mx-auto">
                <div className="mb-4">
                    <Breadcrumbs bookId={bookId} />
                </div>

                <div className="mb-12 border-b border-stone-200 dark:border-stone-800 pb-8">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
                        {book.title}
                    </h1>
                    <p className="text-xl text-stone-500 font-serif italic">
                        {book.englishTitle} • {book.author}
                    </p>
                </div>

                <ChapterList bookId={bookId} />
            </div>
        </div>
    );
}
