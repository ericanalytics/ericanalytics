import type { Metadata } from "next";
import localFont from "next/font/local";
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
  description:
    "Improve your digital strategy with a Web Analytics Expert. Optimize your campaigns for better results! Schedule your consultation with Eric Analytics today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
  {/* Website Schema */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Eric Analytics",
        url: "https://ericanalytics.net/",
      }),
    }}
  />

    {/* Person Schema */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Eric Case",
        url: "https://ericanalytics.net/",
        image: "https://imagefa.st/image/eric.7FAV",
        jobTitle: "Leading Data & Web Analytics Services",
        worksFor: {
          "@type": "Organization",
          name: "Eric Analytics",
        },
      }),
    }}
  />

  {/* FAQ Schema */}
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name:
              "Why Choose Eric Analytics as Your Web Analytics Consultant?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "I specialize in various web analytics tools such as Google Analytics, Tag Manager, and Looker Studio to deliver tailored, data-driven insights. Every setup is customized to your business goals—no generic templates, just accurate tracking and clear reporting that helps you improve performance and drive growth.",
            },
          },
          {
            "@type": "Question",
            name:
              "Can Eric Analytics provide data analytics services for businesses operating in multiple countries?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Yes, Eric Analytics offers comprehensive data analytics services that can be tailored for businesses operating globally. By leveraging tools like Google Analytics, Google Tag Manager, and Looker Studio, I can track and analyze user behavior, website performance, and marketing campaigns across different regions.",
            },
          },
          {
            "@type": "Question",
            name: "Can Eric Analytics help with Google Ads optimization?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Yes, I specialize in optimizing Google Ads campaigns by analyzing ad performance, identifying high-performing keywords, refining ad copy, and adjusting bids and budgets.",
            },
          },
          {
            "@type": "Question",
            name:
              "Can Eric Analytics assist with conversion optimization for websites targeting multiple languages or regions?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Definitely. My conversion optimization services include A/B testing and user behavior analysis tailored to different languages and regions.",
            },
          },
          {
            "@type": "Question",
            name: "Who is Eric Case, and what is his expertise?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Eric Case is a dedicated Web Analytics Expert specializing in Google Analytics and Google Ads.",
            },
          },
          {
            "@type": "Question",
            name:
              "What is conversion optimization, and how does it benefit my business?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "Conversion optimization involves using data-driven techniques to turn website visitors into leads or customers.",
            },
          },
          {
            "@type": "Question",
            name:
              "How can I contact Eric Analytics to discuss my analytics needs?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                "You can contact Eric Analytics through the website ericanalytics.net to schedule a consultation.",
            },
          },
        ],
      }),
    }}
  />
  <meta property="og:title" content="Eric Analytics – Data & Web Analytics Services" />
<meta property="og:description" content="Google Analytics, Tag Manager, Looker Studio, and Conversion Optimization Services." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://ericanalytics.net/" />
<meta property="og:image" content="https://ericanalytics.net/images/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />  
  <link rel="icon" href="/favicon.png" sizes="16x16" />
</head>

      <body
        style={{ background: "#000", fontFamily: "Inter, sans-serif" }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDF6XWG7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {children}
      </body>
    </html>
  );
}
