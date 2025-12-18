
import React, { useMemo } from 'react';
import { JournalEntry, ChildBiodata } from '../types';
import { TrendingUp, ClipboardList, Moon, Activity, Calendar, User, Search, BrainCircuit, Smile, AlertCircle, Info } from 'lucide-react';
import { ProgressChart } from './ProgressChart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';

export const PsychologistDashboard: React.FC = () => {
  const entries = useMemo<JournalEntry[]>(() => {
    const saved = localStorage.getItem('gfcf_journal_entries');
    return saved ? JSON.parse(saved) : [];
  }, []);

  const biodata = useMemo<ChildBiodata>(() => {
    const saved = localStorage.getItem('gfcf_child_biodata');
    return saved ? JSON.parse(saved) : {
      fullName: 'Belum Diisi',
      nickname: 'Belum Diisi',
      birthDate: '',
      diagnosis: 'Belum ada data',
      allergies: 'Belum ada data',
      specialNotes: 'Belum ada data'
    };
  }, []);

  const analytics = useMemo(() => {
    const behaviorCounts: Record<string, number> = {};
    entries.forEach(e => {
      if (e.behavior) {
        e.behavior.split(',').forEach(tag => {
          const t = tag.trim();
          if (t) behaviorCounts[t] = (behaviorCounts[t] || 0) + 1;
        });
      }
    });
    return Object.entries(behaviorCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [entries]);

  const age = useMemo(() => {
    if (!biodata.birthDate) return '-';
    const birth = new Date(biodata.birthDate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
        years--;
    }
    return `${years} Tahun`;
  }, [biodata.birthDate]);

  return (
    <div className="space-y-6 pb-20">
      {/* Patient Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
          <User className="w-8 h-8 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 leading-tight">Ananda {biodata.nickname}</h2>
          <p className="text-xs text-slate-500 font-medium italic">{biodata.fullName} • {age}</p>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">Aktif</span>
          <span className="text-[10px] text-slate-400 mt-1">ID: 4829-X</span>
        </div>
      </div>

      {/* Patient Clinical Profile */}
      <div className="bg-slate-900 p-6 rounded-3xl text-white space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400">Profil Klinis Ananda</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[9px] font-black text-slate-400 uppercase">Diagnosis Utama</p>
            <p className="text-xs font-semibold">{biodata.diagnosis}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[9px] font-black text-slate-400 uppercase text-red-400">Riwayat Alergi</p>
            <p className="text-xs font-semibold text-red-200">{biodata.allergies || 'Tidak ada'}</p>
          </div>
        </div>
        <div className="pt-2 border-t border-white/10">
          <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Catatan Orang Tua</p>
          <p className="text-[11px] text-slate-300 italic leading-relaxed">{biodata.specialNotes || 'Tidak ada catatan khusus.'}</p>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <BrainCircuit className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase">Kepatuhan Diet</span>
          </div>
          <p className="text-2xl font-black text-slate-800">92%</p>
          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold mt-1">
            <TrendingUp className="w-3 h-3" /> +5% bln ini
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <Smile className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase">Respon Positif</span>
          </div>
          <p className="text-2xl font-black text-slate-800">74%</p>
          <div className="flex items-center gap-1 text-[10px] text-blue-600 font-bold mt-1">
            <TrendingUp className="w-3 h-3" /> Peningkatan
          </div>
        </div>
      </div>

      <ProgressChart />

      {/* Behavior Analysis */}
      <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          Analisis Perilaku Terbanyak
        </h3>
        {analytics.length === 0 ? (
          <p className="text-xs text-slate-400 italic py-4 text-center">Belum ada data perilaku yang terekam</p>
        ) : (
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b', fontWeight: 600}} width={90} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                  {analytics.map((_, i) => <Cell key={i} fill={i === 0 ? '#10b981' : '#94a3b8'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Clinical Review List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-bold text-slate-800">Tinjauan Jurnal Harian</h3>
          <Search className="w-4 h-4 text-slate-400" />
        </div>
        
        {entries.length === 0 ? (
          <div className="text-center py-10 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200">
            <ClipboardList className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-400 font-medium">Belum ada data jurnal untuk ditinjau</p>
          </div>
        ) : (
          entries.slice(0, 10).map((entry) => (
            <div key={entry.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{entry.date}</p>
                    <p className="text-[10px] text-emerald-600 font-black uppercase">{entry.mealType}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-400 font-medium">{entry.food}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                    <BrainCircuit className="w-2.5 h-2.5" /> Perilaku
                  </p>
                  <p className="text-[11px] text-slate-700 leading-relaxed italic">{entry.behavior || '-'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                    <Activity className="w-2.5 h-2.5" /> Fisik
                  </p>
                  <p className="text-[11px] text-slate-700 leading-relaxed italic">{entry.physical || '-'}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-indigo-900 p-6 rounded-3xl text-white">
        <h4 className="font-bold text-sm mb-2">Catatan Terapis</h4>
        <textarea 
          placeholder="Tulis rekomendasi klinis untuk pertemuan selanjutnya..."
          className="w-full h-24 bg-white/10 border border-white/20 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-emerald-400 transition-all placeholder:text-white/40"
        />
        <button className="w-full mt-3 py-3 bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40">
          Simpan Rekomendasi
        </button>
      </div>
    </div>
  );
};
