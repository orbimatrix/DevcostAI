import React from 'react';
import { View, User, SubscriptionTier } from '../types';

interface PricingProps {
    navigate: (view: View) => void;
    user?: User | null;
    onUpgrade?: (tier: SubscriptionTier) => void;
}

const Pricing: React.FC<PricingProps> = ({ navigate, user, onUpgrade }) => {
    const handleAction = (tier: SubscriptionTier) => {
        if (user && onUpgrade) {
            onUpgrade(tier);
        } else {
            navigate(View.SIGNUP);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Pricing</h2>
                    <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Plans for every stage
                    </p>
                    <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                        Choose the perfect plan to get accurate software cost estimations and timeline projections.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Basic Plan */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                        <div className="p-8 flex-grow">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic</h3>
                            <p className="text-gray-500 mb-6">Perfect for individuals and freelancers.</p>
                            <div className="flex items-baseline mb-6">
                                <span className="text-5xl font-extrabold text-gray-900">$9</span>
                                <span className="text-xl text-gray-500 ml-2">/month</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">3 Estimations (Free Tier)</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">Basic Market Data</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">Standard Support</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-8 bg-gray-50 border-t border-gray-100 mt-auto">
                            <button
                                onClick={() => handleAction(SubscriptionTier.BASIC)}
                                className="w-full py-3 px-6 rounded-xl border border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50 transition-colors"
                            >
                                {user ? (user.subscriptionTier === SubscriptionTier.BASIC ? 'Current Plan' : 'Downgrade') : 'Get Started'}
                            </button>
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-600 transform scale-105 z-10 flex flex-col relative">
                        <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                            Popular
                        </div>
                        <div className="p-8 flex-grow">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                            <p className="text-gray-500 mb-6">For startups and growing agencies.</p>
                            <div className="flex items-baseline mb-6">
                                <span className="text-5xl font-extrabold text-gray-900">$29</span>
                                <span className="text-xl text-gray-500 ml-2">/month</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">50 Estimations per month</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">Real-time Global Market Data</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">Detailed Breakdown Reports</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">Priority Support</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-8 bg-gray-50 border-t border-gray-100 mt-auto">
                            <button
                                onClick={() => handleAction(SubscriptionTier.PRO)}
                                className="w-full py-3 px-6 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all"
                            >
                                {user ? (user.subscriptionTier === SubscriptionTier.PRO ? 'Current Plan' : 'Upgrade to Pro') : 'Start Free Trial'}
                            </button>
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                        <div className="p-8 flex-grow">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                            <p className="text-gray-500 mb-6">For large organizations and custom needs.</p>
                            <div className="flex items-baseline mb-6">
                                <span className="text-5xl font-extrabold text-gray-900">$99</span>
                                <span className="text-xl text-gray-500 ml-2">/month</span>
                            </div>
                            <ul className="space-y-4 mb-8">
                                <li className="flex items-start">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">Unlimited Estimations</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">API Access</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">Custom Integrations</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-600">Dedicated Account Manager</span>
                                </li>
                            </ul>
                        </div>
                        <div className="p-8 bg-gray-50 border-t border-gray-100 mt-auto">
                            <button
                                onClick={() => handleAction(SubscriptionTier.PREMIUM)}
                                className="w-full py-3 px-6 rounded-xl border border-indigo-600 text-indigo-600 font-bold hover:bg-indigo-50 transition-colors"
                            >
                                {user ? (user.subscriptionTier === SubscriptionTier.PREMIUM ? 'Current Plan' : 'Upgrade to Enterprise') : 'Contact Sales'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h3>
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Can I switch plans later?</h4>
                            <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to your next billing cycle.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">How accurate are the estimates?</h4>
                            <p className="text-gray-600">Our estimates are based on real-time global market data and advanced AI analysis of your specific requirements, providing a high degree of accuracy.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">Do you offer refunds?</h4>
                            <p className="text-gray-600">We offer a 14-day money-back guarantee for all new subscriptions if you're not satisfied with the service.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
