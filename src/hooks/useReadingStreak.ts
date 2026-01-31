"use client";

import { useState, useEffect } from "react";

export function useReadingStreak() {
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const today = new Date().toDateString();
        const lastRead = localStorage.getItem("last-read-date");
        const currentStreak = parseInt(localStorage.getItem("reading-streak") || "0", 10);

        if (lastRead === today) {
            setStreak(currentStreak);
        } else if (lastRead === new Date(Date.now() - 86400000).toDateString()) {
            // Streak continues
            const newStreak = currentStreak + 1;
            setStreak(newStreak);
            localStorage.setItem("reading-streak", newStreak.toString());
            localStorage.setItem("last-read-date", today);
        } else {
            // Streak reset or new
            setStreak(1);
            localStorage.setItem("reading-streak", "1");
            localStorage.setItem("last-read-date", today);
        }
    }, []);

    return streak;
}
