import { 
  HeartIcon, 
  ShieldCheckIcon, 
  UserGroupIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';

export default function ServicesSection() {
  return (
    <section id="services" className="pt-32 pb-20 bg-white relative">
      {/* Smooth transition gradient to carriers section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-blue-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Insurance Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive coverage options from top-rated carriers to protect you and your family, plus group policies to serve and protect small businesses
            </p>
          </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Life Insurance */}
          <AnimatedSection delay={200}>
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden">
              {/* Header Image */}
              <div className="mb-6 -mt-8 -mx-8 rounded-t-2xl overflow-hidden">
                <Image
                  src="/lifeinsurancecard.jpg"
                  alt="Life Insurance"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>
            <HeartIcon className="h-12 w-12 text-blue-800 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Life Insurance</h3>
            <p className="text-gray-600 mb-6">
              Secure your family&apos;s financial future with comprehensive life insurance coverage tailored to your needs.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Final Expense Insurance
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Term Life Policies
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Whole Life Insurance
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Annuities & IULs
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Cash Back Options
              </li>
            </ul>
            </div>
          </AnimatedSection>
          
          {/* Health Insurance */}
          <AnimatedSection delay={400}>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden">
              {/* Header Image */}
              <div className="mb-6 -mt-8 -mx-8 rounded-t-2xl overflow-hidden">
                <Image
                  src="/healthinsurancecard.avif"
                  alt="Health Insurance"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>
            <ShieldCheckIcon className="h-12 w-12 text-blue-800 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Health Insurance</h3>
            <p className="text-gray-600 mb-6">
              Major Medical Insurance Plans covering everything from labor, mental health, substance abuse, and all regular day-to-day services, surgeries and more. We also offer group coverage for small businesses.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Cigna
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Blue Cross Blue Shield
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                United Healthcare
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                PHCS
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Aetna, First Health, Ambetter, Oscar, Etc.
              </li>
            </ul>
            </div>
          </AnimatedSection>
          
          {/* Additional Protection */}
          <AnimatedSection delay={600}>
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-100 overflow-hidden">
              {/* Header Image */}
              <div className="mb-6 -mt-8 -mx-8 rounded-t-2xl overflow-hidden">
                <Image
                  src="/additionalprotections.avif"
                  alt="Additional Protection"
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              </div>
            <UserGroupIcon className="h-12 w-12 text-blue-800 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Additional Protection</h3>
            <p className="text-gray-600 mb-6">
              Comprehensive protection plans to safeguard you and your family from unexpected health challenges.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Cancer Protection
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Heart Attack & Stroke Coverage
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Accident Protection
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Critical Illness Insurance
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                Dental & Vision Coverage
              </li>
            </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
