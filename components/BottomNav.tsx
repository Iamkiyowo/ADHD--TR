
import React from 'react';
import { Home, BookOpen, Utensils, CheckSquare, Heart, UserCircle } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: ViewState.HOME, label: 'Beranda', icon: Home },
    { id: ViewState.LEARN, label: 'Edukasi', icon: BookOpen },
    { id: ViewState.ROTATION, label: 'Rotasi', icon: Utensils },
    { id: ViewState.TOOLS, label: 'Monitor', icon: CheckSquare },
    { id: ViewState.BIODATA, label: 'Profil', icon: UserCircle },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe pt-2 px-2 shadow-lg z-50">
      <div className="flex justify-around items-center pb-4 md:pb-2 max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              currentView === item.id
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <item.icon className={`w-5 h-5 mb-1 ${currentView === item.id ? 'stroke-[2.5px]' : 'stroke-1.5'}`} />
            <span className="text-[9px] font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
