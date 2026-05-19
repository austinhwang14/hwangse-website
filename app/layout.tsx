import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hwang Structural Engineers",
    template: "%s | Hwang Structural Engineers",
  },
  description:
    "Hwang Structural Engineers provides structural engineering services for residential, commercial, public, and specialty projects throughout Southern California.",
  keywords: [
    "Hwang Structural Engineers",
    "structural engineering",
    "Los Angeles structural engineer",
    "Southern California structural engineering",
    "residential structural engineer",
    "commercial structural engineer",
  ],
  authors: [{ name: "Hwang Structural Engineers" }],
  openGraph: {
    title: "Hwang Structural Engineers",
    description:
      "Structural engineering services for residential, commercial, public, and specialty projects throughout Southern California.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0f0f0f] text-white">
        <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-white/10 bg-[#0f0f0f]/85 backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Hwang Structural Engineers logo"
              width={56}
              height={56}
              className="h-12 w-12 rounded-md object-cover"
              priority
            />
          </Link>

          <div className="flex gap-8 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition">
              Home
            </Link>
            <Link href="/projects" className="hover:text-white transition">
              Projects
            </Link>
            <Link href="/about" className="hover:text-white transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Contact
            </Link>
          </div>
        </nav>

        {children}
        <Analytics />
      </body>
    </html>
  );
}