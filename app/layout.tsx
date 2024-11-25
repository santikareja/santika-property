import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Santika Property",
    default: "Santika Property - Temukan Aset Properti Impianmu Disini",
  },
  description: "Temukan properti impian Anda bersama Santika Property. Kami menawarkan berbagai pilihan properti berkualitas dengan lokasi strategis.",
  keywords: ["properti", "rumah", "apartemen", "tanah", "jual beli properti", "sewa properti"],
  alternates: {
    canonical: "https://santikaproperty.com",
    languages: {
      'id-ID': 'https://santikaproperty.com',
      'en-US': 'https://santikaproperty.com/en',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="your-verification-code" />
        <link rel="alternate" hrefLang="id-ID" href="https://santikaproperty.com" />
        <link rel="alternate" hrefLang="en-US" href="https://santikaproperty.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://santikaproperty.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}