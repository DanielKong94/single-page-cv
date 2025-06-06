import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
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
  title: "Daniel Kong: Fullstack Developer & Team Leader in Malaysia",
  description: "Experienced Fullstack Developer and Team Leader based in Malaysia, specializing in Laravel, Next.js, and AWS. Let's build something amazing together. View my portfolio and get in touch!",
  applicationName: "Daniel Kong's Portfolio",
  authors: [{ name: 'Daniel Kong' }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  creator: 'Daniel Kong',
  publisher: 'Daniel Kong',
  openGraph: {
    title: "Daniel Kong | Fullstack Developer & Team Leader",
    description: "Building scalable and efficient web applications with a passion for clean code and user experience.",
    url: 'https://danielkong.xyz', // Replace with your actual URL
    siteName: 'Daniel Kong\'s Portfolio',
    // images: [
    //   {
    //     url: 'https://your-website.com/og-image.jpg', // Replace with a compelling image URL (1200x630px recommended)
    //     width: 1200,
    //     height: 630,
    //     alt: 'A professional image of Daniel Kong or a project he has worked on',
    //   },
    // ],
    locale: 'en_MY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Kong | Fullstack Developer & Team Leader',
    description: 'Building scalable and efficient web applications with a passion for clean code and user experience.',
    // images: ['https://your-website.com/twitter-image.jpg'], // Replace with a compelling image URL
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>
          {children}
        </main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}