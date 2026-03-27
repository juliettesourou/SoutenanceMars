import React, { useMemo, useState } from 'react';
import {
  BookOpenText,
  CheckCircle2,
  GraduationCap,
  Plus,
  Search,
  ShieldAlert,
  UserRoundCog,
  X,
} from 'lucide-react';
import AdminTopbar from '../../../../components/adminCEntre/AdminTopbar';
import AdminMobileNav from '../../../../components/adminCEntre/AdminMobileNav';

type TeacherStatus = 'Disponible' | 'Charge elevee' | 'A renforcer';

interface TeacherItem {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  units: number;
  hours: number;
  classes: number;
  status: TeacherStatus;
  highlights: string[];
}

const teachers: TeacherItem[] = [
  {
    id: 't1',
    name: 'Aicha Ahlonsou',
    specialty: 'Architecture logicielle',
    email: 'aicha.ahlonsou@enangnon.bj',
    phone: '+229 01 90 10 10 10',
    units: 4,
    hours: 18,
    classes: 3,
    status: 'Disponible',
    highlights: [
      'Bonne disponibilité pour une nouvelle session.',
      'Coordination fluide avec les évaluations de Licence 3.',
      'Peut prendre un groupe supplémentaire si besoin.',
    ],
  },
  {
    id: 't2',
    name: 'Fidele Agossou',
    specialty: 'Algorithmique',
    email: 'fidele.agossou@enangnon.bj',
    phone: '+229 01 91 11 11 11',
    units: 5,
    hours: 24,
    classes: 4,
    status: 'Charge elevee',
    highlights: [
      'Volume horaire déjà élevé cette semaine.',
      'À surveiller avant toute nouvelle affectation.',
      'Risque de chevauchement sur deux classes.',
    ],
  },
  {
    id: 't3',
    name: 'Marianne Dossou',
    specialty: 'Comptabilite generale',
    email: 'marianne.dossou@enangnon.bj',
    phone: '+229 01 92 22 22 22',
    units: 3,
    hours: 12,
    classes: 2,
    status: 'A renforcer',
    highlights: [
      'Besoin d appui sur la surveillance des examens.',
      'Créneaux encore disponibles pour la semaine prochaine.',
      'Une nouvelle salle peut être ajoutée sans surcharge.',
    ],
  },
];

const statusStyles: Record<TeacherStatus, string> = {
  Disponible: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  'Charge elevee': 'border-amber-100 bg-amber-50 text-amber-700',
  'A renforcer': 'border-rose-100 bg-rose-50 text-rose-700',
};

const statusAccent: Record<TeacherStatus, string> = {
  Disponible: 'from-emerald-500 to-teal-500',
  'Charge elevee': 'from-amber-500 to-orange-500',
  'A renforcer': 'from-rose-500 to-pink-500',
};

const TeachersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tous' | TeacherStatus>('Tous');
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0]?.id ?? '');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredTeachers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return teachers.filter((teacher) => {
      const matchesSearch =
        !normalizedSearch ||
        teacher.name.toLowerCase().includes(normalizedSearch) ||
        teacher.specialty.toLowerCase().includes(normalizedSearch) ||
        teacher.email.toLowerCase().includes(normalizedSearch);

      const matchesStatus = statusFilter === 'Tous' || teacher.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const selectedTeacher = useMemo(() => {
    return filteredTeachers.find((teacher) => teacher.id === selectedTeacherId) ?? filteredTeachers[0] ?? teachers[0];
  }, [filteredTeachers, selectedTeacherId]);

  const stats = useMemo(() => {
    const available = teachers.filter((teacher) => teacher.status === 'Disponible').length;
    const totalHours = teachers.reduce((sum, teacher) => sum + teacher.hours, 0);
    const totalUnits = teachers.reduce((sum, teacher) => sum + teacher.units, 0);
    return { available, totalHours, totalUnits };
  }, []);

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <AdminTopbar
        title="Gestion des enseignants"
        subtitle="Suivez les disponibilites, les charges et les affectations pedagogiques du centre"
        rightSlot={<AdminMobileNav />}
      />

      <section className="space-y-6 px-4 pb-8 pt-6 sm:px-6 lg:space-y-8 lg:px-10 lg:pb-12">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#7C3AED] px-6 py-9 text-white shadow-[0_30px_80px_rgba(37,99,235,0.25)] sm:px-8 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.35),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.25),_transparent_26%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE]/40 bg-[#DBEAFE] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-[#1D4ED8] shadow-sm">
                Admin Centre • Enseignants
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
                Une vue claire pour répartir les enseignants, équilibrer les charges et sécuriser les affectations.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
                Cette interface aide l&apos;admin centre à piloter les disponibilités, les volumes horaires et la couverture pédagogique.
              </p>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-50">Vue rapide</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Enseignants actifs</p>
                  <p className="mt-2 text-4xl font-bold">{teachers.length}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Disponibles</p>
                  <p className="mt-2 text-4xl font-bold">{stats.available}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Volume horaire</p>
                  <p className="mt-2 text-4xl font-bold">{stats.totalHours}h</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Unités couvertes</p>
                  <p className="mt-2 text-4xl font-bold">{stats.totalUnits}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[28px] bg-gradient-to-br from-[#2C6ED5] to-[#55A3FF] p-5 text-white shadow-lg shadow-[#2C6ED5]/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-100">Equipe</p>
                <p className="mt-3 text-4xl font-bold">{teachers.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <UserRoundCog className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-blue-50">enseignants suivis dans le centre</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#1EB980]">Disponibilite</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.available}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#1EB980]">
                <CheckCircle2 className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">enseignants mobilisables rapidement</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6C4CCF]">Pedagogie</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.totalUnits}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-[#6C4CCF]">
                <BookOpenText className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">unités actuellement couvertes</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-rose-500">Vigilance</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{teachers.filter((teacher) => teacher.status !== 'Disponible').length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                <ShieldAlert className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">profils a suivre ou à renforcer</p>
          </article>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2C6ED5]">Affectation</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Vue d ensemble des enseignants</h2>
                  <p className="mt-1 text-sm text-slate-500">Choisissez un enseignant pour consulter son niveau de charge et ses affectations.</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Rechercher un enseignant, une spécialité"
                      className="w-full rounded-full border border-slate-200 py-2.5 pl-11 pr-4 text-sm text-slate-600 placeholder:text-slate-400 focus:border-[#2C6ED5] focus:outline-none focus:ring-4 focus:ring-[#2C6ED5]/10 sm:w-80"
                    />
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as 'Tous' | TeacherStatus)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 focus:border-[#2C6ED5] focus:outline-none focus:ring-4 focus:ring-[#2C6ED5]/10"
                  >
                    <option value="Tous">Toutes les situations</option>
                    <option value="Disponible">Disponibles</option>
                    <option value="Charge elevee">Charge elevee</option>
                    <option value="A renforcer">A renforcer</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1A43BF]"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter un enseignant
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                {filteredTeachers.map((teacher) => {
                  const isSelected = selectedTeacher?.id === teacher.id;

                  return (
                    <div
                      key={teacher.id}
                      className={`rounded-[26px] border p-5 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#2C6ED5]/30 bg-[#EFF6FF] shadow-[0_18px_45px_rgba(44,110,213,0.18)]'
                          : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-[#2C6ED5]/20 hover:shadow-lg'
                      }`}
                    >
                      <button type="button" onClick={() => setSelectedTeacherId(teacher.id)} className="w-full text-left">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                              {teacher.specialty}
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-[#0F172A]">{teacher.name}</h3>
                            <p className="mt-1 text-sm text-slate-500">{teacher.email}</p>
                          </div>
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[teacher.status]}`}>
                            {teacher.status}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Unités</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{teacher.units}</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Heures</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{teacher.hours}h</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Classes</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{teacher.classes}</p>
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
            {selectedTeacher ? (
              <section className="overflow-hidden rounded-[30px] border border-[#0F172A]/5 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
                <div className={`bg-gradient-to-r ${statusAccent[selectedTeacher.status]} px-6 py-6 text-white`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Enseignant observe</p>
                      <h2 className="mt-2 text-2xl font-bold">{selectedTeacher.name}</h2>
                      <p className="mt-2 text-sm text-white/85">{selectedTeacher.specialty}</p>
                    </div>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                      {selectedTeacher.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-6 p-6">
                  <div className="rounded-[26px] border border-slate-100 bg-slate-50/80 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Synthese de charge</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Heures</p>
                        <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedTeacher.hours}h</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Unites</p>
                        <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedTeacher.units}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Classes</p>
                        <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedTeacher.classes}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[26px] border border-slate-100 bg-white p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2C6ED5]">
                        <GraduationCap className="h-5 w-5" strokeWidth={2.1} />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2C6ED5]">Coordonnees</p>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-slate-600">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Email</p>
                        <p className="mt-2 font-semibold text-[#0F172A]">{selectedTeacher.email}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Telephone</p>
                        <p className="mt-2 font-semibold text-[#0F172A]">{selectedTeacher.phone}</p>
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
                        <p className="mt-1 text-sm font-bold text-rose-600">{selectedTeacher.status}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3">
                      {selectedTeacher.highlights.map((item, index) => (
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

      {showCreateModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[30px] border border-[#DBEAFE] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2C6ED5]">Création</p>
                <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Ajouter un enseignant</h3>
                <p className="mt-1 text-sm text-slate-500">Préparez la fiche de l enseignant avant affectation.</p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 px-6 py-6 md:grid-cols-2 xl:grid-cols-3">
              <input readOnly value="Nom complet de l enseignant" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none" />
              <input readOnly value="Specialite principale" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none" />
              <input readOnly value="Telephone professionnel" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none" />
              <input readOnly value="Email institutionnel" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none" />
              <input readOnly value="Volume horaire cible" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none" />
              <input readOnly value="Unites a couvrir" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none" />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default TeachersPage;
