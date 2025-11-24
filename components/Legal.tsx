import React from 'react';
import { View } from '../types';

interface LegalProps {
  view: View.TERMS | View.PRIVACY;
}

const Legal: React.FC<LegalProps> = ({ view }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white shadow rounded-lg p-8 sm:p-12">
        {view === View.TERMS ? (
          <article className="prose prose-indigo max-w-none">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="text-gray-600 mb-4">Last updated: May 20, 2024</p>
            
            <h3 className="text-xl font-bold mt-6 mb-2">1. Acceptance of Terms</h3>
            <p className="mb-4">By accessing and using DevCost AI, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h3 className="text-xl font-bold mt-6 mb-2">2. Description of Service</h3>
            <p className="mb-4">DevCost AI provides software development cost estimations using Artificial Intelligence and aggregated market data. These estimates are for informational purposes only and do not constitute a binding contract or guaranteed pricing.</p>
            
            <h3 className="text-xl font-bold mt-6 mb-2">3. User Conduct</h3>
            <p className="mb-4">You agree not to upload any confidential, proprietary, or illegal documents when using our analysis tools.</p>
            
            <h3 className="text-xl font-bold mt-6 mb-2">4. Disclaimer</h3>
            <p className="mb-4">The Service is provided "as is". We make no warranties, expressed or implied, regarding the accuracy of the cost estimates.</p>
          </article>
        ) : (
          <article className="prose prose-indigo max-w-none">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-600 mb-4">Last updated: May 20, 2024</p>
            
            <h3 className="text-xl font-bold mt-6 mb-2">1. Information We Collect</h3>
            <p className="mb-4">We collect information you provide directly to us, such as uploaded project documents, email addresses during signup, and usage data.</p>
            
            <h3 className="text-xl font-bold mt-6 mb-2">2. How We Use Your Information</h3>
            <p className="mb-4">We use uploaded documents solely for the purpose of generating the requested cost estimate. We do not share your proprietary technical specifications with third parties.</p>
            
            <h3 className="text-xl font-bold mt-6 mb-2">3. Data Security</h3>
            <p className="mb-4">We implement appropriate technical and organizational measures to protect the security of your personal information.</p>
          </article>
        )}
      </div>
    </div>
  );
};

export default Legal;