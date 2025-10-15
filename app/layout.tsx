import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lexical Analyzer & Parser | Modern Compiler Tool",
  description: "Interactive lexical analyzer and parser with real-time visualization, parse tree generation, and symbol table analysis.",
  keywords: "lexical analyzer, parser, compiler, syntax analysis, parse tree, token analysis",
  authors: [{ name: "Lexical Analyzer Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#7c3aed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7c3aed" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <div className="gradient-bg min-h-screen">
          <div className="min-h-screen backdrop-filter backdrop-blur-sm">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}