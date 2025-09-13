'use client';

import { useState } from 'react';

// Mock data for demonstration
const mockSubmissions = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    zip_code: '06101',
    coverage_type: 'Health Insurance',
    monthly_budget: '$500',
    status: 'new',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah.j@email.com',
    phone: '(555) 987-6543',
    zip_code: '06103',
    coverage_type: 'Life Insurance',
    monthly_budget: '$300',
    status: 'contacted',
    created_at: '2024-01-14T14:20:00Z'
  },
  {
    id: '3',
    first_name: 'Mike',
    last_name: 'Davis',
    email: 'mike.davis@email.com',
    phone: '(555) 456-7890',
    zip_code: '06105',
    coverage_type: 'Health Insurance',
    monthly_budget: '$750',
    status: 'quoted',
    created_at: '2024-01-13T09:15:00Z'
  }
];

export default function AdminDemo() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredSubmissions = selectedStatus === 'all' 
    ? mockSubmissions 
    : mockSubmissions.filter(sub => sub.status === selectedStatus);

  const statusCounts = {
    all: mockSubmissions.length,
    new: mockSubmissions.filter(s => s.status === 'new').length,
    contacted: mockSubmissions.filter(s => s.status === 'contacted').length,
    quoted: mockSubmissions.filter(s => s.status === 'quoted').length,
    closed: mockSubmissions.filter(s => s.status === 'closed').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Premium Admin Dashboard</h1>
              <p className="text-gray-600">Professional lead management system</p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg">
              <span className="text-sm font-medium">DEMO VERSION</span>
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
                      <div className="text-sm text-gray-500">{submission.monthly_budget}/month</div>
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
                      {new Date(submission.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        View Details
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        📧 Email
                      </button>
                      <button className="text-purple-600 hover:text-purple-900">
                        📞 Call
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Premium Features Showcase */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Premium Features Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Lead Management</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Status tracking (New → Contacted → Quoted → Closed)</li>
                <li>✅ Advanced search and filtering</li>
                <li>✅ Bulk actions and updates</li>
                <li>✅ Lead scoring and prioritization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Analytics & Reporting</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Conversion rate tracking</li>
                <li>✅ Revenue analytics</li>
                <li>✅ Performance dashboards</li>
                <li>✅ Export to CSV/PDF</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Communication</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Built-in email templates</li>
                <li>✅ SMS notifications</li>
                <li>✅ Automated follow-ups</li>
                <li>✅ Calendar integration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Security & Access</h3>
              <ul className="space-y-2 text-sm">
                <li>✅ Role-based permissions</li>
                <li>✅ Secure database storage</li>
                <li>✅ API access</li>
                <li>✅ Priority support</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-lg mb-4">Ready to upgrade from Google Sheets to a professional admin dashboard?</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact for Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
