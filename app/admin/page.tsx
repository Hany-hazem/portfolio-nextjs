'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PortfolioCustomization from '@/components/PortfolioCustomization';
import { Lock } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [adminToken, setAdminToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check session storage on mount
    if (typeof window !== 'undefined') {
      const authenticated = sessionStorage.getItem('admin_authenticated');
      const token = sessionStorage.getItem('admin_token');
      if (authenticated === 'true' && token) {
        setIsAuthenticated(true);
        setAdminToken(token);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check - in production, use proper authentication
    if (password === 'portfolio2026') {
      setIsAuthenticated(true);
      setAdminToken(password);
      sessionStorage.setItem('admin_authenticated', 'true');
      sessionStorage.setItem('admin_token', password);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminToken('');
    setPassword('');
    sessionStorage.removeItem('admin_authenticated');
    sessionStorage.removeItem('admin_token');
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-blue-600/20 rounded-lg">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-white">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-blue-600 focus:outline-none"
                placeholder="Enter admin password"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PortfolioCustomization 
          onClose={handleLogout}
          adminToken={adminToken}
        />
      </div>
    </div>
  );
}
