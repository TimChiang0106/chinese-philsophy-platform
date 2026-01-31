import type { Metadata } from "next";
import { Inter, Noto_Serif_TC, Roboto } from "next/font/google";
import { AIChat } from "@/components/AIChat";
import { SearchOverlay } from "@/components/SearchOverlay";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSerifTC = Noto_Serif_TC({
  weight: ["400", "500", "600", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto-serif-tc",
  display: "swap",
});

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Chinese Philosophy Platform",
  description: "A modern, unified platform for reading Chinese classics.",
};

import { LanguageProvider } from "@/contexts/LanguageContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSerifTC.variable} ${roboto.variable} antialiased bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100 flex flex-col min-h-screen font-sans`}
      >
        <LanguageProvider>
          <ClientLayout>
            {children}
          </ClientLayout>

          <AIChat />
          <SearchOverlay />
        </LanguageProvider>
      </body>
    </html>
  );
}
