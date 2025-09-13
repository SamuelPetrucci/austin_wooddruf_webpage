'use client';

import { 
  CheckCircleIcon,
  CalendarDaysIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

export default function QuoteAndBookingSection() {

  return (
    <section id="quote" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Your Free Insurance Quote</h2>
            <p className="text-xl text-gray-600 mb-8">
              Choose how you&apos;d like to get started. Fill out our comprehensive form or schedule a consultation directly.
            </p>
            
            {/* Prominent CTA to new quote page */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200 max-w-2xl mx-auto mb-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Complete Quote Form</h3>
                <p className="text-gray-600">Get a detailed, personalized quote with our comprehensive form</p>
                <Link 
                  href="/quote"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
                  <CalendarDaysIcon className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Consultation</h3>
                  <p className="text-gray-600">
                    Choose a time that works best for you. Our insurance experts are ready to help find the perfect coverage for your needs.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center text-blue-600">
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Select your preferred time slot below</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <iframe
                    src="https://calendly.com/workdayboar1/health-insurance-quote-request"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    title="Schedule a consultation with Jordan Smith"
                    className="rounded-lg"
                  />
                </div>

                <div className="mt-6 text-center">
                  <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
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
