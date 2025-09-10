'use client';

import { useState } from 'react';
import { 
  CheckCircleIcon,
  CalendarDaysIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import AnimatedSection from '@/components/AnimatedSection';

export default function QuoteAndBookingSection() {
  const [activeTab, setActiveTab] = useState<'quote' | 'booking'>('quote');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipCode: '',
    insuranceType: '',
    coverageAmount: '',
    additionalInfo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        zipCode: '',
        insuranceType: '',
        coverageAmount: '',
        additionalInfo: ''
      });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quote" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection delay={0}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Your Free Insurance Quote</h2>
            <p className="text-xl text-gray-600">
              Choose how you&apos;d like to get started. Fill out our quick form or schedule a consultation directly.
            </p>
          </div>
        </AnimatedSection>
        
        <AnimatedSection delay={200}>
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:shadow-3xl transition-all duration-500">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('quote')}
              className={`flex-1 flex items-center justify-center py-4 px-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'quote'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <DocumentTextIcon className="h-6 w-6 mr-2" />
              Contact Form
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`flex-1 flex items-center justify-center py-4 px-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'booking'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <CalendarDaysIcon className="h-6 w-6 mr-2" />
              Book Directly
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'quote' && (
              <div>
                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-green-800">Thank You!</h3>
                        <p className="text-green-700">Your quote request has been submitted successfully. We&apos;ll contact you within 12 hours with your personalized quote.</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                    <div className="flex items-center">
                      <div className="h-8 w-8 text-red-500 mr-3">❌</div>
                      <div>
                        <h3 className="text-lg font-semibold text-red-800">Oops! Something went wrong</h3>
                        <p className="text-red-700">Please try again or contact us directly at (860) 941-7770</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your ZIP code"
                      />
                    </div>
                    <div>
                      <label htmlFor="insuranceType" className="block text-sm font-medium text-gray-700 mb-2">
                        Insurance Type *
                      </label>
                      <select
                        id="insuranceType"
                        name="insuranceType"
                        value={formData.insuranceType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select insurance type</option>
                        <option value="life">Life Insurance</option>
                        <option value="health">Health Insurance</option>
                        <option value="both">Both Life & Health</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="coverageAmount" className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Coverage Amount
                    </label>
                    <select
                      id="coverageAmount"
                      name="coverageAmount"
                      value={formData.coverageAmount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select coverage amount</option>
                      <option value="100k">$100,000</option>
                      <option value="250k">$250,000</option>
                      <option value="500k">$500,000</option>
                      <option value="1m">$1,000,000</option>
                      <option value="2m">$2,000,000+</option>
                      <option value="custom">Custom Amount</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Information
                    </label>
                    <textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your specific needs, concerns, or questions..."
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-600 text-white px-12 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'booking' && (
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
            )}
          </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
