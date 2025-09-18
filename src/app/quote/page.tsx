'use client';

import { useState } from 'react';
import { 
  CheckCircleIcon, 
  UserIcon,
  MapPinIcon,
  HeartIcon,
  UsersIcon,
  CurrencyDollarIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import Navigation from '@/components/sections/Navigation';
import Footer from '@/components/sections/Footer';

interface Dependent {
  id: string;
  name: string;
  relationship: string;
  dateOfBirth: string;
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
  coverageType: string;
  additionalInfo: string;
  referredBy: boolean;
  referralName: string;
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
  coverageType: '',
  additionalInfo: '',
  referredBy: false,
  referralName: ''
};

const steps = [
  { id: 1, title: 'Personal Info', icon: UserIcon, description: 'Basic contact information' },
  { id: 2, title: 'Location & Income', icon: MapPinIcon, description: 'Where you live and your income' },
  { id: 3, title: 'Health Status', icon: HeartIcon, description: 'Your current health information' },
  { id: 4, title: 'Dependents', icon: UsersIcon, description: 'Family members to include' },
  { id: 5, title: 'Budget', icon: CurrencyDollarIcon, description: 'Your coverage budget' },
  { id: 6, title: 'Referral', icon: UserPlusIcon, description: 'How you found us' }
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
      name: '',
      relationship: '',
      dateOfBirth: ''
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

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.zipCode && formData.dateOfBirth && formData.annualIncome;
      case 3:
        return formData.healthStatus;
      case 4:
        return true; // Dependents are optional
      case 5:
        return formData.desiredBudget && formData.coverageType;
      case 6:
        return true; // Referral step is optional
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < steps.length) {
      nextStep();
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Use simple email endpoint (base service)
      const endpoint = '/api/submit-quote';
      
      const response = await fetch(endpoint, {
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
      
      // Show more detailed error message
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.log('Detailed error:', errorMessage);
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
                Get Your Quick Insurance Quote
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
                        <li>Phone: (727) 248-2108</li>
                        <li>Email: austinryanwoodruff@gmail.com</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Get a Quick Quote</h2>
                <p className="text-gray-600">Step {currentStep} of {steps.length}</p>
              </div>

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
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
              )}

              {/* Step 2: Location & Income */}
              {currentStep === 2 && (
                <div className="space-y-6">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                        placeholder="Enter your ZIP code"
                      />
                    </div>
                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income *
                    </label>
                    <select
                      id="annualIncome"
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select your income range</option>
                      <option value="Under $30,000">Under $30,000</option>
                      <option value="$30,000 - $50,000">$30,000 - $50,000</option>
                      <option value="$50,000 - $75,000">$50,000 - $75,000</option>
                      <option value="$75,000 - $100,000">$75,000 - $100,000</option>
                      <option value="$100,000 - $150,000">$100,000 - $150,000</option>
                      <option value="Over $150,000">Over $150,000</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Health Status */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="healthStatus" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Health Status *
                    </label>
                    <select
                      id="healthStatus"
                      name="healthStatus"
                      value={formData.healthStatus}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select your health status</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Fair">Fair</option>
                      <option value="Poor">Poor</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="medications" className="block text-sm font-medium text-gray-700 mb-2">
                      Current Medications
                    </label>
                    <textarea
                      id="medications"
                      name="medications"
                      value={formData.medications}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      placeholder="List any current medications (optional)"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Dependents */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dependents/Spouse
                    </label>
                    <p className="text-sm text-gray-600 mb-4">
                      Add any dependents or spouse who will be covered under your insurance plan.
                    </p>
                    
                    {formData.dependents.map((dependent) => (
                      <div key={dependent.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Name
                            </label>
                            <input
                              type="text"
                              value={dependent.name}
                              onChange={(e) => handleDependentChange(dependent.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                              placeholder="Dependent&apos;s name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Relationship
                            </label>
                            <select
                              value={dependent.relationship}
                              onChange={(e) => handleDependentChange(dependent.id, 'relationship', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            >
                              <option value="">Select relationship</option>
                              <option value="Spouse">Spouse</option>
                              <option value="Child">Child</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date of Birth
                            </label>
                            <input
                              type="date"
                              value={dependent.dateOfBirth}
                              onChange={(e) => handleDependentChange(dependent.id, 'dateOfBirth', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            />
                          </div>
                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={() => removeDependent(dependent.id)}
                              className="px-3 py-2 text-red-600 hover:text-red-800 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={addDependent}
                      className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors"
                    >
                      + Add Dependent/Spouse
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Budget & Coverage */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="desiredBudget" className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Monthly Budget *
                    </label>
                    <select
                      id="desiredBudget"
                      name="desiredBudget"
                      value={formData.desiredBudget}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select your budget range</option>
                      <option value="Under $100">Under $100</option>
                      <option value="$100 - $200">$100 - $200</option>
                      <option value="$200 - $300">$200 - $300</option>
                      <option value="$300 - $500">$300 - $500</option>
                      <option value="$500 - $750">$500 - $750</option>
                      <option value="Over $750">Over $750</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="coverageType" className="block text-sm font-medium text-gray-700 mb-2">
                      Coverage Type *
                    </label>
                    <select
                      id="coverageType"
                      name="coverageType"
                      value={formData.coverageType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    >
                      <option value="">Select coverage type</option>
                      <option value="Health Insurance">Health Insurance</option>
                      <option value="Life Insurance">Life Insurance</option>
                      <option value="Both">Both Health & Life Insurance</option>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                      placeholder="Tell us about your insurance needs..."
                    />
                  </div>
                </div>
              )}

              {/* Step 6: Referral */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">How Did You Hear About Us?</h3>
                    <p className="text-gray-600 mb-6">
                      Help us understand how you found Austin Woodruff Insurance. This information helps us improve our services.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Were you referred by someone?
                        </label>
                        <div className="flex space-x-6">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="referredBy"
                              checked={formData.referredBy === true}
                              onChange={() => setFormData(prev => ({ ...prev, referredBy: true, referralName: '' }))}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="referredBy"
                              checked={formData.referredBy === false}
                              onChange={() => setFormData(prev => ({ ...prev, referredBy: false, referralName: '' }))}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">No</span>
                          </label>
                        </div>
                      </div>

                      {formData.referredBy && (
                        <div>
                          <label htmlFor="referralName" className="block text-sm font-medium text-gray-700 mb-2">
                            Referrer&apos;s Name
                          </label>
                          <input
                            type="text"
                            id="referralName"
                            name="referralName"
                            value={formData.referralName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                            placeholder="Enter the name of the person who referred you"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting || !isStepValid()}
                  className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 
                   currentStep === steps.length ? 'Get My Quick Quote' : 'Next Step'}
                </button>
              </div>
            </form>
          </div>

          {/* Confidential Notice */}
          <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <svg className="h-5 w-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">Confidential Information</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
                All information provided in this form is strictly confidential and protected under professional privacy standards. 
                Your personal and financial information will never be sold, shared, or distributed to third parties. 
                We use your information solely to provide you with the best insurance options and will maintain the highest 
                level of confidentiality throughout our business relationship.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
