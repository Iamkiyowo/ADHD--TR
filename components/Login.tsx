
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { Leaf, Users, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [loading, setLoading] = useState<UserRole | null>(null);

  const handleLogin = (role: UserRole) => {
    setLoading(role);
    // Simulate API call
    setTimeout(() => {
      onLogin({
        id: role === UserRole.PARENT ? '1' : '2',
        name: role === UserRole.PARENT ? 'Keluarga Ahmad' : 'Dr. Sarah, M.Psi',
        role: role
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-3xl mb-4 transform rotate-6">
            <Leaf className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-black text-emerald-900 tracking-tight">GFCF Monitor</h1>
          <p className="text-slate-500 text-sm mt-2">Ikhtiar & Cinta: Pendampingan Autisme & ADHD</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin(UserRole.PARENT)}
            disabled={!!loading}
            className="w-full group bg-white p-6 rounded-3xl border-2 border-transparent hover:border-emerald-500 shadow-sm transition-all text-left relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Orang Tua / Keluarga</p>
                <p className="text-xs text-slate-500">Monitoring harian & edukasi mandiri</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 ml-auto group-hover:text-emerald-500 transition-colors" />
            </div>
            {loading === UserRole.PARENT && (
              <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 animate-progress w-full"></div>
            )}
          </button>

          <button
            onClick={() => handleLogin(UserRole.PSYCHOLOGIST)}
            disabled={!!loading}
            className="w-full group bg-white p-6 rounded-3xl border-2 border-transparent hover:border-indigo-500 shadow-sm transition-all text-left relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-50 rounded-2xl group-hover:bg-indigo-100 transition-colors">
                <ShieldCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Psikolog / Terapis</p>
                <p className="text-xs text-slate-500">Pantau perkembangan & evaluasi klinis</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 ml-auto group-hover:text-indigo-500 transition-colors" />
            </div>
            {loading === UserRole.PSYCHOLOGIST && (
              <div className="absolute bottom-0 left-0 h-1 bg-indigo-500 animate-progress w-full"></div>
            )}
          </button>
        </div>

        <div className="text-center pt-8">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-4">Didukung oleh Nilai Keislaman</p>
          <p className="font-arabic text-xl text-emerald-800 opacity-60">
            وَأَنْ لَيْسَ لِلإِنْسَانِ إِلَّا مَا سَعَى
          </p>
          <p className="text-[9px] text-slate-400 mt-1 italic">"Dan bahwa manusia hanya memperoleh apa yang telah diusahakannya"</p>
        </div>
      </div>
    </div>
  );
};
