import Image from 'next/image';
import { CheckCircleIcon, UserIcon, HeartIcon } from '@heroicons/react/24/outline';
import AnimatedSection from '@/components/AnimatedSection';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Austin Woodruff</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your dedicated insurance professional with a passion for protecting families and their futures
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection delay={200}>
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 to-slate-200 rounded-3xl blur opacity-30" style={{ animation: 'pulse 8s ease-in-out infinite' }}></div>
                <div className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 bg-gradient-to-br from-blue-100 to-slate-100 w-full h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg border-4 border-blue-300 overflow-hidden">
                      <Image
                        src="/austinwoodrufheadshot.png"
                        alt="Austin Woodruff"
                        width={128}
                        height={128}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <p className="text-gray-600 font-medium">Austin Woodruff</p>
                    <p className="text-gray-500 text-sm">Insurance Professional</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center bg-white rounded-xl p-6 shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-xl border border-gray-100">
                  <div className="text-3xl font-bold text-blue-800 mb-2">24/7</div>
                  <div className="text-sm font-medium text-gray-600">Support Available</div>
                </div>
                <div className="text-center bg-white rounded-xl p-6 shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-xl border border-gray-100">
                  <div className="text-3xl font-bold text-blue-800 mb-2">100%</div>
                  <div className="text-sm font-medium text-gray-600">Client Focused</div>
                </div>
                <div className="text-center bg-white rounded-xl p-6 shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-xl border border-gray-100">
                  <div className="text-3xl font-bold text-blue-800 mb-2">Free</div>
                  <div className="text-sm font-medium text-gray-600">Consultations</div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4 transform hover:scale-105 transition-all duration-300">
                  <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                    <UserIcon className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">My Journey</h3>
                    <p className="text-gray-700">
                      I discovered my true passion for protecting families and their futures through 
                      helping clients navigate the complex world of insurance with clarity and confidence.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 transform hover:scale-105 transition-all duration-300">
                  <div className="bg-slate-100 rounded-full p-3 flex-shrink-0">
                    <CheckCircleIcon className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">My Approach</h3>
                    <p className="text-gray-700">
                      I break down complex insurance information in a way you can understand. 
                      You&apos;re not just getting coverage - you have me for the lifetime of your policy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 transform hover:scale-105 transition-all duration-300">
                  <div className="bg-blue-100 rounded-full p-3 flex-shrink-0">
                    <HeartIcon className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">My Commitment</h3>
                    <p className="text-gray-700">
                      Built on trust, transparency, and rapid response. I&apos;m always your first 
                      point of contact for any policy updates or questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
