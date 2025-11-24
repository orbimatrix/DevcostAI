import React from 'react';
import { User, View } from '../types';

interface ProfileProps {
  user: User;
  navigate: (view: View) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, navigate }) => {
  // Mock data for saved estimates
  const savedEstimates = [
    { id: 1, name: "E-Commerce Mobile App", date: "2024-05-10", cost: "$45k - $60k", country: "Vietnam", status: 'Draft' },
    { id: 2, name: "SaaS CRM Dashboard", date: "2024-05-12", cost: "$80k - $110k", country: "Poland", status: 'Complete' },
    { id: 3, name: "FinTech Trading Bot", date: "2024-05-15", cost: "$120k - $150k", country: "United Kingdom", status: 'Complete' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Dashboard
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={() => navigate(View.ESTIMATOR)}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            New Estimate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
        {/* User Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Account</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{user.name}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-gray-700">Plan: {user.role}</span>
            </div>
          </div>
        </div>

        {/* Total Estimates Card */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Estimates</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{savedEstimates.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
             <div className="text-sm text-gray-500">
               Last activity: Today
             </div>
          </div>
        </div>

        {/* Avg Cost Card */}
         <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                 <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Projected Value</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">~$300k</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
             <div className="text-sm text-gray-500">
               Across all saved projects
             </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow sm:rounded-lg overflow-hidden border border-gray-200">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
           <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Estimates</h3>
           <div className="relative">
             <input type="text" placeholder="Search projects..." className="border border-gray-300 rounded-md pl-3 pr-8 py-1 text-sm focus:ring-indigo-500 focus:border-indigo-500" />
           </div>
        </div>
        <ul className="divide-y divide-gray-200">
          {savedEstimates.map((est) => (
            <li key={est.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                   <p className="text-md font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors">{est.name}</p>
                   <p className="flex items-center text-sm text-gray-500 mt-1">
                     <span className="truncate mr-3 flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {est.country}
                     </span>
                     <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {est.date}
                     </span>
                   </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 mb-1">
                    {est.cost}
                  </p>
                  <span className={`text-xs px-2 py-0.5 rounded ${est.status === 'Complete' ? 'bg-gray-100 text-gray-600' : 'bg-yellow-100 text-yellow-800'}`}>
                    {est.status}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="bg-gray-50 px-4 py-4 sm:px-6">
           <div className="text-sm text-center">
             <button className="font-medium text-indigo-600 hover:text-indigo-500">View all projects</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;