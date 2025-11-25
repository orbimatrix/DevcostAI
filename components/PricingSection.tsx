import React from 'react';
import { View } from '../types';

interface PricingSectionProps {
    navigate: (view: View) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ navigate }) => {
    return (
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
                        <button
                            onClick={() => navigate(View.PRICING)}
                            className="w-full py-3 px-6 rounded-lg border border-gray-300 text-gray-700 font-medium group-hover:bg-indigo-50 transition-colors"
                        >
                            Buy now
                        </button>
                    </div>

                    {/* Pro */}
                    <div className="bg-white p-8 rounded-2xl border-2 border-indigo-600 shadow-xl text-center transform md:-translate-y-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Pro</h3>
                        <div className="text-4xl font-extrabold text-gray-900 mb-2">$19<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                        <p className="text-sm text-gray-500 mb-8">per month</p>
                        <button
                            onClick={() => navigate(View.PRICING)}
                            className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg"
                        >
                            Try it now
                        </button>
                    </div>

                    {/* Premium */}
                    <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-indigo-600 transition-colors text-center group">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Premium</h3>
                        <div className="text-4xl font-extrabold text-gray-900 mb-2">$100<span className="text-lg text-gray-500 font-normal">/mo</span></div>
                        <p className="text-sm text-gray-500 mb-8">per month</p>
                        <button
                            onClick={() => navigate(View.PRICING)}
                            className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                        >
                            Sign up now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
