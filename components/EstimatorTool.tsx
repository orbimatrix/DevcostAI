import React, { useState } from 'react';
import { AppState, UploadedFile, EstimationResult, User, SubscriptionTier } from '../types';
import FileUpload from './FileUpload';
import ResultsDashboard from './ResultsDashboard';
import ChatInterface from './ChatInterface';
import { getMarketData, generateProjectEstimate } from '../services/geminiService';

const COUNTRIES = [
  "United States", "United Kingdom", "Germany", "Canada", "Australia", 
  "India", "Poland", "Brazil", "Ukraine", "Vietnam", "Estonia", "Mexico"
];

const TIER_LIMITS = {
  [SubscriptionTier.BASIC]: 3,
  [SubscriptionTier.PRO]: 50,
  [SubscriptionTier.PREMIUM]: Infinity
};

interface EstimatorToolProps {
  user: User | null;
  onUsageIncrement: () => void;
  onUpgradeClick: () => void;
}

const EstimatorTool: React.FC<EstimatorToolProps> = ({ user, onUsageIncrement, onUpgradeClick }) => {
  const [status, setStatus] = useState<AppState>(AppState.IDLE);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [requirements, setRequirements] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [result, setResult] = useState<EstimationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleEstimate = async () => {
    if (files.length === 0 && !requirements.trim()) {
      alert("Please upload diagrams or enter requirements.");
      return;
    }

    if (user) {
      const limit = TIER_LIMITS[user.subscriptionTier];
      if (user.usageCount >= limit) {
        if (confirm(`You have reached the limit of ${limit} estimates for your ${user.subscriptionTier} plan. Upgrade to continue?`)) {
          onUpgradeClick();
        }
        return;
      }
    }

    setStatus(AppState.ANALYZING_MARKET);
    setErrorMsg(null);

    try {
      const marketData = await getMarketData(selectedCountry);
      setStatus(AppState.ESTIMATING);
      const estimate = await generateProjectEstimate(files, requirements, marketData);
      setResult(estimate);
      setStatus(AppState.COMPLETE);
      if (user) {
        onUsageIncrement();
      }
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || "An unexpected error occurred during estimation.");
      setStatus(AppState.ERROR);
    }
  };

  const reset = () => {
    setStatus(AppState.IDLE);
    setResult(null);
    setFiles([]);
    setRequirements('');
  };

  return (
    <div className="w-full">
      {/* Header specific to tool */}
      <div className="mb-8 flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-extrabold text-[#1e1b4b]">New Estimation</h2>
           <p className="text-gray-500">Analyze tech docs to get localized cost & timeline.</p>
        </div>
        {status === AppState.COMPLETE && (
            <button onClick={reset} className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
              Start Over
            </button>
        )}
      </div>

      {/* INPUT MODE */}
      {(status === AppState.IDLE || status === AppState.ANALYZING_MARKET || status === AppState.ESTIMATING || status === AppState.ERROR) && (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-6">
            
            {/* User Profile & Usage Section */}
            {user && (
              <div className="bg-indigo-50 rounded-xl p-6 mb-6 border border-indigo-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 bg-white rounded text-xs font-semibold text-indigo-700 border border-indigo-200">
                        {user.role}
                      </span>
                      <span className="px-2 py-1 bg-white rounded text-xs font-semibold text-indigo-700 border border-indigo-200">
                        {user.subscriptionTier} Plan
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end min-w-[200px]">
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      Monthly Credits
                    </div>
                    <div className="w-full bg-indigo-200 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(100, ((user.usageCount || 0) / TIER_LIMITS[user.subscriptionTier]) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between w-full text-xs">
                      <span className="font-bold text-gray-900">
                        {user.usageCount || 0} used
                      </span>
                      <span className="text-gray-500">
                        {TIER_LIMITS[user.subscriptionTier] === Infinity ? 'Unlimited' : `${TIER_LIMITS[user.subscriptionTier]} total`}
                      </span>
                    </div>
                    {user.subscriptionTier !== SubscriptionTier.PREMIUM && (
                      <button 
                        onClick={onUpgradeClick}
                        className="mt-3 text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline"
                      >
                        Upgrade for more credits →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Target Development Country</label>
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-[#312e81] focus:border-[#312e81] outline-none"
              >
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <p className="text-xs text-gray-500 mt-1">Estimates will be localized to this market's currency and labor rates.</p>
            </div>

            <FileUpload files={files} setFiles={setFiles} />

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Additional Requirements / Context
              </label>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="E.g., We need a high-frequency trading platform with strict compliance requirements..."
                className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-[#312e81] focus:border-[#312e81] outline-none resize-none"
              ></textarea>
            </div>

            {status === AppState.ERROR && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-200">
                {errorMsg}
              </div>
            )}

            <button
              onClick={handleEstimate}
              disabled={status !== AppState.IDLE && status !== AppState.ERROR}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-md transition-all
                ${status === AppState.IDLE || status === AppState.ERROR
                  ? 'bg-gradient-to-r from-[#1e1b4b] to-[#312e81] hover:shadow-xl hover:to-[#4338ca]' 
                  : 'bg-indigo-400 cursor-not-allowed'}`}
            >
              {status === AppState.IDLE || status === AppState.ERROR ? 'Analyze & Estimate' : (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {status === AppState.ANALYZING_MARKET ? 'Searching Wage Data...' : 'Thinking & Calculating...'}
                </div>
              )}
            </button>
          </div>
          
          {status !== AppState.IDLE && status !== AppState.ERROR && (
             <div className="text-center text-sm text-gray-500">
               {status === AppState.ESTIMATING && "Gemini 3 Pro is analyzing project complexity (Thinking Mode)..."}
             </div>
          )}
        </div>
      )}

      {/* RESULT MODE */}
      {status === AppState.COMPLETE && result && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
           <div className="xl:col-span-2">
             <ResultsDashboard result={result} />
           </div>
           <div className="xl:col-span-1">
             <div className="sticky top-24">
               <ChatInterface result={result} />
             </div>
           </div>
        </div>
      )}
    </div>
  );
}

export default EstimatorTool;