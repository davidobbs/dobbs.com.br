import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Davi Dobbs | Engenheiro de Software & IA Aplicada',
    template: '%s | Davi Dobbs',
  },
  description:
    'Engenheiro de Software especializado em IA aplicada. Blog técnico sobre LLMs, agentes, automação, arquitetura de software e aplicações práticas de IA em negócios.',
  keywords: [
    'Davi Dobbs',
    'Engenheiro de Software',
    'IA Aplicada',
    'Inteligência Artificial',
    'LLMs',
    'Agentes de IA',
    'Automação',
    'Arquitetura de Software',
    'Blog Técnico',
  ],
  authors: [{ name: 'Davi Dobbs' }],
  creator: 'Davi Dobbs',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://dobbs.com.br',
    siteName: 'Davi Dobbs',
    title: 'Davi Dobbs | Engenheiro de Software & IA Aplicada',
    description:
      'Engenheiro de Software especializado em IA aplicada. Blog técnico sobre LLMs, agentes, automação e arquitetura de software.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Davi Dobbs | Engenheiro de Software & IA Aplicada',
    description:
      'Engenheiro de Software especializado em IA aplicada. Blog técnico sobre LLMs, agentes, automação e arquitetura de software.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingChatButton } from '@/components/chat/FloatingChatButton';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased bg-primary-50 text-neutral-200 min-h-screen">
        <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-40 pointer-events-none" />
        <div className="relative">
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
          <FloatingChatButton />
        </div>
      </body>
    </html>
  );
}

