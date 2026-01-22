import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Schedule Your Consultation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book a free, no-obligation consultation with Austin Woodruff. We&apos;ll discuss your insurance needs and find the perfect coverage for you and your family.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calendly Integration */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Schedule Your Consultation</h3>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <iframe
                src="https://calendly.com/austinwoodruff/30min"
                width="100%"
                height="600"
                frameBorder="0"
                title="Schedule a consultation with Austin Woodruff"
                className="rounded-lg"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Prefer to call or email?</p>
              <div className="flex justify-center space-x-4 mt-2">
                <a 
                  href="tel:+18133102707"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  📞 (813) 310-2707
                </a>
                <a 
                  href="mailto:austinryanwoodruff@gmail.com"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ✉️ Email Us
                </a>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <PhoneIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600">(813) 310-2707</p>
                    <p className="text-sm text-gray-500">Available for consultations</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-slate-100 rounded-full p-3">
                    <EnvelopeIcon className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">austinryanwoodruff@gmail.com</p>
                    <p className="text-sm text-gray-500">We&apos;ll respond quickly</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <MapPinIcon className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Service Area</h4>
                    <p className="text-gray-600">Available Nationwide</p>
                    <p className="text-sm text-gray-500">Licensed insurance professional</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">What to Expect</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                  Free, no-obligation consultation
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                  Personalized coverage recommendations
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                  Quotes from multiple carriers
                </li>
                <li className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2" />
                  Lifetime support and service
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
