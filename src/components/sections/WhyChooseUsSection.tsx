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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Jordan Smith?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference that personalized service and rapid response can make
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatedSection delay={200}>
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ClockIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lightning Fast Response</h3>
              <p className="text-gray-600">
                6 hours or less response time depending on time of day. Unlike other agents, I pride myself on getting back to all clients within 12 hours of contact.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={400}>
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <ShieldCheckIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Deep Coverage Knowledge</h3>
              <p className="text-gray-600">
                Extensive knowledge when it comes to information on policies and data. I break down the most information on products so you understand exactly what you&apos;re getting.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={600}>
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <UserGroupIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Personal Connection</h3>
              <p className="text-gray-600">
                1-on-1 personal connection line to all 32 carriers I have to provide. You&apos;re not just signing up for insurance - you have me for the lifetime of the policy.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={800}>
            <div className="text-center transform hover:scale-105 transition-all duration-300">
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <StarIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600">
                Over 1207+ active clients and 1387+ families helped in the last year and a half. I&apos;m always there to provide help and support when you need it most.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
