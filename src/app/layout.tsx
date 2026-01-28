import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PlannrAI - The 1% Club | AI-Powered Life OS",
  description: "AI-powered life OS for those who can see through the fog. Join the 1% Club and be among the first to transform your goals into reality.",
  keywords: ["AI", "productivity", "goals", "life operating system", "planning", "execution"],
  authors: [{ name: "PlannrAI" }],
  openGraph: {
    title: "PlannrAI - The 1% Club",
    description: "AI-powered life OS for those who can see through the fog.",
    type: "website",
    locale: "en_US",
    siteName: "PlannrAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlannrAI - The 1% Club",
    description: "AI-powered life OS for those who can see through the fog.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
