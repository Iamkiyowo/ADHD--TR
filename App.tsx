
import React, { useState } from 'react';
import { ViewState, User, UserRole } from './types';
import { LEARNING_MODULES, SPIRITUAL_GEMS } from './constants';
import { BottomNav } from './components/BottomNav';
import { ModuleCard } from './components/ModuleCard';
import { ProgressChart } from './components/ProgressChart';
import { RotationMenu } from './components/RotationMenu';
import { FoodGuide } from './components/FoodGuide';
import { DailyJournal } from './components/DailyJournal';
import { ImplementationChecklist } from './components/ImplementationChecklist';
import { Login } from './components/Login';
import { PsychologistDashboard } from './components/PsychologistDashboard';
import { ChildBiodataForm } from './components/ChildBiodataForm';
// Added ChevronRight to imports
import { Book, Star, Leaf, ArrowRight, Heart, Quote, Users, Search, Filter, Info, LogOut, ShieldCheck, UserCircle, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Pondasi', 'Nutrisi', 'Perilaku', 'Keluarga', 'Spiritual'];
  const filteredModules = activeCategory === 'Semua' 
    ? LEARNING_MODULES 
    : LEARNING_MODULES.filter(m => m.category === activeCategory);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.role === UserRole.PSYCHOLOGIST) {
      setView(ViewState.PSYCHOLOGIST_DASHBOARD);
    } else {
      setView(ViewState.HOME);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView(ViewState.HOME);
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderHeader = () => (
    <header className="bg-white pt-10 pb-4 px-6 sticky top-0 z-40 border-b border-slate-100">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
             <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">GFCF MONITOR</p>
             {currentUser.role === UserRole.PSYCHOLOGIST && (
               <span className="text-[8px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full uppercase">Psikolog</span>
             )}
          </div>
          <h1 className="text-xl font-bold text-emerald-900 leading-tight">Ikhtiar & Cinta</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleLogout}
            className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
          <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center transform rotate-3">
             <Leaf className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
      </div>
    </header>
  );

  const renderHome = () => {
    const savedBiodata = localStorage.getItem('gfcf_child_biodata');
    const biodata = savedBiodata ? JSON.parse(savedBiodata) : null;

    return (
      <div className="space-y-6">
        <div className="bg-emerald-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 p-4 opacity-10 transform group-hover:scale-110 transition-transform">
            <Heart className="w-32 h-32" />
          </div>
          <p className="text-[10px] font-bold text-emerald-300 uppercase mb-2 tracking-widest">Amanah & Ikhtiar</p>
          <h2 className="text-2xl font-bold mb-2 relative z-10 leading-tight">Menyatu dalam Ilmu, Ikhtiar, dan Cinta</h2>
          <p className="text-emerald-100 text-xs mb-6 leading-relaxed relative z-10 opacity-90">
            Panduan komprehensif mendampingi anak dengan Autisme & ADHD melalui pendekatan GFCF yang Halal & Thayyib.
          </p>
          <div className="flex gap-2 relative z-10">
            <button 
              onClick={() => setView(ViewState.LEARN)}
              className="bg-white text-emerald-900 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-lg"
            >
              Pelajari Ilmu <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Biodata Quick Access */}
        <div 
          onClick={() => setView(ViewState.BIODATA)}
          className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4 cursor-pointer hover:border-emerald-500 transition-all group"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
            <UserCircle className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-800">Biodata Ananda</h3>
            <p className="text-[10px] text-slate-500">{biodata ? `Update terakhir: ${biodata.nickname}` : 'Lengkapi data ananda untuk sinkronisasi psikolog'}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
        </div>

        <ImplementationChecklist />

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-orange-100 rounded-lg">
                <Star className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Kepatuhan</span>
            </div>
            <p className="text-2xl font-black text-slate-800">85%</p>
            <p className="text-[10px] text-emerald-600 font-bold">Thayyib Index</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Users className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Kisah</span>
            </div>
            <p className="text-2xl font-black text-slate-800">4+</p>
            <p className="text-[10px] text-slate-400 font-bold">Inspirasi Orang Tua</p>
          </div>
        </div>
      </div>
    );
  };

  const renderLearn = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-800 leading-tight">Cahaya Ilmu</h2>
          <p className="text-slate-500 text-sm">Landasan kuat untuk setiap langkah ikhtiar.</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 custom-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              activeCategory === cat 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100' 
                : 'bg-white text-slate-400 border-slate-100 hover:border-emerald-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 items-start">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-blue-800 leading-relaxed">
          <strong>Tip:</strong> Seringkali perubahan perilaku anak baru terlihat nyata setelah 3-6 bulan konsistensi diet GFCF. Tetap istiqomah ya, Ayah & Bunda!
        </p>
      </div>

      <div className="space-y-4">
        {filteredModules.length > 0 ? (
          filteredModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))
        ) : (
          <div className="text-center py-12 text-slate-400">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Modul tidak ditemukan di kategori ini.</p>
          </div>
        )}
      </div>

      <div className="p-8 bg-slate-100 rounded-3xl text-center border-2 border-dashed border-slate-200">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Coming Soon</p>
        <p className="text-sm font-bold text-slate-600">Modul Sensori & Terapi Okupasi</p>
      </div>
    </div>
  );

  const renderTools = () => (
    <div className="space-y-6">
      <ProgressChart />
      <DailyJournal />
      <FoodGuide />
    </div>
  );

  const renderRotation = () => (
    <div className="space-y-6">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-slate-800">Panduan Rotasi</h2>
        <p className="text-slate-500 text-sm">Menjaga keberagaman menu harian.</p>
      </div>
      <RotationMenu />
    </div>
  );

  const renderSpiritual = () => (
    <div className="space-y-6">
       <div className="mb-2">
        <h2 className="text-xl font-bold text-slate-800">Spiritual Coping</h2>
        <p className="text-slate-500 text-sm">Menata hati dengar cahaya Al-Qur'an.</p>
      </div>

      {SPIRITUAL_GEMS.map((gem, i) => (
        <div key={i} className="bg-white rounded-3xl p-8 shadow-sm border border-emerald-50 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
          <p className="font-arabic text-3xl leading-loose text-slate-800 mb-6 text-center">
            {gem.verse}
          </p>
          <div className="space-y-2 text-center">
            <p className="text-slate-600 italic text-sm">"{gem.meaning}"</p>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{gem.ref}</p>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-50">
            <p className="text-xs text-slate-500 leading-relaxed text-center">
              <span className="font-bold text-emerald-700">Pesan:</span> {gem.note}
            </p>
          </div>
        </div>
      ))}

      <div className="bg-emerald-900 rounded-3xl p-6 text-white">
        <h3 className="font-bold mb-4 text-center">Doa Penguat Hati</h3>
        <p className="font-arabic text-xl leading-relaxed mb-4 text-center">
          رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي
        </p>
        <p className="text-[10px] opacity-80 text-center uppercase tracking-widest">Ya Tuhanku, lapangkanlah dadaku, dan mudahkanlah urusanku.</p>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case ViewState.HOME: return renderHome();
      case ViewState.LEARN: return renderLearn();
      case ViewState.TOOLS: return renderTools();
      case ViewState.ROTATION: return renderRotation();
      case ViewState.SPIRITUAL: return renderSpiritual();
      case ViewState.PSYCHOLOGIST_DASHBOARD: return <PsychologistDashboard />;
      case ViewState.BIODATA: return <ChildBiodataForm />;
      default: return renderHome();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-safe">
      {renderHeader()}
      
      <main className="max-w-md mx-auto px-6 pb-28 pt-4">
        {renderCurrentView()}
      </main>

      {currentUser.role === UserRole.PARENT ? (
        <BottomNav currentView={currentView} setView={setView} />
      ) : (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 pb-safe pt-2 px-2 shadow-lg z-50">
          <div className="flex justify-around items-center pb-4 md:pb-2 max-w-md mx-auto">
            <button
              onClick={() => setView(ViewState.PSYCHOLOGIST_DASHBOARD)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                currentView === ViewState.PSYCHOLOGIST_DASHBOARD
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <ShieldCheck className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-semibold">Pantau Pasien</span>
            </button>
            <button
              onClick={() => setView(ViewState.LEARN)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                currentView === ViewState.LEARN
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Book className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-semibold">Pustaka Ilmu</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
