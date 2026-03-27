import React, { useMemo, useState } from 'react';
import {
  Activity,
  BarChart3,
  GraduationCap,
  Search,
  ShieldAlert,
  Trophy,
} from 'lucide-react';
import AdminTopbar from '../../../../components/adminCEntre/AdminTopbar';
import AdminMobileNav from '../../../../components/adminCEntre/AdminMobileNav';

type PerformanceStatus = 'Solide' | 'A consolider' | 'Sous vigilance';

interface PerformanceItem {
  id: string;
  filiere: string;
  level: string;
  average: number;
  attendance: number;
  validationRate: number;
  students: number;
  status: PerformanceStatus;
  highlights: string[];
}

const performances: PerformanceItem[] = [
  {
    id: 'p1',
    filiere: 'Informatique',
    level: 'Licence 3',
    average: 14.8,
    attendance: 93,
    validationRate: 89,
    students: 68,
    status: 'Solide',
    highlights: [
      'Très bon équilibre entre présence et résultats.',
      'Progression stable sur le dernier mois.',
      'Peut servir de cohorte de référence.',
    ],
  },
  {
    id: 'p2',
    filiere: 'Comptabilite',
    level: 'Licence 1',
    average: 12.9,
    attendance: 87,
    validationRate: 78,
    students: 74,
    status: 'A consolider',
    highlights: [
      'Résultats corrects mais encore irréguliers.',
      'La présence reste en dessous de l objectif du centre.',
      'Un accompagnement pédagogique ciblé est utile.',
    ],
  },
  {
    id: 'p3',
    filiere: 'Reseaux',
    level: 'Licence 2',
    average: 11.6,
    attendance: 79,
    validationRate: 64,
    students: 41,
    status: 'Sous vigilance',
    highlights: [
      'Baisse de la présence sur les trois dernières semaines.',
      'Taux de validation en retrait.',
      'Des actions rapides sont recommandées.',
    ],
  },
];

const statusStyles: Record<PerformanceStatus, string> = {
  Solide: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  'A consolider': 'border-amber-100 bg-amber-50 text-amber-700',
  'Sous vigilance': 'border-rose-100 bg-rose-50 text-rose-700',
};

const statusAccent: Record<PerformanceStatus, string> = {
  Solide: 'from-emerald-500 to-teal-500',
  'A consolider': 'from-amber-500 to-orange-500',
  'Sous vigilance': 'from-rose-500 to-pink-500',
};

const PerformancesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tous' | PerformanceStatus>('Tous');
  const [selectedPerformanceId, setSelectedPerformanceId] = useState(performances[0]?.id ?? '');

  const filteredPerformances = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return performances.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.filiere.toLowerCase().includes(normalizedSearch) ||
        item.level.toLowerCase().includes(normalizedSearch);

      const matchesStatus = statusFilter === 'Tous' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const selectedPerformance = useMemo(() => {
    return (
      filteredPerformances.find((item) => item.id === selectedPerformanceId) ??
      filteredPerformances[0] ??
      performances[0]
    );
  }, [filteredPerformances, selectedPerformanceId]);

  const stats = useMemo(() => {
    const bestAverage = Math.max(...performances.map((item) => item.average));
    const globalAttendance = Math.round(
      performances.reduce((sum, item) => sum + item.attendance, 0) / performances.length
    );
    const watchCount = performances.filter((item) => item.status === 'Sous vigilance').length;
    return { bestAverage, globalAttendance, watchCount };
  }, []);

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <AdminTopbar
        title="Suivi des performances"
        subtitle="Analysez les résultats académiques et repérez les cohortes à accompagner"
        rightSlot={<AdminMobileNav />}
      />

      <section className="space-y-6 px-4 pb-8 pt-6 sm:px-6 lg:space-y-8 lg:px-10 lg:pb-12">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#7C3AED] px-6 py-9 text-white shadow-[0_30px_80px_rgba(37,99,235,0.25)] sm:px-8 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.35),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.25),_transparent_26%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE]/40 bg-[#DBEAFE] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-[#1D4ED8] shadow-sm">
                Admin Centre • Performances
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
                Une lecture claire des résultats pour piloter les cohortes et anticiper les besoins d appui.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
                Cette page donne à l administration une vue simple sur les moyennes, la présence et les taux de validation.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-50">Repères du centre</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Meilleure moyenne</p>
                  <p className="mt-2 text-4xl font-bold">{stats.bestAverage}/20</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Présence moyenne</p>
                  <p className="mt-2 text-4xl font-bold">{stats.globalAttendance}%</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Filières suivies</p>
                  <p className="mt-2 text-4xl font-bold">{performances.length}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Sous vigilance</p>
                  <p className="mt-2 text-4xl font-bold">{stats.watchCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[28px] bg-gradient-to-br from-[#2C6ED5] to-[#55A3FF] p-5 text-white shadow-lg shadow-[#2C6ED5]/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-100">Resultats</p>
                <p className="mt-3 text-4xl font-bold">{stats.bestAverage}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Trophy className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-blue-50">meilleure moyenne observée</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#1EB980]">Presence</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.globalAttendance}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#1EB980]">
                <Activity className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">présence moyenne consolidée</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6C4CCF]">Validation</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">77%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-[#6C4CCF]">
                <GraduationCap className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">taux de validation global du centre</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-rose-500">Vigilance</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.watchCount}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                <ShieldAlert className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">cohortes à suivre de près</p>
          </article>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2C6ED5]">Analyse</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Vue d ensemble des performances</h2>
                  <p className="mt-1 text-sm text-slate-500">Sélectionnez une cohorte pour lire ses indicateurs en détail.</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Rechercher une filière, un niveau"
                      className="w-full rounded-full border border-slate-200 py-2.5 pl-11 pr-4 text-sm text-slate-600 placeholder:text-slate-400 focus:border-[#2C6ED5] focus:outline-none focus:ring-4 focus:ring-[#2C6ED5]/10 sm:w-80"
                    />
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as 'Tous' | PerformanceStatus)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 focus:border-[#2C6ED5] focus:outline-none focus:ring-4 focus:ring-[#2C6ED5]/10"
                  >
                    <option value="Tous">Toutes les situations</option>
                    <option value="Solide">Solides</option>
                    <option value="A consolider">À consolider</option>
                    <option value="Sous vigilance">Sous vigilance</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                {filteredPerformances.map((item) => {
                  const isSelected = selectedPerformance?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`rounded-[26px] border p-5 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#2C6ED5]/30 bg-[#EFF6FF] shadow-[0_18px_45px_rgba(44,110,213,0.18)]'
                          : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-[#2C6ED5]/20 hover:shadow-lg'
                      }`}
                    >
                      <button type="button" onClick={() => setSelectedPerformanceId(item.id)} className="w-full text-left">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                              {item.level}
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-[#0F172A]">{item.filiere}</h3>
                            <p className="mt-1 text-sm text-slate-500">{item.students} étudiants suivis</p>
                          </div>
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}>
                            {item.status}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Moyenne</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{item.average}/20</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Présence</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{item.attendance}%</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Validation</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{item.validationRate}%</p>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            {selectedPerformance ? (
              <section className="overflow-hidden rounded-[30px] border border-[#0F172A]/5 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
                <div className={`bg-gradient-to-r ${statusAccent[selectedPerformance.status]} px-6 py-6 text-white`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Cohorte observée</p>
                      <h2 className="mt-2 text-2xl font-bold">{selectedPerformance.filiere}</h2>
                      <p className="mt-2 text-sm text-white/85">{selectedPerformance.level}</p>
                    </div>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                      {selectedPerformance.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-6 p-6">
                  <div className="rounded-[26px] border border-slate-100 bg-slate-50/80 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Synthèse de cohorte</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Moyenne</p>
                        <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedPerformance.average}/20</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Présence</p>
                        <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedPerformance.attendance}%</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Validation</p>
                        <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedPerformance.validationRate}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-slate-100 bg-white p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2C6ED5]">
                        <BarChart3 className="h-5 w-5" strokeWidth={2.1} />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2C6ED5]">Lecture analytique</p>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-600">Présence</span>
                          <span className="font-semibold text-[#0F172A]">{selectedPerformance.attendance}%</span>
                        </div>
                        <div className="h-3 rounded-full bg-slate-100">
                          <div className="h-3 rounded-full bg-gradient-to-r from-[#2C6ED5] to-[#55A3FF]" style={{ width: `${selectedPerformance.attendance}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-600">Validation</span>
                          <span className="font-semibold text-[#0F172A]">{selectedPerformance.validationRate}%</span>
                        </div>
                        <div className="h-3 rounded-full bg-slate-100">
                          <div className="h-3 rounded-full bg-gradient-to-r from-[#6C4CCF] to-[#8A6FE8]" style={{ width: `${selectedPerformance.validationRate}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-slate-100 bg-white p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">Points d attention</p>
                        <h3 className="mt-2 text-lg font-semibold text-[#0F172A]">Lecture administrative</h3>
                      </div>
                      <div className="rounded-2xl bg-rose-50 px-4 py-3 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-400">Statut</p>
                        <p className="mt-1 text-sm font-bold text-rose-600">{selectedPerformance.status}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {selectedPerformance.highlights.map((item, index) => (
                        <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                          <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#2C6ED5] shadow-sm">
                            {index + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
};

export default PerformancesPage;
