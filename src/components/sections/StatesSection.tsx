'use client';

import { MapPinIcon } from '@heroicons/react/24/outline';
import AnimatedSection from '@/components/AnimatedSection';

export default function StatesSection() {
  const states = [
    'Alabama', 'Arkansas', 'Colorado', 'Connecticut', 'Georgia',
    'Iowa', 'Illinois', 'Indiana', 'Kansas', 'Kentucky',
    'Louisiana', 'Massachusetts', 'Maryland', 'Michigan', 'Missouri',
    'Mississippi', 'North Carolina', 'New Jersey', 'Ohio', 'Oklahoma',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'Tennessee', 'Texas',
    'Utah', 'Virginia', 'West Virginia', 'Wyoming', 'Florida'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <MapPinIcon className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-4xl font-bold text-gray-900">States We Serve</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based in Tampa, Florida, we&apos;re licensed to provide insurance services across 30 states, 
            bringing you the best coverage options no matter where you call home.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {states.map((state, index) => (
                <div
                  key={index}
                  className="bg-blue-50 hover:bg-blue-100 rounded-lg p-3 text-center transition-all duration-300 transform hover:scale-105 hover:shadow-md"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="text-sm font-medium text-blue-800">{state}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium transform hover:scale-105 transition-all duration-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Licensed in 30 States
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
