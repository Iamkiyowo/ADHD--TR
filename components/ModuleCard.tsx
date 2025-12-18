
import React from 'react';
import { Module } from '../types';
import { BookOpen, Quote, Sparkles, Tag } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Nutrisi': return 'bg-blue-100 text-blue-700';
      case 'Perilaku': return 'bg-orange-100 text-orange-700';
      case 'Spiritual': return 'bg-emerald-100 text-emerald-700';
      case 'Pondasi': return 'bg-purple-100 text-purple-700';
      case 'Keluarga': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6 transition-all hover:shadow-md border-b-4 border-b-emerald-500/10">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${getCategoryColor(module.category)}`}>
            {module.category}
          </div>
        </div>

        <h3 className="font-bold text-xl text-slate-800 mb-2 leading-tight">
          {module.title}
        </h3>
        
        <p className="text-slate-500 text-xs mb-4 font-medium italic">
          {module.description}
        </p>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {module.content}
        </p>

        {module.keyTakeaway && (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4 flex gap-3 items-start">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-slate-700 leading-normal">
              <span className="text-emerald-600 uppercase tracking-tighter text-[9px] block mb-0.5">Ringkasan Utama</span>
              {module.keyTakeaway}
            </p>
          </div>
        )}

        {module.verse && (
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100/50 mt-4 relative">
             <Quote className="absolute top-4 left-4 w-8 h-8 text-emerald-200 opacity-50" />
            <div className="relative z-10 text-center">
              <p className="font-arabic text-2xl text-emerald-900 mb-4 leading-loose">
                {module.verse.arabic}
              </p>
              <p className="text-xs text-emerald-800 italic mb-2 leading-relaxed">
                "{module.verse.translation}"
              </p>
              <div className="h-px bg-emerald-200/50 w-12 mx-auto mb-2"></div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                {module.verse.reference}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
