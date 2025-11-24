import React from 'react';
import { EstimationResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

interface ResultsDashboardProps {
  result: EstimationResult;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

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

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Summary */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{result.projectName}</h2>
        <p className="text-gray-600 mb-6">{result.summary}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-600 font-semibold uppercase">Estimated Cost Range</p>
            <div className="mt-2">
              <p className="text-3xl font-bold text-gray-900">{formatMoney(result.totalCost.avg)}</p>
              <p className="text-sm text-gray-500 mt-1">
                {formatMoney(result.totalCost.min)} - {formatMoney(result.totalCost.max)}
              </p>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
             <p className="text-sm text-purple-600 font-semibold uppercase">Estimated Timeline</p>
             <div className="mt-2">
              <p className="text-3xl font-bold text-gray-900">{result.timelineWeeks.min} - {result.timelineWeeks.max}</p>
              <p className="text-sm text-gray-500 mt-1">Weeks</p>
            </div>
          </div>

           <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
             <p className="text-sm text-emerald-600 font-semibold uppercase">Location Basis</p>
             <div className="mt-2">
              <p className="text-3xl font-bold text-gray-900">{result.wageDataUsed.country}</p>
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
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Cost Allocation by Component</h3>
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
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Hourly Market Rates ({result.wageDataUsed.country})</h3>
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value: number) => `${currencySymbol}${value}`} />
                <Bar dataKey="rate" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Hourly Rate" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-400 mt-2 italic text-center">{result.wageDataUsed.sourceSummary}</p>
        </div>
      </div>

      {/* Additional Costs & Assumptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
           <h3 className="text-lg font-bold text-gray-800 mb-3">OpEx & Infrastructure</h3>
           <ul className="space-y-3">
             <li className="flex justify-between items-center border-b pb-2">
               <span className="text-gray-600">Infrastructure (Monthly)</span>
               <span className="font-mono font-bold">{formatMoney(result.infrastructureCostMonthly)}</span>
             </li>
             <li className="flex justify-between items-center border-b pb-2">
               <span className="text-gray-600">3rd Party Licenses (Est.)</span>
               <span className="font-mono font-bold">{formatMoney(result.thirdPartyLicensesCost)}</span>
             </li>
           </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Key Assumptions</h3>
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
