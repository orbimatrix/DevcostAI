import React from 'react';
import { View, User } from '../types';

interface HeroProps {
  navigate: (view: View) => void;
  user: User | null;
}

const Hero: React.FC<HeroProps> = ({ navigate, user }) => {
  return (
    <section className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] text-white pt-24 pb-32 px-4 relative overflow-hidden">
      {/* Abstract background shape */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-block mb-4">
           {user && (
              <span className="py-1 px-3 rounded-full bg-indigo-800 border border-indigo-600 text-indigo-200 text-xs font-semibold mb-6 block w-fit mx-auto">
                Welcome back, {user.name}
              </span>
           )}
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Stop Guessing.<br />
          <span className="text-indigo-300">Start Building.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Get AI powered software development cost and timeline estimates based on real time global labor market data.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => navigate(user ? View.ESTIMATOR : View.SIGNUP)} 
            className="bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 shadow-lg transition-transform hover:-translate-y-1"
          >
            Start Free Estimate
          </button>
          <button 
            onClick={() => navigate(View.ESTIMATOR)} 
            className="bg-transparent border-2 border-indigo-400 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-900/50 transition-colors"
          >
            Try Live Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
