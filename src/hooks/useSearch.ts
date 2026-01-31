import { useState, useEffect } from 'react';
import booksData from '../data/books.json';

// Define types for our data
interface Paragraph {
    id: string;
    original: string;
    translation: string;
}

interface Chapter {
    id: string;
    title: string;
    chapter_number: number;
    paragraphs?: Paragraph[];
}

interface Book {
    id: string;
    title: string;
}

export interface SearchResult {
    bookId: string;
    bookTitle: string;
    chapterId: string;
    chapterTitle: string;
    paragraphId?: string;
    content: string;
    type: 'chapter' | 'paragraph';
    matchIndex: number;
}

export function useSearch(query: string) {
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [allData, setAllData] = useState<{ book: Book, chapters: Chapter[] }[]>([]);

    // 1. Load all data on mount
    useEffect(() => {
        async function loadData() {
            const payload: { book: Book, chapters: Chapter[] }[] = [];

            for (const book of booksData) {
                try {
                    // Load chapter index
                    const chaptersIndex = await import(`../data/books/${book.id}/chapters.json`);
                    const chaptersMeta = chaptersIndex.default as Chapter[];

                    // Load full content for each chapter
                    const fullChapters = await Promise.all(chaptersMeta.map(async (meta) => {
                        try {
                            const content = await import(`../data/books/${book.id}/chapters/${meta.id}.json`);
                            return { ...meta, ...content.default };
                        } catch (e) {
                            return meta;
                        }
                    }));

                    payload.push({
                        book: { id: book.id, title: book.title },
                        chapters: fullChapters
                    });

                } catch (e) {
                    console.error(`Failed to load data for book ${book.id}`, e);
                }
            }
            setAllData(payload);
        }

        loadData();
    }, []);

    // 2. Perform Search
    useEffect(() => {
        if (!query || query.trim().length < 2) {
            setResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        const lowerQuery = query.toLowerCase();
        const newResults: SearchResult[] = [];

        // Search logic
        allData.forEach(({ book, chapters }) => {
            chapters.forEach(chapter => {
                // A. Search in Chapter Title
                if (chapter.title.includes(query)) {
                    newResults.push({
                        bookId: book.id,
                        bookTitle: book.title,
                        chapterId: chapter.id,
                        chapterTitle: chapter.title,
                        content: chapter.title,
                        type: 'chapter',
                        matchIndex: 0
                    });
                }

                // B. Search in Paragraphs
                if (chapter.paragraphs) {
                    chapter.paragraphs.forEach(para => {
                        // Check original text
                        if (para.original.includes(query)) {
                            newResults.push({
                                bookId: book.id,
                                bookTitle: book.title,
                                chapterId: chapter.id,
                                chapterTitle: chapter.title,
                                paragraphId: para.id,
                                content: para.original,
                                type: 'paragraph',
                                matchIndex: para.original.indexOf(query)
                            });
                        }
                        // Check translation
                        else if (para.translation.toLowerCase().includes(lowerQuery)) {
                            newResults.push({
                                bookId: book.id,
                                bookTitle: book.title,
                                chapterId: chapter.id,
                                chapterTitle: chapter.title,
                                paragraphId: para.id,
                                content: para.translation,
                                type: 'paragraph',
                                matchIndex: para.translation.toLowerCase().indexOf(lowerQuery)
                            });
                        }
                    });
                }
            });
        });

        setResults(newResults);
        setIsSearching(false);

    }, [query, allData]);

    return { results, isSearching };
}
