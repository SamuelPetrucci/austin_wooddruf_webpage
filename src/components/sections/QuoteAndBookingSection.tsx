'use client';

import { 
  CalendarDaysIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect } from 'react';
import AnimatedSection from '@/components/AnimatedSection';

export default function QuoteAndBookingSection() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section id="quote" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Your Free Insurance Quote</h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose how you&apos;d like to get started. Fill out our comprehensive form or schedule a consultation directly.
            </p>
            
            {/* Prominent CTA to new quote page */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200/50 max-w-2xl mx-auto mb-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Complete Quote Form</h3>
                <p className="text-gray-600">Get a detailed, personalized quote with our comprehensive form</p>
                <Link 
                  href="/quote"
                  className="inline-flex items-center justify-center bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Start Detailed Quote
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </Link>
                <p className="text-sm text-gray-500">✓ Progressive form ✓ Add dependents ✓ Detailed health info</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:shadow-3xl transition-all duration-500">
            <div className="p-8">
              <div className="animate-fadeIn">
                <div className="text-center mb-6">
                  <CalendarDaysIcon className="h-16 w-16 text-blue-800 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Consultation</h3>
                  <p className="text-gray-600">
                    Schedule a free consultation with Austin Woodruff. Choose a time that works best for you.
                  </p>
                </div>
                
                {/* Calendly Embed */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 overflow-hidden">
                  <div
                    className="calendly-inline-widget"
                    data-url="https://calendly.com/thebenefitbutler"
                    style={{ minWidth: '320px', height: '700px' }}
                  ></div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-3">Prefer to call or email directly?</p>
                  <div className="flex justify-center space-x-6">
                    <a 
                      href="tel:+18133102707"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      📞 (813) 310-2707
                    </a>
                    <a 
                      href="mailto:austinryanwoodruff@gmail.com"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      ✉️ Email Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
