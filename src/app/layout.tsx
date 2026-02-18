import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/ui/SmoothScroll';
import ThemeInitializer from '@/components/ThemeInitializer/ThemeInitializer';
import Herobackground from '@/components/heroSection/Herobackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Schoology BD | Smart School Management Platform',
  description: 'The all-in-one solution for schools.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen`}
      >
        <ThemeInitializer />
        <Herobackground/>
        <SmoothScroll>
          <main className="flex-grow bg-bg-page transition-colors duration-300">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
