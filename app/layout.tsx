import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://hwangse.com"),
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
    "seismic retrofit",
    "structural design",
  ],
  authors: [{ name: "Hwang Structural Engineers" }],
  openGraph: {
    title: "Hwang Structural Engineers",
    description:
      "Structural engineering services for residential, commercial, public, and specialty projects throughout Southern California.",
    url: "https://hwangse.com",
    siteName: "Hwang Structural Engineers",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hwang Structural Engineers",
    description:
      "Structural engineering services for residential, commercial, public, and specialty projects throughout Southern California.",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
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
        <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/65 px-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:px-8 sm:py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Hwang Structural Engineers logo"
              width={56}
              height={56}
              className="h-10 w-10 rounded-md object-cover sm:h-12 sm:w-12"
              priority
            />
          </Link>

          <div className="flex gap-4 text-xs text-gray-300 sm:gap-8 sm:text-sm">
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