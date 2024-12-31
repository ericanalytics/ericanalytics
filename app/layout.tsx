import type { Metadata } from "next";
import localFont from "next/font/local";
import Head from 'next/head';
import Script from 'next/script';
import "./style.css";

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

export const metadata: Metadata = {
  title: "Leading Data & Web Analytics Services | Eric Analytics",
  description: "Improve your digital strategy with a Web Analytics Expert. Optimize your campaigns for better results! Schedule your consultation with Eric Analytics today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

<Head>
      {/* Add your components here */}
      {/* Using Next.js Script component for loading external scripts */}
      <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" strategy="beforeInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.2/dist/umd/popper.min.js" strategy="beforeInteractive" />
      <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" strategy="beforeInteractive" />

      <link rel="canonical" href="https://www.ericanalytics.net/" />
      {/* Adding fonts using link tags */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <meta name="google-site-verification" content="dkHfE2aXKPhzbglrht7IvsCHbOos63FWj3kyTT4JNvM" />


    </Head>
      {/* Google Tag Manager */}
      <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MDF6XWG7');`,
          }}
        />
      {/* End Google Tag Manager */}
      <body style={{ background: '#000', fontFamily: 'Inter, sans-serif'}}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDF6XWG7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
