import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_PROGRESS_DATA } from '../constants';

export const ProgressChart: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 h-64 w-full">
      <h3 className="font-bold text-lg text-slate-800 mb-4">Kepatuhan Mingguan</h3>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={MOCK_PROGRESS_DATA}>
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#64748b' }} 
          />
          <YAxis hide />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {MOCK_PROGRESS_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.score >= 80 ? '#10b981' : '#fbbf24'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};