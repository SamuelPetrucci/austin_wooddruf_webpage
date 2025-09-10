'use client';

import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

export default function InsuranceCarriersBanner() {
  const carriers = [
    { name: 'Aetna', logo: '/logos/aetna.webp', isLarge: false },
    { name: 'Blue Cross Blue Shield', logo: '/logos/bcbs.webp', isLarge: true },
    { name: 'Allstate', logo: '/logos/allstate.webp', isLarge: true },
    { name: 'Cigna', logo: '/logos/cigna.avif', isLarge: false },
    { name: 'Anthem', logo: '/logos/anthem.avif', isLarge: false },
  ];

  // Create multiple duplicates for seamless infinite scrolling
  const duplicatedCarriers = [...carriers, ...carriers, ...carriers, ...carriers];

  return (
    <section id="carriers" className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600 mb-2">Carriers We Shop With</h2>
            <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mb-4 animate-pulse"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We have access to top-rated insurance carriers to find you the best coverage at the most competitive rates
            </p>
          </div>
        </AnimatedSection>

        {/* Scrolling Banner */}
        <AnimatedSection delay={200}>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
            {duplicatedCarriers.map((carrier, index) => (
              <div
                key={`${carrier.name}-${index}`}
                className="flex-shrink-0 mx-8 flex items-center justify-center"
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[200px] h-24 p-6 flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={carrier.logo}
                      alt={`${carrier.name} logo`}
                      width={carrier.isLarge ? 200 : 160}
                      height={carrier.isLarge ? 80 : 64}
                      className={`object-contain max-w-full max-h-full ${carrier.isLarge ? 'scale-150' : ''}`}
                      priority={index < 5} // Prioritize first set of images
                    />
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </AnimatedSection>

        {/* & More indicator */}
        <AnimatedSection delay={400}>
          <div className="text-center mt-8">
            <span className="text-gray-500 text-lg">& more</span>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={600}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">32+</div>
            <div className="text-gray-600 font-medium">Carriers We Shop With</div>
            <div className="text-sm text-gray-500">Access to leading insurance providers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600 font-medium">Coverage Options</div>
            <div className="text-sm text-gray-500">Life, health, and specialty insurance</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600 font-medium">Support Available</div>
            <div className="text-sm text-gray-500">Personal connection to all carriers</div>
          </div>
          </div>
        </AnimatedSection>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
