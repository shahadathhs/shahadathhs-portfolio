import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/shared/nav/Navbar';
import Footer from '@/components/shared/Footer';
import ScrollToTop from '@/components/shared/ScrollToTop';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shahadath H. Sajib | Backend Engineer',
  description:
    'Backend and DevOps engineer: Node.js, Python, Docker, CI/CD. Freelance on Fiverr for Linux servers, deploys, and scalable APIs. Microservices and AI-powered automation.',
  keywords: [
    'Backend Engineer',
    'Node.js',
    'PostgreSQL',
    'Microservices',
    'AI Automation',
    'Shahadath H. Sajib',
    'Fiverr',
    'Freelance DevOps',
    'Backend API',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <main className="container mx-auto max-w-6xl px-2 lg:px-4 min-h-screen">
          <Navbar />
          {children}
          <Footer />
        </main>
        <ScrollToTop />
      </body>
    </html>
  );
}
