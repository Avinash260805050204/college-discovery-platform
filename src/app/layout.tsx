import type { Metadata } from "next";
import "./globals.css";
import Providers from "../components/providers";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "CollegeVerse AI — Discover, Compare, and Analyze Colleges",
  description: "A premium cognitive discovery network designed for students seeking optimized paths in AI, robotics, fintech, and advanced sciences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-black text-white antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <Providers>
          <Navbar />
          <main className="flex-1 flex flex-col relative w-full">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
