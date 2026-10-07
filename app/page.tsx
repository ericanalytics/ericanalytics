import Header from '@/components/feature/Header';
import Footer from '@/components/feature/Footer';
import HeroSection from '@/components/home/HeroSection';
import TrustSection from '@/components/home/TrustSection';
import ProblemSection from '@/components/home/ProblemSection';
import ProcessSection from '@/components/home/ProcessSection';
import SolutionSection from '@/components/home/SolutionSection';
import ImpactSection from '@/components/home/ImpactSection';
import ServicesSection from '@/components/home/ServicesSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import IndustriesSection from '@/components/home/IndustriesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import AboutSection from '@/components/home/AboutSection';
import FAQSection from '@/components/home/FAQSection';
import ContactSection from '@/components/home/ContactSection';

// ✅ NEW: schema imports
import JsonLd from '@/components/JsonLd';
import { organization, website, person, faq } from '@/lib/schema';

export default function Home() {
  return (
    <>
      {/* ✅ NEW: JSON-LD schemas */}
      <JsonLd data={organization} />
      <JsonLd data={website} />
      <JsonLd data={person} />
      <JsonLd data={faq} />

      <Header />
      <main>
        <HeroSection />
        <TrustSection />
        <ProblemSection />
        <ProcessSection />
        <SolutionSection />
        <ImpactSection />
        <ServicesSection />
        <WhyChooseSection />
        <IndustriesSection />
        <TestimonialsSection />
        <AboutSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}