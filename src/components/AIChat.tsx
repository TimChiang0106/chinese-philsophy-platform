"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "吾乃孔夫子。What troubles you, my student?" },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Apologies, I cannot hear you clearly right now." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const suggestions = ["What is Ren (Benevolence)?", "How to be a good leader?", "Advice on friendship"];

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            onClick={() => setIsOpen(true)}
                            className="bg-stone-800 text-white dark:bg-stone-50 dark:text-stone-900 p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <MessageCircle className="w-6 h-6" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col overflow-hidden z-50 font-sans"
                    >
                        {/* Header */}
                        <div className="bg-stone-50 dark:bg-stone-950 p-4 flex items-center justify-between border-b border-stone-200 dark:border-stone-800">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
                                    <span className="font-serif font-bold text-stone-600 dark:text-stone-300">孔</span>
                                </div>
                                <div>
                                    <h3 className="font-serif font-bold text-stone-800 dark:text-stone-100">Ask Confucius</h3>
                                    <p className="text-xs text-stone-500">AI Wisdom Assistant</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/30" ref={scrollRef}>
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={clsx(
                                        "flex",
                                        msg.role === "user" ? "justify-end" : "justify-start"
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed shadow-sm",
                                            msg.role === "user"
                                                ? "bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900"
                                                : "bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 border border-stone-200 dark:border-stone-700"
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl p-3 flex gap-1 items-center">
                                        <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
                            {messages.length === 1 && (
                                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                                    {suggestions.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => { setInput(s); }}
                                            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-xs text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors border border-stone-200 dark:border-stone-700 flex items-center gap-1"
                                        >
                                            <Sparkles className="w-3 h-3" />
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask for guidance..."
                                    className="flex-1 bg-stone-100 dark:bg-stone-800 border-0 rounded-xl px-4 py-2 text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-stone-500 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="bg-stone-800 dark:bg-stone-100 text-white dark:text-stone-900 p-2 rounded-xl disabled:opacity-50 hover:opacity-90 transition-opacity"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
