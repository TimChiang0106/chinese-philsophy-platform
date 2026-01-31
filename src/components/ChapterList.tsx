import Link from "next/link";
import { getChaptersForBook, Chapter } from "@/lib/books";

interface ChapterListProps {
    bookId: string;
}

export async function ChapterList({ bookId }: ChapterListProps) {
    const chapters = await getChaptersForBook(bookId);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 pb-12">
            {chapters.map((chapter) => (
                <Link
                    href={`/library/${bookId}/${chapter.id}`}
                    key={chapter.id}
                    className="group relative flex flex-col justify-between h-48 p-6 bg-white dark:bg-stone-900 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 dark:border-stone-800 hover:-translate-y-1 overflow-hidden"
                >
                    {/* Card Decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 dark:bg-stone-800 rounded-bl-full -mr-4 -mt-4 transition-colors group-hover:bg-stone-100 dark:group-hover:bg-stone-700" />

                    <div className="relative z-10">
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase text-stone-500 bg-stone-100 dark:bg-stone-800 rounded-full">
                            Chapter {chapter.chapter_number}
                        </span>
                        <h2 className="text-3xl font-serif font-bold text-stone-800 dark:text-stone-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {chapter.title}
                        </h2>
                    </div>

                    <div className="relative z-10 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Read Now →</span>
                    </div>
                </Link>
            ))}
        </div>
    );
}
