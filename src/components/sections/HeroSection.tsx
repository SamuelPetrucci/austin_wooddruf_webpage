'use client';

import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import AnimatedSection from '@/components/AnimatedSection';

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0}>
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Protect What Matters Most
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Comprehensive life and health insurance solutions tailored to your unique needs. 
                Get the protection you deserve with personalized coverage from Jordan Smith, 
                your dedicated insurance professional with over 490 active clients and 600+ families served.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('quote')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get Your Free Quote
                </button>
                <button 
                  onClick={() => scrollToSection('quote')}
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  Schedule a Meeting
                </button>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
                <div className="text-center space-y-6">
                  <ShieldCheckIcon className="h-16 w-16 text-blue-600 mx-auto animate-pulse" />
                  <h3 className="text-2xl font-bold text-gray-900">Trusted Protection</h3>
                  <div className="flex justify-center space-x-8">
                    <div className="text-center transform hover:scale-110 transition-transform duration-300">
                      <div className="text-3xl font-bold text-blue-600">490+</div>
                      <div className="text-sm text-gray-600">Active Clients</div>
                    </div>
                    <div className="text-center transform hover:scale-110 transition-transform duration-300">
                      <div className="text-3xl font-bold text-blue-600">600+</div>
                      <div className="text-sm text-gray-600">Families Helped</div>
                    </div>
                    <div className="text-center transform hover:scale-110 transition-transform duration-300">
                      <div className="text-3xl font-bold text-blue-600">2+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
