import React from 'react';
import { View } from '../types';

interface LandingPageProps {
  navigate: (view: View) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-indigo-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Stop Guessing. <br/><span className="text-indigo-200">Start Building.</span>
          </h1>
          <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-10">
            Get AI-powered software development cost and timeline estimates based on real-time global labor market data.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate(View.SIGNUP)} className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 shadow-lg transition-transform hover:-translate-y-1">
              Start Free Estimate
            </button>
            <button onClick={() => navigate(View.ESTIMATOR)} className="bg-indigo-600 border border-indigo-400 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-500 transition-colors">
              Try Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Segments Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900">Tailored for your needs</h2>
             <p className="text-gray-600 mt-4">Whether you are building, buying, or selling software services.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Founders */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Startup Founders</h3>
              <p className="text-gray-600 mb-4">Validate your MVP budget before you pitch. Get realistic timelines and cost estimates to plan your runway effectively.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">✓ Accurate MVP Budgeting</li>
                <li className="flex items-center">✓ Investor-ready Breakdowns</li>
              </ul>
            </div>

            {/* Enterprise */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
               <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enterprise Clients</h3>
              <p className="text-gray-600 mb-4">Compare development hubs (e.g., India vs. Poland vs. Mexico). Assess scalability costs and infrastructure overhead.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">✓ Global Rate Comparison</li>
                <li className="flex items-center">✓ OpEx & CapEx Analysis</li>
              </ul>
            </div>

            {/* Freelancers */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
               <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Freelancers & Agencies</h3>
              <p className="text-gray-600 mb-4">Benchmark your rates against the local market. Justify your pricing to clients with data-backed reports.</p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center">✓ Competitive Benchmarking</li>
                <li className="flex items-center">✓ Client-facing Estimates</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900">How it Works</h2>
             <p className="text-gray-600 mt-4">From idea to estimate in minutes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
             <div>
               <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold text-gray-700 mx-auto mb-6">1</div>
               <h3 className="text-lg font-bold mb-2">Upload Docs</h3>
               <p className="text-gray-600">Drag & drop your architecture diagrams, UI mockups, or requirement PDFs.</p>
             </div>
             <div>
               <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold text-gray-700 mx-auto mb-6">2</div>
               <h3 className="text-lg font-bold mb-2">Select Market</h3>
               <p className="text-gray-600">Choose your target development country. We check live wages.</p>
             </div>
             <div>
               <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold text-gray-700 mx-auto mb-6">3</div>
               <h3 className="text-lg font-bold mb-2">Get Estimate</h3>
               <p className="text-gray-600">Receive a detailed breakdown of costs, timelines, and roles.</p>
             </div>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="bg-indigo-900 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to plan your next big project?</h2>
        <button onClick={() => navigate(View.SIGNUP)} className="bg-indigo-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-400 transition-colors">
          Create Free Account
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-white text-lg">DevCost AI</span>
            <p className="text-sm mt-2">© 2024 DevCost AI Inc.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <button onClick={() => navigate(View.TERMS)} className="hover:text-white">Terms of Service</button>
            <button onClick={() => navigate(View.PRIVACY)} className="hover:text-white">Privacy Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;