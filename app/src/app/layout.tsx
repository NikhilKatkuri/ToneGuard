import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  fallback: [
    " Inter",
    " -apple-system",
    " BlinkMacSystemFont",
    "Segoe UI",
    " Roboto",
    " Oxygen",
    " Ubuntu",
    " Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    " sans-serif",
  ],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  fallback: [
    "Menlo",
    "Monaco",
    "Lucida Console",
    "Liberation Mono",
    "DejaVu Sans Mono",
    "Bitstream Vera Sans Mono",
    "Courier New",
    "monospace",
  ],
});

export const metadata: Metadata = {
  title: "ToneGuard",
  description:
    "A rule-driven AI system for generating professional emails, letters, and messages with strict communication constraints",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
