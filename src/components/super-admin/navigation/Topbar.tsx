import React from 'react';
import { Bell, ChevronDown, Globe, Search, Settings2 } from 'lucide-react';

const Topbar: React.FC = () => {
  return (
    <header className="flex flex-col gap-3 bg-[#F3F7FF] px-4 pb-3 pt-4 md:flex-row md:items-center md:justify-between md:pt-6 md:pb-4 sm:px-6 lg:px-10">
      <div>
        <h1 className="text-lg font-semibold text-[#0F172A] sm:text-xl">Gestion des étudiants</h1>
      </div>

      <div className="flex items-center justify-between gap-3 self-stretch md:self-auto md:justify-end sm:gap-4 md:gap-5">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-400">
            <Search className="h-4 w-4" strokeWidth={2.1} />
          </span>
          <input
            type="text"
            placeholder="Recherche"
            className="rounded-full border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/30"
          />
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-[#1D4ED8]">
          <Settings2 className="h-4.5 w-4.5" strokeWidth={2.1} />
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-[#1D4ED8]">
          <Bell className="h-4.5 w-4.5" strokeWidth={2.1} />
        </button>

        <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EFF6FF] text-[#1D4ED8]">
            <Globe className="h-4 w-4" strokeWidth={2.1} />
          </span>
          <span>Français</span>
          <span className="text-lg">🇫🇷</span>
          <ChevronDown className="h-4 w-4 text-slate-400" strokeWidth={2.1} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
