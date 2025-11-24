import React from 'react';
import { EstimationResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

interface ResultsDashboardProps {
  result: EstimationResult;
}

// Updated COLORS to match Deep Blue/Indigo Theme
const COLORS = ['#312e81', '#4f46e5', '#818cf8', '#c7d2fe'];

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result }) => {
  const { currencySymbol, currencyCode } = result.wageDataUsed;

  const componentData = [
    { name: 'Backend (40%)', value: result.componentCosts.backend },
    { name: 'Frontend (30%)', value: result.componentCosts.frontend },
    { name: 'DevOps (20%)', value: result.componentCosts.devops },
    { name: 'QA (10%)', value: result.componentCosts.qa },
  ];

  const formatMoney = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(val);

  // Social Sharing Logic
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://devcost.ai';
  const shareText = `I just generated a project estimate for "${result.projectName}" using DevCost AI.\n\n💰 Estimate: ${formatMoney(result.totalCost.min)} - ${formatMoney(result.totalCost.max)}\n⏱️ Timeline: ${result.timelineWeeks.min}-${result.timelineWeeks.max} weeks\n📍 Market: ${result.wageDataUsed.country}`;

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
            <div className="flex-1">
                <h2 className="text-2xl font-extrabold text-[#1e1b4b] mb-2">{result.projectName}</h2>
                <p className="text-gray-600">{result.summary}</p>
            </div>
            
            <div className="flex items-center space-x-2 shrink-0 bg-gray-50 p-2 rounded-lg border border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 hidden sm:block">Share</span>
                
                {/* Twitter / X */}
                <a 
                  href={twitterUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-white rounded-full text-gray-400 hover:bg-black hover:text-white transition-all border border-gray-200 shadow-sm group" 
                  title="Share on X (Twitter)"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                </a>

                {/* LinkedIn */}
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-white rounded-full text-gray-400 hover:bg-[#0077b5] hover:text-white transition-all border border-gray-200 shadow-sm" 
                  title="Share on LinkedIn"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path></svg>
                </a>

                {/* Facebook */}
                <a 
                  href={facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 bg-white rounded-full text-gray-400 hover:bg-[#1877f2] hover:text-white transition-all border border-gray-200 shadow-sm" 
                  title="Share on Facebook"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
                </a>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-sm text-indigo-700 font-bold uppercase">Estimated Cost Range</p>
            <div className="mt-2">
              <p className="text-3xl font-extrabold text-gray-900">{formatMoney(result.totalCost.avg)}</p>
              <p className="text-sm text-gray-500 mt-1">
                {formatMoney(result.totalCost.min)} - {formatMoney(result.totalCost.max)}
              </p>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
             <p className="text-sm text-purple-700 font-bold uppercase">Estimated Timeline</p>
             <div className="mt-2">
              <p className="text-3xl font-extrabold text-gray-900">{result.timelineWeeks.min} - {result.timelineWeeks.max}</p>
              <p className="text-sm text-gray-500 mt-1">Weeks</p>
            </div>
          </div>

           <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
             <p className="text-sm text-blue-700 font-bold uppercase">Location Basis</p>
             <div className="mt-2">
              <p className="text-3xl font-extrabold text-gray-900">{result.wageDataUsed.country}</p>
              <p className="text-sm text-gray-500 mt-1">
                Based on avg. Sr. Rate: {currencySymbol}{result.wageDataUsed.hourlyRates.senior}/hr
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cost Breakdown Pie */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-[#1e1b4b] mb-4">Cost Allocation by Component</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={componentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {componentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatMoney(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wage Rate Comparison Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-lg font-bold text-[#1e1b4b] mb-4">Hourly Market Rates ({result.wageDataUsed.country})</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Junior', rate: result.wageDataUsed.hourlyRates.junior },
                  { name: 'Mid', rate: result.wageDataUsed.hourlyRates.mid },
                  { name: 'DevOps', rate: result.wageDataUsed.hourlyRates.devops },
                  { name: 'Senior', rate: result.wageDataUsed.hourlyRates.senior },
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{fill: '#4b5563'}} />
                <YAxis tick={{fill: '#4b5563'}} />
                <Tooltip formatter={(value: number) => `${currencySymbol}${value}`} cursor={{fill: '#f3f4f6'}} />
                <Bar dataKey="rate" fill="#312e81" radius={[4, 4, 0, 0]} name="Hourly Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-400 mt-2 italic text-center">{result.wageDataUsed.sourceSummary}</p>
        </div>
      </div>

      {/* Additional Costs & Assumptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-yellow-400">
           <h3 className="text-lg font-bold text-[#1e1b4b] mb-3">OpEx & Infrastructure</h3>
           <ul className="space-y-3">
             <li className="flex justify-between items-center border-b border-gray-100 pb-2">
               <span className="text-gray-600">Infrastructure (Monthly)</span>
               <span className="font-mono font-bold text-gray-900">{formatMoney(result.infrastructureCostMonthly)}</span>
             </li>
             <li className="flex justify-between items-center border-b border-gray-100 pb-2">
               <span className="text-gray-600">3rd Party Licenses (Est.)</span>
               <span className="font-mono font-bold text-gray-900">{formatMoney(result.thirdPartyLicensesCost)}</span>
             </li>
           </ul>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-[#312e81]">
          <h3 className="text-lg font-bold text-[#1e1b4b] mb-3">Key Assumptions</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            {result.assumptions.map((ass, idx) => (
              <li key={idx}>{ass}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default ResultsDashboard;