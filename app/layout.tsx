import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Corrected: Separate viewport export
export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

// ✅ Metadata (excluding viewport)
export const metadata: Metadata = {
  title: "BitsUp",
  description: "BitsUp is a quiz platform where you can test your skills, challenge peers, and track your progress—all without registration. Simply enter your GitHub username and start learning!",
  metadataBase: new URL("https://bits-up.vercel.app/"), // ✅ Replace with your actual domain
  icons: "/favicon.ico",
  keywords: ["quiz platform", "online quizzes", "aptitude tests", "skill assessment", "leaderboard", "competitive learning", "BitsUp", "coding challenges", "logic puzzles", "math quizzes", "GitHub integration", "knowledge tests", "self-improvement"],
  authors: [{ name: "Deepak D Nayak", url: "https://bits-up.vercel.app//" }],
  openGraph: {
    title: "BitsUp",
    description: "BitsUp is a quiz platform where you can test your skills, challenge peers, and track your progress—all without registration. Simply enter your GitHub username and start learning!",
    url: "https://bits-up.vercel.app/",
    siteName: "BitsUp",
    images: [
      {
        url: "/logo.png", // ✅ Ensure this image exists in public/
        width: 1200,
        height: 630,
        alt: "BitsUp Preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitsUp",
    description: "BitsUp is a quiz platform where you can test your skills, challenge peers, and track your progress—all without registration. Simply enter your GitHub username and start learning!",
    images: ["/logo.png"], // ✅ Ensure this image exists in public/
  },
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
        
        <AdminAuthProvider>{children}</AdminAuthProvider>
      </body>
    </html>
  );
}
