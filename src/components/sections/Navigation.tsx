'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isQuotePage = pathname === '/quote';

  const scrollToSection = (sectionId: string) => {
    if (isQuotePage) {
      // If on quote page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    } else {
      // If on home page, scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity space-x-3">
                {/* Company Logo Icon */}
                <Image
                  src="/logoimg.png"
                  alt="Company Logo"
                  width={60}
                  height={60}
                  className="h-12 w-12 object-contain"
                  priority
                />
                {/* Company Name Text Image */}
                <Image
                  src="/logotxt.png"
                  alt="Company Name"
                  width={200}
                  height={60}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </Link>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="text-slate-900 hover:text-blue-800 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-blue-50"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-slate-900 hover:text-blue-800 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-blue-50"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-slate-900 hover:text-blue-800 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-blue-50"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('carriers')} 
                className="text-slate-900 hover:text-blue-800 px-4 py-3 rounded-lg text-base font-semibold transition-all duration-300 hover:bg-blue-50"
              >
                Carriers
              </button>
              <Link 
                href="/quote"
                className="bg-blue-800 text-white px-6 py-3 rounded-lg text-base font-bold hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Quote
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-900 hover:text-blue-800 focus:outline-none focus:text-blue-800"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="text-slate-900 hover:text-blue-800 hover:bg-blue-50 block px-4 py-3 rounded-lg text-base font-semibold w-full text-left transition-all duration-300"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-slate-900 hover:text-blue-800 hover:bg-blue-50 block px-4 py-3 rounded-lg text-base font-semibold w-full text-left transition-all duration-300"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-slate-900 hover:text-blue-800 hover:bg-blue-50 block px-4 py-3 rounded-lg text-base font-semibold w-full text-left transition-all duration-300"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('carriers')} 
                className="text-slate-900 hover:text-blue-800 hover:bg-blue-50 block px-4 py-3 rounded-lg text-base font-semibold w-full text-left transition-all duration-300"
              >
                Carriers
              </button>
              <Link 
                href="/quote"
                className="bg-blue-800 text-white block px-4 py-3 rounded-lg text-base font-bold w-full text-center hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
