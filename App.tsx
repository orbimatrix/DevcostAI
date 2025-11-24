import React, { useState } from 'react';
import { AppState, UploadedFile, EstimationResult } from './types';
import FileUpload from './components/FileUpload';
import ResultsDashboard from './components/ResultsDashboard';
import ChatInterface from './components/ChatInterface';
import { getMarketData, generateProjectEstimate } from './services/geminiService';

const COUNTRIES = [
  "United States", "United Kingdom", "Germany", "Canada", "Australia", 
  "India", "Poland", "Brazil", "Ukraine", "Vietnam", "Estonia", "Mexico"
];

function App() {
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
      // Step 1: Search for Market Data (Gemini Flash + Search Tool)
      const marketData = await getMarketData(selectedCountry);
      
      setStatus(AppState.ESTIMATING);
      
      // Step 2: Generate Estimate (Gemini Pro + Thinking)
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
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white mr-3">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
              </span>
              <span className="text-xl font-bold text-gray-900">DevCost AI</span>
            </div>
            {status === AppState.COMPLETE && (
               <button onClick={reset} className="self-center text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                 New Estimate
               </button>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* INPUT MODE */}
        {(status === AppState.IDLE || status === AppState.ANALYZING_MARKET || status === AppState.ESTIMATING || status === AppState.ERROR) && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
            
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Estimate Your Software Project</h1>
              <p className="text-gray-600">Upload your wireframes, schemas, or requirements docs. We'll use AI and real-time wage data to calculate costs.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
              
              {/* Country Selection */}
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

              {/* Upload */}
              <FileUpload files={files} setFiles={setFiles} />

              {/* Text Input */}
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

              {/* Error Message */}
              {status === AppState.ERROR && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm border border-red-200">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
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

      </main>
    </div>
  );
}

export default App;
