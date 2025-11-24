import React, { useState } from 'react';
import { AppState, UploadedFile, EstimationResult } from '../types';
import FileUpload from './FileUpload';
import ResultsDashboard from './ResultsDashboard';
import ChatInterface from './ChatInterface';
import { getMarketData, generateProjectEstimate } from '../services/geminiService';

const COUNTRIES = [
  "United States", "United Kingdom", "Germany", "Canada", "Australia", 
  "India", "Poland", "Brazil", "Ukraine", "Vietnam", "Estonia", "Mexico"
];

const EstimatorTool: React.FC = () => {
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

    setStatus(AppState.ANALYZING_MARKET);
    setErrorMsg(null);

    try {
      const marketData = await getMarketData(selectedCountry);
      setStatus(AppState.ESTIMATING);
      const estimate = await generateProjectEstimate(files, requirements, marketData);
      setResult(estimate);
      setStatus(AppState.COMPLETE);
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
           <h2 className="text-2xl font-bold text-gray-900">New Estimation</h2>
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
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Development Country</label>
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <p className="text-xs text-gray-500 mt-1">Estimates will be localized to this market's currency and labor rates.</p>
            </div>

            <FileUpload files={files} setFiles={setFiles} />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Requirements / Context
              </label>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="E.g., We need a high-frequency trading platform with strict compliance requirements..."
                className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
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
              className={`w-full py-4 rounded-lg text-white font-bold text-lg shadow-md transition-all
                ${status === AppState.IDLE || status === AppState.ERROR
                  ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg' 
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