import type { Metadata } from "next";
import localFont from "next/font/local";
import "./style.css";
import Head from "next/head"; // Import Head from next/head

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Define the canonical URL here
const canonicalUrl = "https://ericanalyticsnet.vercel.app/";

export const metadata: Metadata = {
  title: "Achieve Digital Excellence with Data Analytics Exploration",
  description: "Maximize your website's performance with Data Analytics Consulting services. As an expert in Digital Marketing Analytics, Web Analytics, and Google Data Analytics, I offer tailored solutions and actionable insights to help you achieve your digital marketing goals.",
  // You can also include canonical here if you want
  // canonical: canonicalUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="canonical" href={canonicalUrl} /> {/* Add canonical tag here */}
      </Head>
      <body
        style={{ background: '#000', fontFamily: 'Inter, sans-serif'}}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
