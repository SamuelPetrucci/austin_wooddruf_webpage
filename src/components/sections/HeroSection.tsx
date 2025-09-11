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
    <section id="hero" className="pt-16 relative overflow-hidden">
      {/* Multi-layered Background */}
      <div className="absolute inset-0">
        {/* Base gradient with animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        
        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20 animate-pulse" style={{animationDuration: '12s'}}></div>
        
        {/* Floating geometric shapes with custom animations */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/40 to-blue-300/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-indigo-200/50 to-indigo-300/30 rounded-lg rotate-45 animate-drift" style={{animationDuration: '3s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-purple-200/40 to-purple-300/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-gradient-to-br from-blue-300/50 to-blue-400/30 rounded-lg rotate-12 animate-drift" style={{animationDuration: '4s', animationDelay: '2s'}}></div>
        
        {/* Additional floating elements with varied animations */}
        <div className="absolute top-1/3 left-1/2 w-6 h-6 bg-gradient-to-br from-indigo-300/40 to-purple-300/20 rounded-full animate-ping" style={{animationDuration: '6s', animationDelay: '3s'}}></div>
        <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-gradient-to-br from-blue-300/30 to-indigo-300/20 rounded-lg rotate-45 animate-float" style={{animationDuration: '5s', animationDelay: '1.5s'}}></div>
        <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-gradient-to-br from-purple-300/50 to-blue-300/30 rounded-full animate-drift" style={{animationDuration: '7s', animationDelay: '4s'}}></div>
        
        {/* More dynamic elements */}
        <div className="absolute top-1/4 right-1/2 w-14 h-14 bg-gradient-to-br from-blue-400/30 to-indigo-400/20 rounded-full animate-float" style={{animationDuration: '9s', animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-8 h-8 bg-gradient-to-br from-purple-400/40 to-blue-400/20 rounded-lg rotate-12 animate-drift" style={{animationDuration: '6s', animationDelay: '5s'}}></div>
        <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-gradient-to-br from-indigo-400/50 to-purple-400/30 rounded-full animate-ping" style={{animationDuration: '8s', animationDelay: '1s'}}></div>
        
        {/* Subtle grid pattern with animation */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full animate-pulse" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animationDuration: '10s'
          }}></div>
        </div>
        
        {/* Radial gradient overlays for depth */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-blue-200/20 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-purple-200/20 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-indigo-200/15 via-transparent to-transparent rounded-full blur-3xl"></div>
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)
          `
        }}></div>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent"></div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply'
        }}></div>
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
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
                  >
                    Get Your Free Quote
                  </Link>
                  <button 
                    onClick={() => scrollToSection('quote')}
                    className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
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
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-xl"></div>
                
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300 border border-white/20">
                  <div className="text-center space-y-4">
                    <div className="relative">
                    <ShieldCheckIcon className="h-12 w-12 text-blue-600 mx-auto animate-pulse" />
                      <div className="absolute inset-0 h-12 w-12 bg-blue-100 rounded-full mx-auto animate-ping opacity-20"></div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Trusted Protection</h3>
                    <div className="flex justify-center space-x-6">
                      <div className="text-center transform hover:scale-110 transition-transform duration-300 group">
                        <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700">1207+</div>
                        <div className="text-xs text-gray-600">Active Clients</div>
                      </div>
                      <div className="text-center transform hover:scale-110 transition-transform duration-300 group">
                        <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700">1387+</div>
                        <div className="text-xs text-gray-600">Families Helped</div>
                      </div>
                      <div className="text-center transform hover:scale-110 transition-transform duration-300 group">
                        <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700">2+</div>
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
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 border-blue-200 overflow-hidden group">
                {/* Shimmer effect */}
                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Background decoration */}
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-gradient-to-tr from-indigo-400/20 to-blue-400/20 rounded-full blur-xl"></div>
                
                <div className="relative text-center space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">Get Your Free Quote Now!</h3>
                  <p className="text-gray-600">Complete our simple form in just 2 minutes</p>
                  <Link 
                    href="/quote"
                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
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
