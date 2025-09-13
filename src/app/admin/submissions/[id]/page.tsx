'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase, FormSubmission } from '@/lib/supabase';

export default function SubmissionDetails() {
  const params = useParams();
  const router = useRouter();
  const [submission, setSubmission] = useState<FormSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchSubmission(params.id as string);
    }
  }, [params.id]);

  const fetchSubmission = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setSubmission(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submission');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: FormSubmission['status']) => {
    if (!submission) return;

    try {
      const { error } = await supabase
        .from('form_submissions')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', submission.id);

      if (error) throw error;
      
      setSubmission(prev => prev ? { ...prev, status: newStatus } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading submission...</p>
        </div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌ Error</div>
          <p className="text-gray-600">{error || 'Submission not found'}</p>
          <button 
            onClick={() => router.back()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {submission.first_name} {submission.last_name}
              </h1>
              <p className="text-sm text-gray-500">
                Submitted: {submission.created_at ? new Date(submission.created_at).toLocaleString() : 'Unknown'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                submission.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                submission.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                submission.status === 'quoted' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {submission.status}
              </span>
              <button 
                onClick={() => router.back()}
                className="text-gray-500 hover:text-gray-700"
              >
                ← Back
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-blue-700">Full Name</label>
                    <p className="text-blue-900">{submission.first_name} {submission.last_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-700">Email</label>
                    <p className="text-blue-900">
                      <a href={`mailto:${submission.email}`} className="hover:underline">
                        {submission.email}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-700">Phone</label>
                    <p className="text-blue-900">
                      <a href={`tel:${submission.phone}`} className="hover:underline">
                        {submission.phone}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-700">ZIP Code</label>
                    <p className="text-blue-900">{submission.zip_code}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-blue-700">Date of Birth</label>
                    <p className="text-blue-900">{submission.date_of_birth}</p>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Financial Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-green-700">Annual Income</label>
                    <p className="text-green-900">{submission.annual_income}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-700">Monthly Budget</label>
                    <p className="text-green-900">${submission.monthly_budget}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-green-700">Coverage Type</label>
                    <p className="text-green-900">{submission.coverage_type}</p>
                  </div>
                </div>
              </div>

              {/* Health Information */}
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">Health Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-yellow-700">Health Status</label>
                    <p className="text-yellow-900">{submission.health_status}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-yellow-700">Current Medications</label>
                    <p className="text-yellow-900">{submission.medications || 'None listed'}</p>
                  </div>
                </div>
              </div>

              {/* Dependents */}
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Dependents</h3>
                <div>
                  <p className="text-purple-900 whitespace-pre-line">{submission.dependents}</p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            {submission.additional_info && submission.additional_info !== 'None' && (
              <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <p className="text-gray-700 whitespace-pre-line">{submission.additional_info}</p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Update Status:</label>
                <select
                  value={submission.status}
                  onChange={(e) => updateStatus(e.target.value as FormSubmission['status'])}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="quoted">Quoted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="flex space-x-3">
                <a
                  href={`mailto:${submission.email}?subject=Your Insurance Quote Request&body=Hi ${submission.first_name},%0D%0A%0D%0AThank you for your interest in our insurance services. I'd like to discuss your quote request and provide you with personalized options.%0D%0A%0D%0APlease let me know a good time to call you.%0D%0A%0D%0ABest regards,%0D%0AJordan Smith`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                >
                  📧 Send Email
                </a>
                <a
                  href={`tel:${submission.phone}`}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                >
                  📞 Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
