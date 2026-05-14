import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Outfit, Krona_One } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import ReduxProvider from './reduxProvider';
import SmoothScroll from '@/components/SmoothScroll';

const cinzel = Cinzel({
  variable: '--font-cinzel',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

const kronaOne = Krona_One({
  variable: '--font-krona-one',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Royal Palace',
  description: 'Luxury Hotel & Resort Experience',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${cinzel.variable} ${cormorantGaramond.variable} ${outfit.variable} ${kronaOne.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <SmoothScroll>
              {children}
            </SmoothScroll>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
