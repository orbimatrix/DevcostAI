import React from 'react';
import { View, User } from '../types';

interface NavbarProps {
  currentView: View;
  user: User | null;
  navigate: (view: View) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, user, navigate, onLogout }) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate(View.LANDING)}>
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#312e81] text-white mr-3 shadow-md">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
            </span>
            <span className="text-xl font-extrabold text-[#1e1b4b] tracking-tight">DevCost AI</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigate(View.LANDING)} className={`text-sm font-medium ${currentView === View.LANDING ? 'text-[#312e81]' : 'text-gray-500 hover:text-gray-900'}`}>Home</button>
            {user && (
              <button onClick={() => navigate(View.ESTIMATOR)} className={`text-sm font-medium ${currentView === View.ESTIMATOR ? 'text-[#312e81]' : 'text-gray-500 hover:text-gray-900'}`}>Estimator</button>
            )}
            <button onClick={() => navigate(View.PRICING)} className={`text-sm font-medium ${currentView === View.PRICING ? 'text-[#312e81]' : 'text-gray-500 hover:text-gray-900'}`}>Pricing</button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                 <button onClick={() => navigate(View.PROFILE)} className={`text-sm font-medium ${currentView === View.PROFILE ? 'text-[#312e81]' : 'text-gray-500 hover:text-gray-900'}`}>
                   My Profile ({user.name})
                 </button>
                 <button onClick={onLogout} className="text-sm font-medium text-gray-500 hover:text-red-600">
                   Logout
                 </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button onClick={() => navigate(View.LOGIN)} className="text-sm font-medium text-gray-500 hover:text-gray-900">Log in</button>
                <button onClick={() => navigate(View.SIGNUP)} className="bg-[#312e81] text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-[#1e1b4b] transition-colors shadow-md">
                  Sign up free
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button (simple implementation) */}
          <div className="md:hidden flex items-center">
             <button onClick={() => navigate(user ? View.PROFILE : View.LOGIN)} className="text-gray-500 hover:text-gray-900">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;