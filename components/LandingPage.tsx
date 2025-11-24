import React from 'react';
import { View, User } from '../types';

interface LandingPageProps {
  navigate: (view: View) => void;
  user: User | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigate, user }) => {
  return (
    <div className="flex flex-col font-sans">
      
      {/* Hero Section */}
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

      {/* Tailored For Your Needs Section */}
      <section className="py-20 bg-gray-50 -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Tailored for your needs</h2>
            <div className="h-1 w-20 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Builders</h3>
              <p className="text-gray-600 leading-relaxed">
                Get AI powered software development cost and timeline estimates.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-shadow duration-300 transform md:-translate-y-4">
              <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Buyers</h3>
              <p className="text-gray-600 leading-relaxed">
                Use AI powered on software development cost unbiased for Buyers.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                 <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Sellers</h3>
              <p className="text-gray-600 leading-relaxed">
                Get AI-powered team safe costs and borne estimates estimates for Sellers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-500 mt-2">Step by-step process on how it works.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 -z-10"></div>

            <div className="text-center bg-white">
              <div className="w-24 h-24 bg-white border-4 border-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">1. Input Project Details</h3>
              <p className="text-gray-500 px-4">
                Input your Project Details and analyze project complexity and components information.
              </p>
            </div>

            <div className="text-center bg-white">
               <div className="w-24 h-24 bg-white border-4 border-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">2. AI Analysis</h3>
              <p className="text-gray-500 px-4">
                AI Analysis software development cost estimate time analysis and labor analysis.
              </p>
            </div>

            <div className="text-center bg-white">
               <div className="w-24 h-24 bg-white border-4 border-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">3. Receive Estimate</h3>
              <p className="text-gray-500 px-4">
                Receive estimate breakdown of your estimate our team provides for receive estimates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Testimonial</h2>
            <p className="text-gray-500 mt-2">We streamlined our mainline complex software costs.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="text-indigo-600 text-4xl font-serif mb-4">“</div>
              <p className="text-gray-600 mb-6 italic">
                I really enjoy the software and ever will do a doublecheck on the cost estimations. It's fantastic.
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mark" alt="avatar" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Mark Hanson</h4>
                  <p className="text-gray-500 text-xs">Satisfied Client</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
               <div className="text-indigo-600 text-4xl font-serif mb-4">“</div>
              <p className="text-gray-600 mb-6 italic">
                This gives you the true cost from the source, and labor is excellent. The investment pays off.
              </p>
               <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" alt="avatar" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Jane Alikie</h4>
                  <p className="text-gray-500 text-xs">Manager</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
               <div className="text-indigo-600 text-4xl font-serif mb-4">“</div>
              <p className="text-gray-600 mb-6 italic">
                I verify trusting status, estimates come in fast. The ability to verify pricing is key.
              </p>
               <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tom" alt="avatar" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Tom Faith</h4>
                  <p className="text-gray-500 text-xs">Satisfied Client</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
         <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Pricing</h2>
            <p className="text-gray-500 mt-2">Choose your clients and pricing that fits your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             {/* Basic */}
             <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-indigo-600 transition-colors text-center group">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Basic</h3>
               <div className="text-4xl font-extrabold text-gray-900 mb-2">$9<span className="text-lg text-gray-500 font-normal">/mo</span></div>
               <p className="text-sm text-gray-500 mb-8">per month</p>
               <button className="w-full py-3 px-6 rounded-lg border border-gray-300 text-gray-700 font-medium group-hover:bg-indigo-50 transition-colors">
                 Buy now
               </button>
             </div>

             {/* Pro */}
             <div className="bg-white p-8 rounded-2xl border-2 border-indigo-600 shadow-xl text-center transform md:-translate-y-4">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Pro</h3>
               <div className="text-4xl font-extrabold text-gray-900 mb-2">$19<span className="text-lg text-gray-500 font-normal">/mo</span></div>
               <p className="text-sm text-gray-500 mb-8">per month</p>
               <button className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg">
                 Try it now
               </button>
             </div>

             {/* Premium */}
             <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-indigo-600 transition-colors text-center group">
               <h3 className="text-xl font-bold text-gray-900 mb-4">Premium</h3>
               <div className="text-4xl font-extrabold text-gray-900 mb-2">$100<span className="text-lg text-gray-500 font-normal">/mo</span></div>
               <p className="text-sm text-gray-500 mb-8">per month</p>
               <button className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
                 Sign up now
               </button>
             </div>
          </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e1b4b] text-white py-12 border-t border-indigo-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">DevCost AI</h3>
              <p className="text-indigo-200 text-sm max-w-xs mx-auto md:mx-0">
                AI-powered software estimation for the modern era. Stop guessing and start building with confidence.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
                 <li><button onClick={() => navigate(View.LANDING)} className="hover:text-white">About</button></li>
                 <li><button onClick={() => navigate(View.LANDING)} className="hover:text-white">Blog</button></li>
                 <li><button onClick={() => navigate(View.LANDING)} className="hover:text-white">Contact</button></li>
              </ul>
            </div>

             <div>
              <h3 className="text-xl font-bold mb-4">Social</h3>
              <div className="flex justify-center md:justify-start space-x-4">
                <a href="#" className="w-8 h-8 rounded-full bg-indigo-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">in</a>
                <a href="#" className="w-8 h-8 rounded-full bg-indigo-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">x</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-indigo-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-indigo-400">
             <p>Copyright © 2024 DevCost.AI</p>
             <div className="flex space-x-4 mt-4 md:mt-0">
               <button onClick={() => navigate(View.PRIVACY)} className="hover:text-white">Privacy</button>
               <button onClick={() => navigate(View.TERMS)} className="hover:text-white">Terms</button>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;