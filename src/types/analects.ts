export interface Paragraph {
    id: string;
    original: string;
    translation: string;
}

export interface Chapter {
    id: string;
    title: string;
    chapter_number: number;
    paragraphs?: Paragraph[];
}
// Alias for backward compatibility if needed, or just refactor usage
export type AnalectsParagraph = Paragraph;
export type AnalectsChapter = Chapter;
