import booksData from "@/data/books.json";

export interface Book {
    id: string;
    title: string;
    englishTitle: string;
    author: string;
    description: string;
    coverColor?: string;
}

export interface Chapter {
    id: string;
    title: string;
    chapter_number: number;
    preview?: string;
    paragraphs?: Paragraph[];
}

export interface Paragraph {
    id: string;
    original: string;
    translation: string;
}

export function getAllBooks(): Book[] {
    return booksData;
}

export async function getChaptersForBook(bookId: string): Promise<Chapter[]> {
    try {
        // Dynamically import the chapters.json for the specific book
        // Note: This relies on the file structure /src/data/books/[bookId]/chapters.json
        const data = await import(`@/data/books/${bookId}/chapters.json`);
        // The import might return the module, so we look for default export
        return data.default as Chapter[];
    } catch (error) {
        console.error(`Failed to load chapters for book ${bookId}:`, error);
        return [];
    }
}

export async function getChapterContent(bookId: string, chapterId: string): Promise<Chapter | null> {
    try {
        // Load specific chapter content
        const data = await import(`@/data/books/${bookId}/chapters/${chapterId}.json`);
        return data.default as Chapter;
    } catch (error) {
        console.error(`Failed to load chapter content ${chapterId} for book ${bookId}:`, error);
        return null;
    }
}
