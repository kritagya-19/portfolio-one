import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-code',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aditya - Portfolio',
  description: 'Portfolio hero section for Aditya, independent freelancer, UI/UX designer, video editor, and creative developer.',
  openGraph: {
    title: 'Aditya - Portfolio',
    description: 'Portfolio hero section for Aditya, independent freelancer, UI/UX designer, video editor, and creative developer.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya - Portfolio',
    description: 'Portfolio hero section for Aditya, independent freelancer, UI/UX designer, video editor, and creative developer.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        {children}
      </body>
    </html>
  );
}
