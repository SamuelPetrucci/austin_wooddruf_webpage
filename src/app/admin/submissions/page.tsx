'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormSubmission } from '@/lib/supabase';

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('admin_authenticated');
    const userData = localStorage.getItem('admin_user');
    
    if (!isAuthenticated) {
      router.push('/admin');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    fetchSubmissions();
  }, [router]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submissions');
      const result = await response.json();

      if (result.error) throw new Error(result.error);
      setSubmissions(result.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: FormSubmission['status']) => {
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const result = await response.json();

      if (!result.success) throw new Error(result.error);
      
      // Update local state
      setSubmissions(prev => 
        prev.map(sub => 
          sub.id === id 
            ? { ...sub, status: newStatus, updated_at: new Date().toISOString() }
            : sub
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_user');
    router.push('/admin');
  };

  const filteredSubmissions = selectedStatus === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.status === selectedStatus);

  const statusCounts = {
    all: submissions.length,
    new: submissions.filter(s => s.status === 'new').length,
    contacted: submissions.filter(s => s.status === 'contacted').length,
    quoted: submissions.filter(s => s.status === 'quoted').length,
    closed: submissions.filter(s => s.status === 'closed').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">❌ Error</div>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={fetchSubmissions}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Premium Admin Dashboard</h1>
              <p className="text-gray-600">Professional lead management system</p>
              {user && (
                <p className="text-sm text-gray-500 mt-1">Welcome, {user.name}</p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg">
                <span className="text-sm font-medium">PREMIUM</span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-900">{statusCounts.all}</div>
            <div className="text-sm text-gray-500">Total Leads</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-yellow-600">{statusCounts.new}</div>
            <div className="text-sm text-gray-500">New Leads</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{statusCounts.contacted}</div>
            <div className="text-sm text-gray-500">Contacted</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{statusCounts.quoted}</div>
            <div className="text-sm text-gray-500">Quoted</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-gray-600">{statusCounts.closed}</div>
            <div className="text-sm text-gray-500">Closed</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { key: 'all', label: 'All Leads', count: statusCounts.all },
                { key: 'new', label: 'New', count: statusCounts.new },
                { key: 'contacted', label: 'Contacted', count: statusCounts.contacted },
                { key: 'quoted', label: 'Quoted', count: statusCounts.quoted },
                { key: 'closed', label: 'Closed', count: statusCounts.closed }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedStatus(tab.key)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedStatus === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          {/* Submissions Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coverage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {submission.first_name} {submission.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ZIP: {submission.zip_code}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{submission.email}</div>
                      <div className="text-sm text-gray-500">{submission.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{submission.coverage_type}</div>
                      <div className="text-sm text-gray-500">${submission.monthly_budget}/month</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        submission.status === 'new' ? 'bg-yellow-100 text-yellow-800' :
                        submission.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                        submission.status === 'quoted' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.created_at ? 
                        new Date(submission.created_at).toLocaleDateString() : 
                        'Unknown'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => window.open(`/admin/submissions/${submission.id}`, '_blank')}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                      <select
                        value={submission.status}
                        onChange={(e) => updateStatus(submission.id!, e.target.value as FormSubmission['status'])}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="quoted">Quoted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
              <p className="text-gray-500">
                {selectedStatus === 'all' 
                  ? 'Form submissions will appear here once customers start using the quote form.'
                  : `No submissions with status "${selectedStatus}" found.`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}