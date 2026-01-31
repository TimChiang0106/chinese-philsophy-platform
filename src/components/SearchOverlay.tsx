'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, ArrowRight } from 'lucide-react';
import { useSearch, SearchResult } from '../hooks/useSearch';
import { useRouter } from 'next/navigation';

export function SearchOverlay() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const { results, isSearching } = useSearch(query);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Toggle search with keyboard shortcut (Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSelect = (result: SearchResult) => {
        setIsOpen(false);
        setQuery('');
        if (result.type === 'chapter') {
            router.push(`/library/${result.bookId}/${result.chapterId}`);
        } else if (result.paragraphId) {
            // Navigate to chapter + anchor
            // Need to ensure the reader page handles anchors if we implement that, 
            // or just go to chapter for now.
            router.push(`/library/${result.bookId}/${result.chapterId}#${result.paragraphId}`);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 md:right-10 md:bottom-10 z-50 p-4 bg-stone-800 text-white rounded-full shadow-lg hover:bg-stone-700 transition-all active:scale-95 md:hidden"
                aria-label="Search"
            >
                <Search size={24} />
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-stone-100/90 dark:bg-stone-950/95 backdrop-blur-sm transition-all duration-200 p-4 md:p-12 flex flex-col items-center">

            {/* Close Button */}
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
                <X size={32} />
            </button>

            {/* Search Container */}
            <div className="w-full max-w-3xl mt-12 md:mt-24">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-600 dark:group-focus-within:text-stone-200 transition-colors" size={24} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for wisdom... (e.g. 'friend', 'learning', '仁')"
                        className="w-full bg-white dark:bg-stone-900 border-2 border-transparent focus:border-stone-300 dark:focus:border-stone-700 rounded-2xl py-5 pl-14 pr-6 text-xl md:text-2xl outline-none shadow-xl placeholder:text-stone-300 dark:placeholder:text-stone-700 transition-all font-serif"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* Results */}
                <div className="mt-8 space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {isSearching ? (
                        <div className="text-center text-stone-400 py-12">Searching the analects...</div>
                    ) : results.length > 0 ? (
                        results.map((result, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleSelect(result)}
                                className="group flex flex-col gap-2 p-4 bg-white dark:bg-stone-900/50 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-800 border border-transparent hover:border-stone-200 dark:hover:border-stone-700 cursor-pointer transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold flex items-center gap-2">
                                        <BookOpen size={14} />
                                        {result.chapterTitle}
                                        {result.paragraphId && <span className="opacity-50">/ {result.paragraphId}</span>}
                                    </span>
                                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-stone-400" />
                                </div>
                                <p className="font-serif text-lg text-stone-800 dark:text-stone-200 line-clamp-2">
                                    {result.type === 'chapter' ? (
                                        <span className="text-xl font-bold">Chapter {result.chapterTitle}</span>
                                    ) : (
                                        highlightMatch(result.content, query)
                                    )}
                                </p>
                            </div>
                        ))
                    ) : query.length > 1 ? (
                        <div className="text-center text-stone-400 py-12">No wisdom found matching "{query}"</div>
                    ) : null}

                    {/* Suggestions when empty */}
                    {!query && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 opacity-60">
                            {['Benevolence (仁)', 'Learning (學)', 'Gentleman (君子)', 'Filial Piety (孝)'].map(term => (
                                <button
                                    key={term}
                                    onClick={() => setQuery(term.split(' ')[0].toLowerCase())} // simplistic logic for demo
                                    className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-stone-400 dark:hover:border-stone-600 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 transition-all text-sm font-medium"
                                >
                                    {term}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper for highlighting text
function highlightMatch(text: string, query: string) {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
        <span>
            {parts.map((part, i) =>
                part.toLowerCase() === query.toLowerCase()
                    ? <span key={i} className="bg-yellow-200 dark:bg-yellow-900/50 text-stone-900 dark:text-stone-100 rounded px-1">{part}</span>
                    : part
            )}
        </span>
    );
}
