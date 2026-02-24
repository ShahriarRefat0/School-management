import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // ১. ইমপোর্ট চেক করো
import './globals.css';
import SmoothScroll from '@/components/ui/SmoothScroll';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import Herobackground from '@/components/heroSection/Herobackground';
import { AuthProvider } from '@/context/AuthProvider';

// ২. ইন্টার ফন্টটি কম্পোনেন্টের বাইরে এভাবে ডিফাইন করো
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // এটি পারফরম্যান্সের জন্য ভালো
});

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (!theme) theme = 'light';
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      {/* ৩. এখানে className={`${inter.className}`} ব্যবহার করো */}
      <body
        className={`${inter.className} antialiased flex flex-col min-h-screen bg-[var(--color-bg-page)] text-[var(--color-text-secondary)]`}
      >
        <ThemeProvider>
          <Herobackground />
          <SmoothScroll>
            <AuthProvider>
            {/* ৪. bg-[var(--color-bg-page)] ব্যবহার করো যাতে ডার্ক মোডে সাদা না দেখায় */}
            <main className="flex-grow bg-[var(--color-bg-page)] transition-colors duration-300">
              {children}
            </main>
            </AuthProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}