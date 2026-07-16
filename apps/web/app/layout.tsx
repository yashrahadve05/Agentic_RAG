import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Athleia — Industrial Knowledge Intelligence Platform",
  description:
    "Athleia transforms scattered industrial documents into connected organizational intelligence. Searchable knowledge, grounded AI answers, and full citation traceability for engineering teams.",
  keywords: [
    "industrial knowledge management",
    "engineering AI",
    "knowledge graph",
    "document intelligence",
    "industrial AI platform",
  ],
  openGraph: {
    title: "Athleia — Industrial Knowledge Intelligence Platform",
    description:
      "Transform scattered industrial documents into connected organizational intelligence.",
    type: "website",
    url: "https://athleia.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
