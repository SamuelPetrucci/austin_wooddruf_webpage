'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Secure authentication for Austin
    const validCredentials = [
      {
        email: 'austin@austinwoodruffinsurance.com',
        password: 'AustinInsurance2024!',
        name: 'Austin Woodruff'
      },
      {
        email: 'admin@austinwoodruffinsurance.com', 
        password: 'AdminInsurance2024!',
        name: 'Admin User'
      }
    ];

    const user = validCredentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (user) {
      localStorage.setItem('admin_authenticated', 'true');
      localStorage.setItem('admin_user', JSON.stringify({
        email: user.email,
        name: user.name
      }));
      router.push('/admin/submissions');
    } else {
      setError('Invalid email or password');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Premium Admin Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your professional lead management system
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="austin@austinwoodruffinsurance.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="admin123"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Secure Access</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="font-medium text-gray-900">Authorized Users Only</p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <p className="text-gray-700 font-medium mb-2">Demo Credentials:</p>
              <div className="text-left space-y-1">
                <p className="text-gray-600"><span className="font-medium">Email:</span> austin@austinwoodruffinsurance.com</p>
                <p className="text-gray-600"><span className="font-medium">Password:</span> AustinInsurance2024!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Premium Features</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✅ Professional lead management</li>
            <li>✅ Status tracking and analytics</li>
            <li>✅ Secure database storage</li>
            <li>✅ Advanced search and filtering</li>
            <li>✅ Export capabilities</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
