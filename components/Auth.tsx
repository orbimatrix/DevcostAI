import React, { useState } from 'react';
import { View, User } from '../types';

interface AuthProps {
  initialView: View.LOGIN | View.SIGNUP;
  onLogin: (user: User) => void;
  navigate: (view: View) => void;
}

const Auth: React.FC<AuthProps> = ({ initialView, onLogin, navigate }) => {
  const [isLogin, setIsLogin] = useState(initialView === View.LOGIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'Founder' | 'Enterprise' | 'Freelancer'>('Founder');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    const mockUser: User = {
      name: email.split('@')[0] || 'User',
      email: email,
      role: role
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#1e1b4b]">
            {isLogin ? 'Sign in to your account' : 'Create your free account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-[#312e81] hover:text-[#1e1b4b] underline"
            >
              {isLogin ? 'start a 14-day free trial' : 'sign in to existing account'}
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-lg focus:outline-none focus:ring-[#312e81] focus:border-[#312e81] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-lg focus:outline-none focus:ring-[#312e81] focus:border-[#312e81] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#312e81] focus:border-[#312e81] sm:text-sm rounded-lg"
              >
                <option value="Founder">Startup Founder</option>
                <option value="Enterprise">Enterprise Client</option>
                <option value="Freelancer">Freelance Developer</option>
              </select>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-[#312e81] hover:bg-[#1e1b4b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#312e81] transition-colors"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-4">
             <p className="text-xs text-gray-400">By continuing, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;