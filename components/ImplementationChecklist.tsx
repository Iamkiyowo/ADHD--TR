
import React, { useState, useEffect } from 'react';
import { IMPLEMENTATION_CHECKLIST } from '../constants';
import { ChecklistItem } from '../types';
import { CheckCircle2, Circle, ShieldCheck } from 'lucide-react';

export const ImplementationChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    const saved = localStorage.getItem('onboarding_checklist');
    return saved ? JSON.parse(saved) : IMPLEMENTATION_CHECKLIST;
  });

  useEffect(() => {
    localStorage.setItem('onboarding_checklist', JSON.stringify(items));
  }, [items]);

  const toggle = (id: string) => {
    setItems(items.map(i => i.id === id ? {...i, completed: !i.completed} : i));
  };

  const progress = Math.round((items.filter(i => i.completed).length / items.length) * 100);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <ShieldCheck className="w-20 h-20 text-emerald-600" />
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800">Checklist Persiapan</h3>
        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
          {progress}% SIAP
        </span>
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <button 
            key={item.id}
            onClick={() => toggle(item.id)}
            className="w-full flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-left"
          >
            {item.completed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`text-xs font-semibold ${item.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                {item.label}
              </p>
              <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">{item.category}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
