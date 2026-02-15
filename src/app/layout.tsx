import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/shared/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Schoology BD | Smart School Management Platform",
  description: "The all-in-one solution for schools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        {/* <Navbar /> */}
        <main className="flex-grow bg-bg-page transition-colors duration-300">
          {children}
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}