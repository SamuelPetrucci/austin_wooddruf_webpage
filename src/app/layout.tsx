import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JS Health Solutions - Insurance Protection You Can Trust",
  description: "Comprehensive life and health insurance solutions from Jordan Smith. Serving 30 states with personalized coverage and dedicated support.",
  keywords: ["insurance", "life insurance", "health insurance", "Jordan Smith", "JS Health Solutions", "Tampa insurance", "Florida insurance"],
  authors: [{ name: "Jordan Smith" }],
  creator: "JS Health Solutions",
  publisher: "JS Health Solutions",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jshealthsolutions.com',
    siteName: 'JS Health Solutions',
    title: 'JS Health Solutions - Insurance Protection You Can Trust',
    description: 'Comprehensive life and health insurance solutions from Jordan Smith. Serving 30 states with personalized coverage and dedicated support.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'JS Health Solutions Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JS Health Solutions - Insurance Protection You Can Trust',
    description: 'Comprehensive life and health insurance solutions from Jordan Smith. Serving 30 states with personalized coverage and dedicated support.',
    images: ['/logo.png'],
    creator: '@jshealthsolutions',
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
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
