import React from 'react';
import { View } from '../types';

interface FooterProps {
    navigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
    return (
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
                            <li><button onClick={() => navigate(View.ABOUT)} className="hover:text-white">About</button></li>
                            <li><button onClick={() => navigate(View.BLOG)} className="hover:text-white">Blog</button></li>
                            <li><button onClick={() => navigate(View.CONTACT)} className="hover:text-white">Contact</button></li>
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
    );
};

export default Footer;
