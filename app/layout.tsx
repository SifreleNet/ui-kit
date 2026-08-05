import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const BASE_URL = 'https://sifrelenet-ui-kit.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
  ),
  title: {
    default: 'sifreleNet | Cyber UI Kit',
    template: '%s | sifreleNet',
  },
  description:
    'SifreleNet Cyberpunk and Cybersecurity UI Kit. Futuristic, modular React primitives & components.',
  keywords: [
    'cybersecurity',
    'ui kit',
    'react components',
    'cyberpunk',
    'futuristic design',
    'developer',
    'web security',
    'design system',
  ],
  authors: [{ name: 'sifreleNet', url: BASE_URL }],
  creator: 'sifreleNet',
  publisher: 'sifreleNet',
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'sifreleNet | Cyber UI Kit',
    description:
      'SifreleNet Cyberpunk and Cybersecurity UI Kit. Futuristic, modular React primitives & components.',
    url: BASE_URL,
    siteName: 'sifreleNet UI Kit',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'sifreleNet — Cyber UI Kit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'sifreleNet | Cyber UI Kit',
    description:
      'SifreleNet Cyberpunk and Cybersecurity UI Kit. Futuristic, modular React primitives & components.',
    images: [`${BASE_URL}/og-image.png`],
    creator: '@sifreleNet',
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
      className={`${geistMono.variable} h-full`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#00ff9f] font-mono antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-[#1a2e1a] py-4 px-6 text-center text-[#00ff9f44] text-xs">
          <span> sifrelenet ~ 2026 — stay curious, stay secure</span>
        </footer>
      </body>
    </html>
  );
}
