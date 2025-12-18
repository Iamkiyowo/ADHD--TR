
import React, { useState } from 'react';
import { FOUR_WEEK_ROTATION } from '../constants';
import { Calendar, Utensils, Sun, Moon, Coffee } from 'lucide-react';

export const RotationMenu: React.FC = () => {
  const [activeWeek, setActiveWeek] = useState(0);
  const currentWeek = FOUR_WEEK_ROTATION[activeWeek];

  return (
    <div className="space-y-4 pb-4">
      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4].map((num, idx) => (
          <button
            key={num}
            onClick={() => setActiveWeek(idx % FOUR_WEEK_ROTATION.length)}
            className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
              activeWeek === idx % FOUR_WEEK_ROTATION.length 
                ? 'bg-emerald-600 text-white shadow-md' 
                : 'bg-white text-slate-400 border border-slate-100'
            }`}
          >
            Minggu {num}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {Object.entries(currentWeek.days).map(([day, menu]) => (
          <div key={day} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex justify-between items-center">
              <span className="text-xs font-black text-slate-600 uppercase tracking-tighter">{day}</span>
              <Utensils className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sun className="w-3 h-3 text-orange-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Pagi</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{menu.pagi}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Coffee className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Siang</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{menu.siang}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sun className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Sore</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{menu.sore}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <Moon className="w-3 h-3 text-indigo-400" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Malam</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{menu.malam}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
        <p className="text-[10px] text-emerald-800 leading-relaxed italic">
          <strong>Fleksibilitas:</strong> Jika anak belum bisa menerima variasi terlalu banyak, rotasi bisa diperlambat (misal 2-3 menu diulang lebih sering).
        </p>
      </div>
    </div>
  );
};
