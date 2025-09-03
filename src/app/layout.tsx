import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from '@/components/JsonLd';


export const metadata = {
  title: {
    template: '%s | Company Name',
    default: 'supabase curd app | A supabase app',
  },
  description: 'this is a simple curd app.',
};


const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "supabase curd app",
  "url": "https://curd-supabase.vercel.app/",
  "logo": "https://curd-supabase.vercel.app/logo.png",
};


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}