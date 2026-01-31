"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type LanguageState = {
    showOriginal: boolean;
    showTranslation: boolean;
};

type LanguageContextType = {
    state: LanguageState;
    toggleOriginal: () => void;
    toggleTranslation: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    // Default to both on
    const [state, setState] = useState<LanguageState>({
        showOriginal: true,
        showTranslation: true,
    });

    const toggleOriginal = () => {
        setState((prev) => {
            // Prevent turning off both
            if (prev.showOriginal && !prev.showTranslation) {
                return prev;
            }
            return { ...prev, showOriginal: !prev.showOriginal };
        });
    };

    const toggleTranslation = () => {
        setState((prev) => {
            // Prevent turning off both
            if (prev.showTranslation && !prev.showOriginal) {
                return prev;
            }
            return { ...prev, showTranslation: !prev.showTranslation };
        });
    };

    return (
        <LanguageContext.Provider value={{ state, toggleOriginal, toggleTranslation }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
