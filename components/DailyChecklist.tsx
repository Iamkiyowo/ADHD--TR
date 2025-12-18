import React, { useState } from 'react';
import { ChecklistItem } from '../types';
import { DEFAULT_CHECKLIST } from '../constants';
import { CheckCircle2, Circle } from 'lucide-react';

export const DailyChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(DEFAULT_CHECKLIST);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const progress = Math.round((items.filter(i => i.completed).length / items.length) * 100);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-slate-800">Harian: {new Date().toLocaleDateString('id-ID', { weekday: 'long' })}</h3>
        <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
          {progress}% Selesai
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 text-left group"
          >
            {item.completed ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
            ) : (
              <Circle className="w-6 h-6 text-slate-300 group-hover:text-slate-400 shrink-0" />
            )}
            <div className="flex-1">
              <p className={`text-sm font-medium ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                {item.label}
              </p>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">
                {item.category}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};