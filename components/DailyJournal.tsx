
import React, { useState, useEffect, useMemo } from 'react';
import { JournalEntry } from '../types';
import { Plus, ClipboardList, Trash2, Smile, AlertCircle, Calendar as CalendarIcon, ChevronDown, ChevronUp, CalendarPlus, Download, FileText, Tag, Link as LinkIcon, Activity, ChevronRight, BarChart3, TrendingUp, BrainCircuit, Moon, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, CartesianGrid } from 'recharts';

const BEHAVIOR_TAGS = ['Tantrum', 'Fokus', 'Tenang', 'Agresif', 'Hiperaktif', 'Kontak Mata Bagus', 'Stereotipik'];
const PHYSICAL_TAGS = ['Normal', 'Diare', 'Kembung', 'Sembelit', 'Ruam', 'Gatal', 'Tidur Nyenyak', 'Lemas'];
const SLEEP_QUALITY_TAGS = ['Sangat Nyenyak', 'Nyenyak', 'Gelisah', 'Sering Terbangun', 'Susah Tidur'];

export const DailyJournal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('gfcf_journal_entries');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [showExport, setShowExport] = useState(false);
  const [showTrends, setShowTrends] = useState(false);
  const [showAdvancedFood, setShowAdvancedFood] = useState(false);
  const [showSleepSection, setShowSleepSection] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    mealType: 'Pagi',
    food: '',
    behavior: '',
    physical: '',
    nutrition: { protein: '', carbs: '', fats: '' },
    recipeLink: '',
    sleep: { duration: '', quality: '', notes: '' }
  });

  useEffect(() => {
    localStorage.setItem('gfcf_journal_entries', JSON.stringify(entries));
  }, [entries]);

  const currentNutritionData = useMemo(() => {
    return [
      { name: 'P', value: parseFloat(newEntry.nutrition?.protein || '0'), fill: '#3b82f6' },
      { name: 'C', value: parseFloat(newEntry.nutrition?.carbs || '0'), fill: '#f59e0b' },
      { name: 'F', value: parseFloat(newEntry.nutrition?.fats || '0'), fill: '#f43f5e' },
    ];
  }, [newEntry.nutrition]);

  const trendData = useMemo(() => {
    const behaviorCounts: Record<string, number> = {};
    const physicalCounts: Record<string, number> = {};
    const sleepCounts: Record<string, number> = {};

    entries.forEach(entry => {
      if (entry.behavior) {
        entry.behavior.split(',').forEach(term => {
          const t = term.trim();
          if (t) behaviorCounts[t] = (behaviorCounts[t] || 0) + 1;
        });
      }
      if (entry.physical) {
        entry.physical.split(',').forEach(term => {
          const t = term.trim();
          if (t) physicalCounts[t] = (physicalCounts[t] || 0) + 1;
        });
      }
      if (entry.sleep?.quality) {
        const q = entry.sleep.quality;
        sleepCounts[q] = (sleepCounts[q] || 0) + 1;
      }
    });

    const sortAndLimit = (counts: Record<string, number>) => 
      Object.entries(counts)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6);

    return {
      behavior: sortAndLimit(behaviorCounts),
      physical: sortAndLimit(physicalCounts),
      sleep: sortAndLimit(sleepCounts)
    };
  }, [entries]);

  const addEntry = () => {
    if (!newEntry.food && !newEntry.sleep?.duration) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      mealType: newEntry.mealType as any,
      food: newEntry.food || '',
      behavior: newEntry.behavior || '',
      physical: newEntry.physical || '',
      nutrition: newEntry.nutrition,
      recipeLink: newEntry.recipeLink,
      sleep: newEntry.sleep
    };
    setEntries([entry, ...entries]);
    setShowForm(false);
    setShowAdvancedFood(false);
    setShowSleepSection(false);
    setNewEntry({ 
      mealType: 'Pagi', 
      food: '', 
      behavior: '', 
      physical: '', 
      nutrition: { protein: '', carbs: '', fats: '' },
      recipeLink: '',
      sleep: { duration: '', quality: '', notes: '' }
    });
  };

  const removeEntry = (id: string) => {
    if (window.confirm('Hapus entri ini?')) {
      setEntries(entries.filter(e => e.id !== id));
    }
  };

  const handleTagClick = (field: 'behavior' | 'physical' | 'sleepQuality', tag: string) => {
    if (field === 'sleepQuality') {
      setNewEntry({ ...newEntry, sleep: { ...newEntry.sleep, quality: tag } });
      return;
    }
    const currentVal = (newEntry as any)[field] || '';
    if (currentVal.includes(tag)) return;
    const newVal = currentVal ? `${currentVal}, ${tag}` : tag;
    setNewEntry({ ...newEntry, [field]: newVal });
  };

  const handleExportCSV = () => {
    if (!startDate || !endDate) {
      alert('Pilih rentang tanggal terlebih dahulu.');
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    const filtered = entries.filter(entry => {
      const [d, m, y] = entry.date.split('/');
      const entryDate = new Date(`${y}-${m}-${d}`);
      return entryDate >= start && entryDate <= end;
    });
    if (filtered.length === 0) {
      alert('Tidak ada data dalam rentang tanggal tersebut.');
      return;
    }
    const headers = ['Tanggal', 'Waktu Makan', 'Makanan', 'Protein', 'Karbo', 'Lemak', 'Link Resep', 'Respon Perilaku', 'Kondisi Fisik', 'Durasi Tidur', 'Kualitas Tidur', 'Catatan Tidur'];
    const rows = filtered.map(e => [
      e.date, e.mealType, `"${e.food.replace(/"/g, '""')}"`,
      `"${(e.nutrition?.protein || '').replace(/"/g, '""')}"`,
      `"${(e.nutrition?.carbs || '').replace(/"/g, '""')}"`,
      `"${(e.nutrition?.fats || '').replace(/"/g, '""')}"`,
      `"${(e.recipeLink || '').replace(/"/g, '""')}"`,
      `"${(e.behavior || '').replace(/"/g, '""')}"`,
      `"${(e.physical || '').replace(/"/g, '""')}"`,
      `"${(e.sleep?.duration || '').replace(/"/g, '""')}"`,
      `"${(e.sleep?.quality || '').replace(/"/g, '""')}"`,
      `"${(e.sleep?.notes || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `GFCF_Journal_${startDate}_to_${endDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToCalendar = (entry: JournalEntry) => {
    const [day, month, year] = entry.date.split('/');
    const times: Record<string, string> = { 'Pagi': '070000', 'Snack Pagi': '100000', 'Siang': '123000', 'Snack Sore': '160000', 'Malam': '190000' };
    const startTime = times[entry.mealType] || '080000';
    const endTime = (parseInt(startTime.substring(0, 2)) + 1).toString().padStart(2, '0') + startTime.substring(2);
    const dateFormatted = `${year}${month}${day}`;
    const summary = `GFCF Journal: ${entry.mealType}`;
    let description = `Makanan: ${entry.food || '-'}\\n`;
    if (entry.nutrition?.protein) description += `P:${entry.nutrition.protein}g `;
    if (entry.nutrition?.carbs) description += `C:${entry.nutrition.carbs}g `;
    if (entry.nutrition?.fats) description += `F:${entry.nutrition.fats}g `;
    if (entry.sleep?.duration) description += `\\nTidur: ${entry.sleep.duration} jam (${entry.sleep.quality})`;
    description += `\\nPerilaku: ${entry.behavior || '-'}\\nFisik: ${entry.physical || '-'}`;
    const icsContent = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//GFCF//ID', 'BEGIN:VEVENT', `DTSTART:${dateFormatted}T${startTime}`, `DTEND:${dateFormatted}T${endTime}`, `SUMMARY:${summary}`, `DESCRIPTION:${description}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `GFCF_${dateFormatted}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const groupedEntries = entries.reduce((groups: { [key: string]: JournalEntry[] }, entry) => {
    const date = entry.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(entry);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedEntries).sort((a, b) => {
    const dateA = new Date(a.split('/').reverse().join('-')).getTime();
    const dateB = new Date(b.split('/').reverse().join('-')).getTime();
    return dateB - dateA;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-emerald-600" />
          Jurnal Harian GFCF
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowTrends(!showTrends)}
            title="Analisis Tren"
            className={`p-2 rounded-full shadow-md transition-all ${showTrends ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-400 border border-slate-100'}`}
          >
            <TrendingUp className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowExport(!showExport)}
            title="Ekspor Data"
            className={`p-2 rounded-full shadow-md transition-all ${showExport ? 'bg-blue-100 text-blue-700' : 'bg-white text-slate-400 border border-slate-100'}`}
          >
            <Download className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowForm(!showForm)}
            className={`p-2 rounded-full shadow-lg transition-all ${showForm ? 'bg-slate-200 text-slate-600' : 'bg-emerald-600 text-white'}`}
          >
            <Plus className={`w-5 h-5 transition-transform ${showForm ? 'rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {showTrends && (
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 border-b border-emerald-50 pb-3">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <div>
              <h4 className="text-sm font-bold text-slate-800 leading-tight">Analisis Tren & Pola</h4>
              <p className="text-[10px] text-slate-400 font-medium">Berdasarkan {entries.length} entri jurnal</p>
            </div>
          </div>

          <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-3">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5" /> Frekuensi Perilaku
              </span>
              <div className="h-40 w-full bg-slate-50 rounded-xl p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData.behavior} layout="vertical" margin={{ left: 40, right: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold', fill: '#64748b' }} width={80} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12} fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5" /> Kualitas Tidur
              </span>
              <div className="h-40 w-full bg-slate-50 rounded-xl p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData.sleep} layout="vertical" margin={{ left: 40, right: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold', fill: '#64748b' }} width={80} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12} fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> Gejala Fisik Terbanyak
              </span>
              <div className="h-40 w-full bg-slate-50 rounded-xl p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trendData.physical} layout="vertical" margin={{ left: 40, right: 20 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 'bold', fill: '#64748b' }} width={80} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12} fill="#f97316" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <p className="text-[9px] text-center text-slate-400 italic">Scroll ke bawah untuk melihat semua tren.</p>
        </div>
      )}

      {showExport && (
        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold text-slate-700">Ekspor Jurnal ke CSV</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Dari Tanggal</label>
              <input type="date" className="w-full p-2 text-sm border border-slate-200 rounded-xl outline-none" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Hingga Tanggal</label>
              <input type="date" className="w-full p-2 text-sm border border-slate-200 rounded-xl outline-none" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>
          <button onClick={handleExportCSV} className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-bold shadow-lg flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Unduh File CSV
          </button>
        </div>
      )}

      {showForm && (
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xl space-y-5 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Waktu Makan / Catatan</label>
              <select className="w-full p-2.5 text-sm border border-slate-200 rounded-xl outline-none bg-slate-50" value={newEntry.mealType} onChange={e => setNewEntry({...newEntry, mealType: e.target.value as any})}>
                <option>Pagi</option><option>Snack Pagi</option><option>Siang</option><option>Snack Sore</option><option>Malam</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block">Makanan & Minuman</label>
              <input placeholder="Misal: Nasi putih + Telur dadar" className="w-full p-2.5 text-sm border border-slate-200 rounded-xl outline-none" value={newEntry.food} onChange={e => setNewEntry({...newEntry, food: e.target.value})} />
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowAdvancedFood(!showAdvancedFood)} className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 hover:text-emerald-700">
                  <ChevronRight className={`w-3 h-3 transition-transform ${showAdvancedFood ? 'rotate-90' : ''}`} />
                  Detail Nutrisi
                </button>
                <button type="button" onClick={() => setShowSleepSection(!showSleepSection)} className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:text-indigo-700">
                  <Moon className={`w-3 h-3 transition-transform ${showSleepSection ? 'rotate-90' : ''}`} />
                  Catatan Tidur
                </button>
              </div>

              {showAdvancedFood && (
                <div className="bg-slate-50 p-3 rounded-xl space-y-4 border border-slate-100 animate-in fade-in duration-200">
                  <div className="grid grid-cols-3 gap-2">
                    {['protein', 'carbs', 'fats'].map(nut => (
                      <div key={nut}>
                        <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">{nut === 'carbs' ? 'Karbo' : nut}</label>
                        <input type="number" placeholder="g" className="w-full p-2 text-xs border border-slate-200 rounded-lg outline-none" value={(newEntry.nutrition as any)?.[nut]} onChange={e => setNewEntry({...newEntry, nutrition: {...newEntry.nutrition, [nut]: e.target.value}})} />
                      </div>
                    ))}
                  </div>
                  <input placeholder="https:// Link Resep..." className="w-full p-2 text-xs border border-slate-200 rounded-lg outline-none" value={newEntry.recipeLink} onChange={e => setNewEntry({...newEntry, recipeLink: e.target.value})} />
                </div>
              )}

              {showSleepSection && (
                <div className="bg-indigo-50/50 p-4 rounded-xl space-y-4 border border-indigo-100 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Moon className="w-4 h-4 text-indigo-600" />
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Kualitas & Durasi Tidur</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Durasi (Jam)</label>
                      <div className="relative">
                        <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
                        <input 
                          type="number" 
                          placeholder="Misal: 8" 
                          className="w-full pl-8 p-2 text-xs border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500" 
                          value={newEntry.sleep?.duration} 
                          onChange={e => setNewEntry({...newEntry, sleep: {...newEntry.sleep, duration: e.target.value}})} 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Kualitas</label>
                      <select 
                        className="w-full p-2 text-xs border border-slate-200 rounded-lg outline-none bg-white focus:ring-2 focus:ring-indigo-500"
                        value={newEntry.sleep?.quality}
                        onChange={e => setNewEntry({...newEntry, sleep: {...newEntry.sleep, quality: e.target.value}})}
                      >
                        <option value="">Pilih Kualitas</option>
                        {SLEEP_QUALITY_TAGS.map(q => <option key={q} value={q}>{q}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase block mb-1">Catatan Pola Tidur</label>
                    <textarea 
                      placeholder="Misal: Terbangun jam 2 pagi, mengigau..."
                      className="w-full p-2 text-xs border border-slate-200 rounded-lg outline-none h-16 resize-none focus:ring-2 focus:ring-indigo-500"
                      value={newEntry.sleep?.notes}
                      onChange={e => setNewEntry({...newEntry, sleep: {...newEntry.sleep, notes: e.target.value}})}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1"><Smile className="w-3 h-3" /> Respon Perilaku</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {BEHAVIOR_TAGS.map(tag => (
                  <button key={tag} onClick={() => handleTagClick('behavior', tag)} className="text-[9px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-full hover:bg-emerald-100 transition-colors">+ {tag}</button>
                ))}
              </div>
              <input placeholder="Tambah catatan perilaku..." className="w-full p-2.5 text-sm border border-slate-200 rounded-xl outline-none" value={newEntry.behavior} onChange={e => setNewEntry({...newEntry, behavior: e.target.value})} />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Kondisi Fisik</label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {PHYSICAL_TAGS.map(tag => (
                  <button key={tag} onClick={() => handleTagClick('physical', tag)} className="text-[9px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded-full hover:bg-orange-100 transition-colors">+ {tag}</button>
                ))}
              </div>
              <input placeholder="Tambah catatan fisik..." className="w-full p-2.5 text-sm border border-slate-200 rounded-xl outline-none" value={newEntry.physical} onChange={e => setNewEntry({...newEntry, physical: e.target.value})} />
            </div>
          </div>
          <button onClick={addEntry} className="w-full bg-emerald-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-lg active:scale-[0.98] transition-all">Simpan Entri Jurnal</button>
        </div>
      )}

      <div className="space-y-6">
        <button onClick={() => setShowHistory(!showHistory)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors w-full">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
            {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />} Riwayat Jurnal
          </span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </button>

        {showHistory && (
          <div className="space-y-6">
            {entries.length === 0 ? (
              <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p className="text-sm font-medium">Belum ada riwayat jurnal</p>
              </div>
            ) : (
              sortedDates.map(date => (
                <div key={date} className="space-y-3">
                  <div className="flex items-center gap-2 sticky top-[80px] bg-slate-50/90 backdrop-blur-sm py-1.5 z-10 border-b border-slate-100 mb-1">
                    <CalendarIcon className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-800">{date}</span>
                  </div>
                  <div className="space-y-3">
                    {groupedEntries[date].map(entry => (
                      <div key={entry.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-emerald-100 transition-all group relative">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[9px] font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-tight">{entry.mealType}</span>
                          <div className="flex gap-1">
                            <button onClick={() => exportToCalendar(entry)} className="p-1 text-slate-300 hover:text-emerald-500"><CalendarPlus className="w-4 h-4" /></button>
                            <button onClick={() => removeEntry(entry.id)} className="p-1 text-slate-300 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          {entry.food && <p className="text-sm font-bold text-slate-800">{entry.food}</p>}
                          
                          {entry.sleep?.duration && (
                            <div className="mt-2 p-2 bg-indigo-50 rounded-lg border border-indigo-100/50">
                              <div className="flex items-center gap-2 mb-1">
                                <Moon className="w-3 h-3 text-indigo-500" />
                                <span className="text-[10px] font-bold text-indigo-700">Tidur: {entry.sleep.duration} jam • {entry.sleep.quality}</span>
                              </div>
                              {entry.sleep.notes && <p className="text-[10px] text-indigo-600/80 italic leading-snug">{entry.sleep.notes}</p>}
                            </div>
                          )}

                          {(entry.nutrition?.protein || entry.nutrition?.carbs || entry.nutrition?.fats) && (
                            <div className="flex gap-3 mt-1.5">
                              {['protein', 'carbs', 'fats'].map(n => (
                                <div key={n} className="flex items-center gap-1">
                                  <Activity className={`w-2.5 h-2.5 ${n === 'protein' ? 'text-blue-500' : n === 'carbs' ? 'text-amber-500' : 'text-rose-500'}`} />
                                  <span className="text-[9px] text-slate-500 font-bold">{n.charAt(0).toUpperCase()}: {(entry.nutrition as any)?.[n] || '0'}g</span>
                                </div>
                              ))}
                            </div>
                          )}
                          {entry.recipeLink && <a href={entry.recipeLink.startsWith('http') ? entry.recipeLink : `https://${entry.recipeLink}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 mt-2 hover:underline"><LinkIcon className="w-2.5 h-2.5" /> Lihat Resep</a>}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 border-t border-slate-50 pt-2">
                          <div className="flex items-start gap-1.5 min-w-0">
                            <Smile className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <p className="text-[8px] text-slate-400 uppercase font-bold">Perilaku</p>
                              <p className="text-[11px] text-slate-600 truncate font-medium leading-relaxed">{entry.behavior || '-'}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-1.5 min-w-0">
                            <AlertCircle className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <p className="text-[8px] text-slate-400 uppercase font-bold">Fisik</p>
                              <p className="text-[11px] text-slate-600 truncate font-medium leading-relaxed">{entry.physical || '-'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
