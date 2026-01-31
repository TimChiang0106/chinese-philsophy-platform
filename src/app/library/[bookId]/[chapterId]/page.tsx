import { Reader } from "@/components/Reader";
import { getChapterContent, getChaptersForBook } from "@/lib/books";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents } from "@/components/TableOfContents";

// Generate params for static export
export async function generateStaticParams() {
    // This is getting complex for static export with all books and chapters.
    // For now, let's just do it for Analects. In a real app we'd iterate books.json.
    // But since `getChaptersForBook` is async, we can do this properly.

    // Simplification: We won't pre-generate all pages for now to save build time in this demo,
    // or we'd import booksData and iterate.
    return [];
}

export default async function ChapterPage({ params }: { params: Promise<{ bookId: string, chapterId: string }> }) {
    const { bookId, chapterId } = await params;
    const chapterContent = await getChapterContent(bookId, chapterId);

    if (!chapterContent) {
        return notFound();
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-stone-50 dark:bg-stone-950">
            <div className="max-w-3xl mx-auto px-4 pt-6">
                <Breadcrumbs bookId={bookId} chapterId={chapterId} />
            </div>
            <Reader chapter={chapterContent} bookId={bookId} />
        </div>
    );
}
