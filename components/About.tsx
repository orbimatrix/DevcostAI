import React from 'react';
import { View } from '../types';
import Footer from './Footer';

interface AboutProps {
    navigate: (view: View) => void;
}

const About: React.FC<AboutProps> = ({ navigate }) => {
    return (
        <div className="bg-white font-sans">
            {/* Hero Section */}
            <div className="relative bg-[#1e1b4b] py-20 sm:py-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover opacity-10"
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
                        alt="Team working"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1e1b4b] to-indigo-900 mix-blend-multiply" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        About DevCost AI
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
                        We're on a mission to bring transparency and accuracy to software development estimation using the power of Artificial Intelligence.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 sm:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                Our Mission
                            </h2>
                            <p className="mt-6 text-lg text-gray-500 leading-relaxed">
                                Software estimation has always been a black box. Clients often overpay, and developers often underestimate. We believe there's a better way.
                            </p>
                            <p className="mt-4 text-lg text-gray-500 leading-relaxed">
                                By leveraging real-time global labor market data and advanced AI models, DevCost AI provides unbiased, data-driven estimates that help both buyers and sellers of software services align on fair expectations.
                            </p>
                            <div className="mt-8">
                                <button
                                    onClick={() => navigate(View.ESTIMATOR)}
                                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Try the Estimator
                                </button>
                            </div>
                        </div>
                        <div className="mt-12 lg:mt-0 relative">
                            <div className="absolute inset-0 bg-indigo-100 rounded-3xl transform -rotate-6 translate-x-4 translate-y-4" />
                            <img
                                className="relative rounded-3xl shadow-xl w-full"
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                alt="Team brainstorming"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-16 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Values</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Built on Trust and Data
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="pt-6">
                            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                                <div className="-mt-6">
                                    <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Transparency</h3>
                                    <p className="mt-5 text-base text-gray-500">
                                        We believe in showing our work. Our estimates break down costs by role, region, and component so you know exactly where the money goes.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-6">
                            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                                <div className="-mt-6">
                                    <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </div>
                                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Speed</h3>
                                    <p className="mt-5 text-base text-gray-500">
                                        Traditional estimation takes days or weeks. With DevCost AI, you get comprehensive estimates in minutes.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-6">
                            <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                                <div className="-mt-6">
                                    <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Global Reach</h3>
                                    <p className="mt-5 text-base text-gray-500">
                                        We track labor markets across the globe to help you find the best talent for your budget, wherever they may be.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer navigate={navigate} />
        </div>
    );
};

export default About;
