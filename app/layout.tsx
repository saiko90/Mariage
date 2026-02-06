import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Lato, Cormorant_Garamond } from 'next/font/google';

// Titres & Gros textes
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

// Textes courants
const lato = Lato({ 
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-sans',
  display: 'swap',
});

// Touche italique très élégante pour les détails
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-alt',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sophie & Thomas - 14.08.2026',
  description: 'Le mariage de Sophie & Thomas. Confirmez votre présence.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${lato.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="bg-slate-950 text-amber-50 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}