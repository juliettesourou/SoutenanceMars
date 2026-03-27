import React, { useMemo, useState } from 'react';
import {
  BarChart3,
  BookOpenText,
  CheckCircle2,
  Layers3,
  Search,
  ShieldAlert,
} from 'lucide-react';
import AdminTopbar from '../../../../components/adminCEntre/AdminTopbar';
import AdminMobileNav from '../../../../components/adminCEntre/AdminMobileNav';

type SubjectStatus = 'Bien couverte' | 'A equilibrer' | 'A renforcer';

interface SubjectItem {
  id: string;
  name: string;
  unit: string;
  filiere: string;
  level: string;
  coefficient: number;
  hours: number;
  teacher: string;
  completion: number;
  status: SubjectStatus;
  highlights: string[];
}

const subjects: SubjectItem[] = [
  {
    id: 's1',
    name: 'Algorithmique avancee',
    unit: 'UE Fondamentale 3',
    filiere: 'Informatique',
    level: 'Licence 2',
    coefficient: 4,
    hours: 36,
    teacher: 'Fidele Agossou',
    completion: 88,
    status: 'Bien couverte',
    highlights: [
      'Volume horaire bien distribué sur le semestre.',
      'Couverture enseignante stable.',
      'Évaluation finale déjà planifiée.',
    ],
  },
  {
    id: 's2',
    name: 'Comptabilite generale',
    unit: 'UE Professionnelle 1',
    filiere: 'Comptabilite',
    level: 'Licence 1',
    coefficient: 3,
    hours: 28,
    teacher: 'Marianne Dossou',
    completion: 72,
    status: 'A equilibrer',
    highlights: [
      'Des heures restent à repositionner sur le mois prochain.',
      'Coefficient cohérent mais progression pédagogique irrégulière.',
      'Besoin de lisser les activités dirigées.',
    ],
  },
  {
    id: 's3',
    name: 'Administration reseaux',
    unit: 'UE Technique 2',
    filiere: 'Reseaux',
    level: 'Licence 3',
    coefficient: 5,
    hours: 24,
    teacher: 'Aicha Ahlonsou',
    completion: 58,
    status: 'A renforcer',
    highlights: [
      'Le taux de réalisation est en dessous de l objectif.',
      'Une partie des séances pratiques doit être replanifiée.',
      'Le suivi pédagogique mérite une attention rapide.',
    ],
  },
];

const statusStyles: Record<SubjectStatus, string> = {
  'Bien couverte': 'border-emerald-100 bg-emerald-50 text-emerald-700',
  'A equilibrer': 'border-amber-100 bg-amber-50 text-amber-700',
  'A renforcer': 'border-rose-100 bg-rose-50 text-rose-700',
};

const statusAccent: Record<SubjectStatus, string> = {
  'Bien couverte': 'from-emerald-500 to-teal-500',
  'A equilibrer': 'from-amber-500 to-orange-500',
  'A renforcer': 'from-rose-500 to-pink-500',
};

const MatieresPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tous' | SubjectStatus>('Tous');
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id ?? '');

  const filteredSubjects = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    return subjects.filter((subject) => {
      const matchesSearch =
        !normalized ||
        subject.name.toLowerCase().includes(normalized) ||
        subject.unit.toLowerCase().includes(normalized) ||
        subject.filiere.toLowerCase().includes(normalized) ||
        subject.teacher.toLowerCase().includes(normalized);
      const matchesStatus = statusFilter === 'Tous' || subject.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const selectedSubject = useMemo(() => {
    return filteredSubjects.find((subject) => subject.id === selectedSubjectId) ?? filteredSubjects[0] ?? subjects[0];
  }, [filteredSubjects, selectedSubjectId]);

  const stats = useMemo(() => {
    const totalHours = subjects.reduce((sum, subject) => sum + subject.hours, 0);
    const averageCompletion = Math.round(subjects.reduce((sum, subject) => sum + subject.completion, 0) / subjects.length);
    const watchCount = subjects.filter((subject) => subject.status === 'A renforcer').length;
    return { totalHours, averageCompletion, watchCount };
  }, []);

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <AdminTopbar
        title="Matières et unités"
        subtitle="Suivez la couverture pédagogique, les coefficients et les volumes horaires du centre"
        rightSlot={<AdminMobileNav />}
      />

      <section className="space-y-6 px-4 pb-8 pt-6 sm:px-6 lg:space-y-8 lg:px-10 lg:pb-12">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#7C3AED] px-6 py-9 text-white shadow-[0_30px_80px_rgba(37,99,235,0.25)] sm:px-8 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.35),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.25),_transparent_26%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE]/40 bg-[#DBEAFE] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-[#1D4ED8] shadow-sm">
                Admin Centre • Matières
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
                Une vue pédagogique claire pour organiser les unités, les coefficients et la charge d enseignement.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
                Cette interface aide à lire rapidement la couverture des matières, leur avancement et les points de rééquilibrage.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-50">Repères du centre</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Unités suivies</p>
                  <p className="mt-2 text-4xl font-bold">{subjects.length}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Heures prévues</p>
                  <p className="mt-2 text-4xl font-bold">{stats.totalHours}h</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Avancement moyen</p>
                  <p className="mt-2 text-4xl font-bold">{stats.averageCompletion}%</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">A renforcer</p>
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
                <p className="text-xs uppercase tracking-[0.28em] text-blue-100">Catalogue</p>
                <p className="mt-3 text-4xl font-bold">{subjects.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <Layers3 className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-blue-50">unités pédagogiques visibles</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#1EB980]">Couverture</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.averageCompletion}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#1EB980]">
                <CheckCircle2 className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">progression pédagogique moyenne</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6C4CCF]">Coefficient</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">4.0</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-[#6C4CCF]">
                <BookOpenText className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">coefficient moyen des unités suivies</p>
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
            <p className="mt-1 text-sm text-slate-500">unités à renforcer rapidement</p>
          </article>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2C6ED5]">Pilotage pédagogique</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Vue d ensemble des matières</h2>
                  <p className="mt-1 text-sm text-slate-500">Sélectionnez une unité pour consulter sa situation pédagogique.</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Rechercher une matière, une filière"
                      className="w-full rounded-full border border-slate-200 py-2.5 pl-11 pr-4 text-sm text-slate-600 placeholder:text-slate-400 focus:border-[#2C6ED5] focus:outline-none focus:ring-4 focus:ring-[#2C6ED5]/10 sm:w-80"
                    />
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as 'Tous' | SubjectStatus)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 focus:border-[#2C6ED5] focus:outline-none focus:ring-4 focus:ring-[#2C6ED5]/10"
                  >
                    <option value="Tous">Toutes les situations</option>
                    <option value="Bien couverte">Bien couvertes</option>
                    <option value="A equilibrer">À équilibrer</option>
                    <option value="A renforcer">À renforcer</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                {filteredSubjects.map((subject) => {
                  const isSelected = selectedSubject?.id === subject.id;
                  return (
                    <div
                      key={subject.id}
                      className={`rounded-[26px] border p-5 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#2C6ED5]/30 bg-[#EFF6FF] shadow-[0_18px_45px_rgba(44,110,213,0.18)]'
                          : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-[#2C6ED5]/20 hover:shadow-lg'
                      }`}
                    >
                      <button type="button" onClick={() => setSelectedSubjectId(subject.id)} className="w-full text-left">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                              {subject.unit}
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-[#0F172A]">{subject.name}</h3>
                            <p className="mt-1 text-sm text-slate-500">{subject.filiere} • {subject.level}</p>
                          </div>
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[subject.status]}`}>
                            {subject.status}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Coef.</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{subject.coefficient}</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Heures</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{subject.hours}h</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Avancement</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{subject.completion}%</p>
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
            {selectedSubject ? (
              <section className="overflow-hidden rounded-[30px] border border-[#0F172A]/5 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
                <div className={`bg-gradient-to-r ${statusAccent[selectedSubject.status]} px-6 py-6 text-white`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Unité observée</p>
                      <h2 className="mt-2 text-2xl font-bold">{selectedSubject.name}</h2>
                      <p className="mt-2 text-sm text-white/85">{selectedSubject.filiere} • {selectedSubject.level}</p>
                    </div>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                      {selectedSubject.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-6 p-6">
                  <div className="rounded-[26px] border border-slate-100 bg-slate-50/80 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Synthèse pédagogique</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Coef.</p>
                        <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedSubject.coefficient}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Heures</p>
                        <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedSubject.hours}h</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Avancement</p>
                        <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedSubject.completion}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-slate-100 bg-white p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2C6ED5]">
                        <BarChart3 className="h-5 w-5" strokeWidth={2.1} />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2C6ED5]">Lecture administrative</p>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-600">Avancement pédagogique</span>
                          <span className="font-semibold text-[#0F172A]">{selectedSubject.completion}%</span>
                        </div>
                        <div className="h-3 rounded-full bg-slate-100">
                          <div className="h-3 rounded-full bg-gradient-to-r from-[#2C6ED5] to-[#55A3FF]" style={{ width: `${selectedSubject.completion}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-slate-100 bg-white p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">Points d attention</p>
                        <h3 className="mt-2 text-lg font-semibold text-[#0F172A]">Lecture du centre</h3>
                      </div>
                      <div className="rounded-2xl bg-rose-50 px-4 py-3 text-center">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-400">Responsable</p>
                        <p className="mt-1 text-sm font-bold text-rose-600">{selectedSubject.teacher}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {selectedSubject.highlights.map((item, index) => (
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

export default MatieresPage;
