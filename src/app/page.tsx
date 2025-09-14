import Navigation from '@/components/sections/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import InsuranceCarriersBanner from '@/components/sections/InsuranceCarriersWheel';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import AboutSection from '@/components/sections/AboutSection';
import StatesSection from '@/components/sections/StatesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import QuoteAndBookingSection from '@/components/sections/QuoteAndBookingSection';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <InsuranceCarriersBanner />
      <WhyChooseUsSection />
      <AboutSection />
      <StatesSection />
      <TestimonialsSection />
      <QuoteAndBookingSection />
      <Footer />
    </div>
  );
}