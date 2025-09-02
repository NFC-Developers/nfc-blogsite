import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Use Inter variable font for a modern, neutral UI font.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeuroFics",
  description: "NeuroFics — a place for stories",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
