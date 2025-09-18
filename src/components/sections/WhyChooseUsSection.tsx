import { 
  ClockIcon, 
  ShieldCheckIcon, 
  UserGroupIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import AnimatedSection from '@/components/AnimatedSection';

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Austin Woodruff?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference that personalized service and rapid response can make
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatedSection delay={200}>
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ClockIcon className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast Response</h3>
              <p className="text-gray-600">
                Fast response time with personalized attention. I pride myself on getting back to all clients quickly and providing the support you need when you need it.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={400}>
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <div className="bg-slate-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShieldCheckIcon className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Deep Coverage Knowledge</h3>
              <p className="text-gray-600">
                Extensive knowledge when it comes to information on policies and data. I break down the most information on products so you understand exactly what you&apos;re getting.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={600}>
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <UserGroupIcon className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Personal Connection</h3>
              <p className="text-gray-600">
                Direct access to multiple top-rated insurance carriers. You&apos;re not just signing up for insurance - you have me for the lifetime of the policy.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={800}>
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <div className="bg-slate-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <StarIcon className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">
                Dedicated to helping families find the right coverage. I&apos;m always there to provide help and support when you need it most.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
