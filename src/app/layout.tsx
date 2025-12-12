import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import FloatingCallButton from '@/components/FloatingCallButton';
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
  metadataBase: new URL('https://austinwoodruffinsurance.com'),
  title: "Austin Woodruff Insurance - 100% Client Focused Insurance Protection",
  description: "Trusted insurance protection you can count on. 100% client focused life and health insurance solutions with personalized coverage and dedicated support.",
  keywords: ["insurance", "life insurance", "health insurance", "Austin Woodruff", "Austin Woodruff Insurance", "insurance professional", "insurance agent", "client focused"],
  authors: [{ name: "Austin Woodruff" }],
  creator: "Austin Woodruff Insurance",
  publisher: "Austin Woodruff Insurance",
  icons: {
    icon: '/logoimg.png',
    shortcut: '/logoimg.png',
    apple: '/logoimg.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://austinwoodruffinsurance.com',
    siteName: 'Austin Woodruff Insurance',
    title: 'Austin Woodruff Insurance - Trusted Protection You Can Count On',
    description: '100% client focused insurance solutions. Trusted protection for life and health with personalized coverage and dedicated support.',
    images: [
      {
        url: '/logoimg.png',
        width: 1200,
        height: 630,
        alt: 'Austin Woodruff Insurance Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Austin Woodruff Insurance - Trusted Protection You Can Count On',
    description: '100% client focused insurance solutions. Trusted protection for life and health with personalized coverage.',
    images: ['/logoimg.png'],
    creator: '@austinwoodruffinsurance',
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
        <FloatingCallButton />
        <Analytics />
      </body>
    </html>
  );
}
