// lib/schema.ts

const SITE_URL = "https://ericanalytics.net/";

export const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Eric Analytics",
  url: SITE_URL,
  // Logo file ka sahi path yahan daalo (public/images/ ke andar jo file hai)
  logo: "https://ericanalytics.net/images/logo.png",
};

export const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Eric Analytics",
  url: SITE_URL,
};

export const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eric Case",
  url: SITE_URL,
  image: "https://i.imgur.com/1WRlWl8.png",
  jobTitle: "Web Analytics Expert",
  worksFor: {
    "@type": "Organization",
    name: "Eric Analytics",
  },
};

export const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Why choose Eric Analytics as your analytics agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eric Analytics helps businesses improve tracking accuracy, marketing performance, and reporting insights. We focus on reliable data collection, conversion tracking, and campaign optimization to support better business decisions.",
      },
    },
    {
      "@type": "Question",
      name: "Can Eric Analytics provide data analytics services for businesses operating in multiple countries?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Eric Analytics offers comprehensive data analytics services that can be tailored for businesses operating globally. By leveraging tools like Google Analytics, Google Tag Manager, and Looker Studio, I can track and analyze user behavior, website performance, and marketing campaigns across different regions.",
      },
    },
    {
      "@type": "Question",
      name: "Can Eric Analytics help with Google Ads optimization?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, I specialize in optimizing Google Ads campaigns by analyzing ad performance, identifying high-performing keywords, refining ad copy, and adjusting bids and budgets. This ensures your ads target the right audience, leading to higher click-through rates and conversions.",
      },
    },
    {
      "@type": "Question",
      name: "Do you help with Meta Ads tracking setup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, I provide Meta Ads tracking setup and optimization services including CAPI integration, lead generation tracking, conversion attribution, and audience analysis to improve your Meta Ads performance.",
      },
    },
    {
      "@type": "Question",
      name: "Can Eric Analytics assist with conversion optimization for websites targeting multiple languages or regions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Definitely. My conversion optimization services include A/B testing and user behavior analysis tailored to different languages and regions. By leveraging data from Google Analytics and Looker Studio, I identify regional preferences and implement strategies to enhance the user experience and boost conversions.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Eric Case, and what is his expertise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Eric Case is a dedicated Web Analytics Expert specializing in Google Analytics and Google Ads. With extensive experience in digital marketing analytics, he provides tailored solutions to optimize online performance, refine marketing strategies, and enhance customer engagement.",
      },
    },
    {
      "@type": "Question",
      name: "What is conversion optimization, and how does it benefit my business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Conversion optimization involves using data-driven techniques to turn website visitors into leads or customers. I conduct A/B testing, analyze user behavior, and implement strategies to streamline the conversion funnel, reduce drop-offs, and enhance user experience, ultimately increasing sales and revenue.",
      },
    },
    {
      "@type": "Question",
      name: "How can I contact Eric Analytics to discuss my analytics needs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can contact Eric Analytics through the website, ericanalytics.net to schedule a consultation. The Get In Touch section provides details for reaching out to discuss how its Web Analytics and Google Analytics services can support your business growth.",
      },
    },
  ],
};