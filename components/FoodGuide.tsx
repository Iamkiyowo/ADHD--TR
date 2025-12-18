
import React from 'react';
import { FOOD_SUBSTITUTIONS } from '../constants';
import { XCircle, CheckCircle2, AlertCircle } from 'lucide-react';

export const FoodGuide: React.FC = () => {
  return (
    <div className="space-y-6 pb-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-800">Panduan Substitusi</h2>
        <p className="text-slate-500 text-sm">Ganti bahan berbahaya dengan alternatif sehat (Thayyib).</p>
      </div>

      {FOOD_SUBSTITUTIONS.map((item) => (
        <div key={item.category} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-slate-50 px-5 py-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <AlertCircle className="w-4 h-4 text-emerald-600" />
               {item.category}
            </h3>
          </div>
          <div className="p-5 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-1">
                <XCircle className="w-3 h-3" /> Hindari
              </p>
              <ul className="space-y-1.5">
                {item.avoid.map((food, i) => (
                  <li key={i} className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    {food}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Pengganti
              </p>
              <ul className="space-y-1.5">
                {item.replace.map((food, i) => (
                  <li key={i} className="text-xs text-slate-800 font-medium flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                    {food}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
