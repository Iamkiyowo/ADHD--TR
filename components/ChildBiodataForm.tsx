
import React, { useState, useEffect } from 'react';
import { ChildBiodata } from '../types';
import { User, Calendar, AlertCircle, FileText, Save, CheckCircle2 } from 'lucide-react';

export const ChildBiodataForm: React.FC = () => {
  const [biodata, setBiodata] = useState<ChildBiodata>(() => {
    const saved = localStorage.getItem('gfcf_child_biodata');
    return saved ? JSON.parse(saved) : {
      fullName: '',
      nickname: '',
      birthDate: '',
      diagnosis: '',
      allergies: '',
      specialNotes: ''
    };
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('gfcf_child_biodata', JSON.stringify(biodata));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-slate-800 leading-tight">Biodata Ananda</h2>
        <p className="text-slate-500 text-sm">Informasi ini membantu psikolog dalam pemantauan klinis.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block flex items-center gap-1">
              <User className="w-3 h-3" /> Nama Lengkap
            </label>
            <input 
              className="w-full p-3 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={biodata.fullName}
              onChange={e => setBiodata({...biodata, fullName: e.target.value})}
              placeholder="Masukkan nama lengkap anak"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Nama Panggilan</label>
              <input 
                className="w-full p-3 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                value={biodata.nickname}
                onChange={e => setBiodata({...biodata, nickname: e.target.value})}
                placeholder="Panggilan"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Tgl Lahir
              </label>
              <input 
                type="date"
                className="w-full p-3 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                value={biodata.birthDate}
                onChange={e => setBiodata({...biodata, birthDate: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Diagnosis Utama</label>
            <input 
              className="w-full p-3 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
              value={biodata.diagnosis}
              onChange={e => setBiodata({...biodata, diagnosis: e.target.value})}
              placeholder="Misal: Autisme Spektrum, ADHD"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-red-400" /> Riwayat Alergi
            </label>
            <textarea 
              className="w-full p-3 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all h-20 resize-none"
              value={biodata.allergies}
              onChange={e => setBiodata({...biodata, allergies: e.target.value})}
              placeholder="Daftar alergi makanan atau obat"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block flex items-center gap-1">
              <FileText className="w-3 h-3" /> Catatan Khusus Orang Tua
            </label>
            <textarea 
              className="w-full p-3 text-sm border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all h-24 resize-none"
              value={biodata.specialNotes}
              onChange={e => setBiodata({...biodata, specialNotes: e.target.value})}
              placeholder="Tambahan informasi yang perlu diketahui psikolog"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-emerald-600 text-white py-4 rounded-2xl text-sm font-black shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          {saved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'BERHASIL DISIMPAN' : 'SIMPAN BIODATA'}
        </button>
      </form>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-blue-800 leading-relaxed">
          <strong>Privasi Terjaga:</strong> Data ini hanya akan dapat diakses oleh akun Psikolog yang tersambung dengan kode ID pasien Anda. Pastikan data diisi dengan jujur untuk evaluasi yang tepat.
        </p>
      </div>
    </div>
  );
};
