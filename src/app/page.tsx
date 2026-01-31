'use client';

import Link from "next/link";
import booksData from "@/data/books.json";
import { Search } from "lucide-react";

export default function Home() {
  const triggerSearch = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true, // Cmd+K
      bubbles: true
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Header */}
        <header className="flex flex-col items-center justify-center mb-16 space-y-8 text-center pt-10">
          <div className="space-y-2">
            <h1 className="text-6xl md:text-8xl font-serif font-black text-stone-800 dark:text-stone-100 tracking-tight">
              中華哲學
            </h1>
            <p className="text-lg md:text-xl text-stone-500 font-serif italic tracking-wide">
              Chinese Philosophy Platform
            </p>
          </div>

          {/* Search Trigger */}
          <div
            onClick={triggerSearch}
            className="w-full max-w-2xl relative cursor-text group"
          >
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-stone-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div className="block w-full pl-14 pr-4 py-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 text-left text-stone-400 text-lg">
              Search for wisdom... <span className="hidden md:inline text-xs border border-stone-200 dark:border-stone-700 rounded px-2 py-1 ml-4 text-stone-300">⌘K</span>
            </div>
          </div>
        </header>

        {/* Book Gallery */}
        <main>
          <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100 mb-8 px-2">
            The Classics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {booksData.map((book) => (
              <Link
                key={book.id}
                href={`/library/${book.id}`}
                className="group relative flex flex-col justify-end h-96 p-8 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Background / Cover */}
                <div className={`absolute inset-0 ${book.coverColor || 'bg-stone-800'} transition-transform duration-700 group-hover:scale-105`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent via-black/20" />

                {/* Content */}
                <div className="relative z-10 space-y-2">
                  <span className="text-stone-300 text-sm font-bold tracking-widest uppercase">
                    {book.author}
                  </span>
                  <h3 className="text-4xl text-white font-serif font-bold">
                    {book.title}
                  </h3>
                  <p className="text-stone-200 text-lg font-serif italic opacity-90">
                    {book.englishTitle}
                  </p>
                  <p className="text-stone-300 text-sm line-clamp-2 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                    {book.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
