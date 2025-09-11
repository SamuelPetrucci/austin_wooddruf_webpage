'use client';

import { useState } from 'react';
import { 
  CheckCircleIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  UserIcon,
  MapPinIcon,
  HeartIcon,
  UsersIcon,
  CurrencyDollarIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';

interface Dependent {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
  healthStatus: string;
  medications: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  dateOfBirth: string;
  annualIncome: string;
  healthStatus: string;
  medications: string;
  dependents: Dependent[];
  desiredBudget: string;
  additionalInfo: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  zipCode: '',
  dateOfBirth: '',
  annualIncome: '',
  healthStatus: '',
  medications: '',
  dependents: [],
  desiredBudget: '',
  additionalInfo: ''
};

const steps = [
  { id: 1, title: 'Personal Info', icon: UserIcon, description: 'Basic contact information' },
  { id: 2, title: 'Location & Income', icon: MapPinIcon, description: 'Where you live and your income' },
  { id: 3, title: 'Health Status', icon: HeartIcon, description: 'Your current health information' },
  { id: 4, title: 'Dependents', icon: UsersIcon, description: 'Family members to include' },
  { id: 5, title: 'Budget', icon: CurrencyDollarIcon, description: 'Your coverage budget' }
];

export default function QuotePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDependentChange = (dependentId: string, field: keyof Dependent, value: string) => {
    setFormData(prev => ({
      ...prev,
      dependents: prev.dependents.map(dep => 
        dep.id === dependentId ? { ...dep, [field]: value } : dep
      )
    }));
  };

  const addDependent = () => {
    const newDependent: Dependent = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      relationship: '',
      dateOfBirth: '',
      healthStatus: '',
      medications: ''
    };
    setFormData(prev => ({
      ...prev,
      dependents: [...prev.dependents, newDependent]
    }));
  };

  const removeDependent = (dependentId: string) => {
    setFormData(prev => ({
      ...prev,
      dependents: prev.dependents.filter(dep => dep.id !== dependentId)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 2:
        return !!(formData.zipCode && formData.dateOfBirth && formData.annualIncome);
      case 3:
        return !!(formData.healthStatus);
      case 4:
        return true;
      case 5:
        return !!(formData.desiredBudget);
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit quote request');
      }

      setSubmitStatus('success');
      
      setTimeout(() => {
        window.location.href = '/';
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="pt-16 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Your Free Insurance Quote
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete our simple form to receive a personalized quote tailored to your needs. 
              It only takes a few minutes!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">Quote Request Submitted Successfully!</h3>
                    <p className="text-green-700">
                      Thank you for your detailed information. We&apos;ve sent you a confirmation email and 
                      our insurance expert will contact you within 12 hours with your personalized quote.
                    </p>
                    <p className="text-green-600 text-sm mt-3">
                      You&apos;ll be redirected back to our homepage in a few seconds...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <div className="flex items-center">
                  <div className="h-8 w-8 text-red-500 mr-3">❌</div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800">Unable to Submit Quote Request</h3>
                    <p className="text-red-700">
                      We&apos;re sorry, but there was an issue submitting your quote request. 
                      Please try again or contact us directly for assistance.
                    </p>
                    <div className="mt-3 p-3 bg-red-100 rounded-lg">
                      <p className="text-red-800 text-sm font-medium">Contact Information:</p>
                      <ul className="text-red-700 text-sm mt-1 ml-4 list-disc">
                        <li>Phone: (860) 941-7770</li>
                        <li>Email: jordan@jordanhealthsolutions.com</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Quote Form</h2>
                <p className="text-gray-600">Step {currentStep} of {steps.length}</p>
              </div>

              <div className="space-y-6">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Tell us about your insurance needs..."
                  />
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Free Quote'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
