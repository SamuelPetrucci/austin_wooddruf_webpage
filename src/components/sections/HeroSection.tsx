'use client';

import { ShieldCheckIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="pt-20 relative overflow-hidden">
      {/* Professional Background */}
      <div className="absolute inset-0">
        {/* Clean gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100"></div>
        
        {/* Animated gradient wave overlay - More visible */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/20 via-transparent to-slate-300/20 animate-gradient-wave"></div>
        
        {/* Animated grid pattern - More visible */}
        <div className="absolute inset-0 opacity-15">
          <div className="h-full w-full animate-grid bg-grid-pattern"></div>
        </div>
        
        {/* Floating insurance-themed elements - More prominent */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-300/40 to-blue-400/20 rounded-full animate-float animate-pulse-glow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-slate-300/50 to-slate-400/25 rounded-lg rotate-45 animate-drift-8s"></div>
        <div className="absolute bottom-20 left-1/4 w-14 h-14 bg-gradient-to-br from-blue-300/45 to-slate-300/25 rounded-full animate-float-delay-2s"></div>
        <div className="absolute top-1/2 right-1/3 w-10 h-10 bg-gradient-to-br from-slate-400/40 to-blue-400/25 rounded-lg rotate-12 animate-drift-10s-delay-3s"></div>
        
        {/* Additional floating particles - More visible */}
        <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-blue-400/30 rounded-full animate-particle-delay-1s"></div>
        <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-slate-400/35 rounded-full animate-particle-delay-3s"></div>
        <div className="absolute top-2/3 left-2/3 w-7 h-7 bg-blue-300/25 rounded-full animate-particle-delay-5s"></div>
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-slate-300/40 rounded-full animate-particle-delay-2s"></div>
        <div className="absolute bottom-1/4 left-1/2 w-6 h-6 bg-blue-400/20 rounded-full animate-particle-delay-4s"></div>
        
        {/* Large floating elements for more impact */}
        <div className="absolute top-1/6 right-1/6 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-blue-300/15 rounded-full animate-float-delay-1s-12s"></div>
        <div className="absolute bottom-1/6 left-1/6 w-20 h-20 bg-gradient-to-br from-slate-200/35 to-slate-300/20 rounded-lg rotate-45 animate-drift-14s-delay-3s"></div>
        
        {/* Professional radial gradients with subtle animation - More visible */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-blue-200/25 via-transparent to-transparent rounded-full blur-3xl animate-pulse-8s"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-slate-300/25 via-transparent to-transparent rounded-full blur-3xl animate-pulse-12s-delay-2s"></div>
        
        {/* Subtle mesh gradient overlay - More visible */}
        <div className="absolute inset-0 opacity-15 bg-mesh-gradient"></div>
        
        {/* Clean overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0}>
            <div className="space-y-8">
              <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Protect What Matters Most
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Comprehensive life and health insurance solutions tailored to your unique needs. 
                Get the protection you deserve with personalized coverage from Jordan Smith, 
                your dedicated insurance professional with over 1207+ active clients and 1387+ families served.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/quote"
                    className="bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
                >
                  Get Your Quick Quote
                  </Link>
                <button 
                  onClick={() => scrollToSection('quote')}
                  className="border-2 border-blue-800 text-blue-800 px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  Schedule a Meeting
                </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="space-y-6">
              {/* Trusted Protection Card */}
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-slate-200/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-slate-200/25 to-blue-200/15 rounded-full blur-xl"></div>
                
                <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-200/50">
                  <div className="text-center space-y-4">
            <div className="relative">
                    <ShieldCheckIcon className="h-12 w-12 text-blue-800 mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Trusted Protection</h3>
                    <div className="flex justify-center space-x-6">
                      <div className="text-center transform hover:scale-110 transition-transform duration-300 group">
                        <div className="text-2xl font-bold text-blue-800 group-hover:text-blue-900">1207+</div>
                        <div className="text-xs text-gray-600">Active Clients</div>
                      </div>
                      <div className="text-center transform hover:scale-110 transition-transform duration-300 group">
                        <div className="text-2xl font-bold text-blue-800 group-hover:text-blue-900">1387+</div>
                        <div className="text-xs text-gray-600">Families Helped</div>
                      </div>
                      <div className="text-center transform hover:scale-110 transition-transform duration-300 group">
                        <div className="text-2xl font-bold text-blue-800 group-hover:text-blue-900">4+</div>
                        <div className="text-xs text-gray-600">Years Experience</div>
                      </div>
                    </div>
                    
                    {/* Trust indicators */}
                    <div className="pt-3 border-t border-gray-100">
                      <div className="flex justify-center items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                          Licensed & Certified
                        </div>
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                          A+ Rating
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Your Free Quote Now Card */}
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 border-blue-200/50 overflow-hidden group">
                {/* Background decoration */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-200/25 to-slate-200/15 rounded-full blur-xl"></div>
                <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-tr from-slate-200/20 to-blue-200/10 rounded-full blur-xl"></div>
                
                <div className="relative text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-800 transition-colors duration-300">Get Your Quick Quote Now!</h3>
                  <p className="text-gray-600">Complete our simple form in just 2 minutes</p>
                  <Link 
                    href="/quote"
                    className="inline-flex items-center justify-center w-full bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Start Your Quote
                    <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <p className="text-sm text-gray-500">✓ No obligation ✓ Free consultation ✓ Personalized results</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
