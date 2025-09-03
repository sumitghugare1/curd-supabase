import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from '@/components/JsonLd';
import { getOrganizationSettings } from "@/services/db";
import Navbar from "@/components/Navbar"; 


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


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch the organization settings dynamically
  const orgSettings = await getOrganizationSettings();

  // Create the schema from the fetched data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": orgSettings.name,
    "url": orgSettings.url,
    "logo": orgSettings.logo,
  };



  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}