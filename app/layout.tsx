import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  //  NEW
  metadataBase: new URL('https://ericanalytics.net'),
  alternates: {
    canonical: '/',
  },

  title: 'Web Analytics Consulting & Conversion Tracking Services',
  description:
    'Expert web analytics consulting services, including Google Analytics, Google Ads, Google Tag Manager, Meta Ads, and web and server-side conversion tracking.',
  icons: {
    icon: '/images/eric-analytics/favicon.ico',
  },
  openGraph: {
    title: 'Web Analytics Consulting & Conversion Tracking Services',
    description:
      'Expert web analytics consulting services, including Google Analytics, Google Tag Manager, Meta Ads, and web and server-side conversion tracking.',
    type: 'website',
    url: 'https://ericanalytics.net/',
    images: ['https://ericanalytics.net/images/eric-analytics/og-image.png'],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.5.0/remixicon.min.css"
        />

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
      </head>
      <body className="min-h-screen bg-[#080808] text-white"
      suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDF6XWG7"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {children}
      </body>
    </html>
  );
}