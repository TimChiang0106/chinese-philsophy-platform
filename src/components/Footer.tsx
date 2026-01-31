"use client";

import Link from "next/link";

export function Footer() {
    // Current date for "Last updated"
    const lastUpdated = new Date().toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <footer className="mt-auto py-12 px-8 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 text-stone-500 dark:text-stone-400 text-sm font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="font-bold text-stone-700 dark:text-stone-200 mb-4">About us</h3>
                    <p className="leading-relaxed">
                        Dedicated to making Chinese philosophy accessible to the modern world through clean design and technology.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-stone-700 dark:text-stone-200 mb-4">Site terms</h3>
                    <p className="leading-relaxed">
                        Welcome for everyone to use (歡迎任何人使用).
                        <br />
                        This project is open source and free for educational purposes.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-stone-700 dark:text-stone-200 mb-4">Last Updated</h3>
                    <p className="leading-relaxed">
                        {lastUpdated}
                    </p>
                </div>
            </div>
        </footer>
    );
}
