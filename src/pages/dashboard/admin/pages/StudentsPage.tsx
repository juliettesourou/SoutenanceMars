import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Search,
  SlidersHorizontal,
  UserPlus,
} from 'lucide-react';
import AdminTopbar from '../../../../components/adminCEntre/AdminTopbar';
import AdminMobileNav from '../../../../components/adminCEntre/AdminMobileNav';
import Pagination from '../../../../components/adminCEntre/Pagination';
import TableAction from '../../../../components/adminCEntre/TableAction';

type StudentStatus = 'Actif' | 'En attente' | 'A relancer';

interface StudentRow {
  id: number;
  name: string;
  matricule: string;
  filiere: string;
  center: string;
  year: string;
  attendance: string;
  average: string;
  status: StudentStatus;
}

const CenterBadgeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 19.5V8.25L12 4.5l6 3.75V19.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5h.01M15 10.5h.01M12 14.25h.01" />
  </svg>
);

const EnrollmentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7.5 12 4l8 3.5L12 11 4 7.5Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 10.5V16L12 19l5.5-3v-5.5" />
  </svg>
);

const ValidationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.5 10.5 15.5 16.5 8.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0-9-9" />
  </svg>
);

const FollowUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2.5 2.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-9-9" />
  </svg>
);

const CenterPanelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 20.25h16.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 20.25V6.75L12 3.75l5.25 3v13.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75h.01M14.25 9.75h.01M9.75 13.5h.01M14.25 13.5h.01" />
  </svg>
);

const PresenceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8 8 0 1 0-8-8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m12 7 3 3-3 3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10H8" />
  </svg>
);

const StudentsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 8v6M17 11h6" />
  </svg>
);

const CasesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16h.01" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
  </svg>
);

const DirectoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5h12v12H6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5h6M9 13.5h6M9 16.5h4" />
  </svg>
);

const AlertPanelIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 17h.01" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
  </svg>
);

const OverviewIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 19.5h16" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 15V9M12 15V5M17 15v-3" />
  </svg>
);

const studentStats = [
  {
    label: 'Étudiants inscrits',
    value: 482,
    delta: '+12',
    helperText: 'dans votre centre',
    classes: 'from-[#1D4ED8] to-[#2563EB]',
    Icon: StudentsIcon,
  },
  {
    label: 'Présence moyenne',
    value: '93%',
    delta: '+2%',
    helperText: 'sur les 30 derniers jours',
    classes: 'from-[#059669] to-[#10B981]',
    Icon: PresenceIcon,
  },
  {
    label: 'Situations à suivre',
    value: 18,
    delta: '-4',
    helperText: 'dossiers et relances',
    classes: 'from-[#7C3AED] to-[#9333EA]',
    Icon: CasesIcon,
  },
];

const studentRows: StudentRow[] = [
  { id: 1, name: 'Amina Hounkpatin', matricule: 'ETU-24001', filiere: 'Informatique', center: 'Centre Atlantique', year: 'Licence 2', attendance: '96%', average: '15.8/20', status: 'Actif' },
  { id: 2, name: 'Basile Dossou', matricule: 'ETU-24002', filiere: 'Comptabilité', center: 'Centre Mono', year: 'Licence 1', attendance: '88%', average: '13.9/20', status: 'Actif' },
  { id: 3, name: 'Clarisse Kiki', matricule: 'ETU-24003', filiere: 'Réseaux', center: 'Centre Atlantique', year: 'Licence 3', attendance: '72%', average: '12.6/20', status: 'A relancer' },
  { id: 4, name: 'David Houngbo', matricule: 'ETU-24004', filiere: 'Gestion', center: 'Centre Zou', year: 'Licence 2', attendance: '81%', average: '14.1/20', status: 'En attente' },
  { id: 5, name: 'Estelle Adjanohoun', matricule: 'ETU-24005', filiere: 'Marketing', center: 'Centre Atlantique', year: 'Licence 1', attendance: '93%', average: '16.2/20', status: 'Actif' },
  { id: 6, name: 'Ferdinand Sossa', matricule: 'ETU-24006', filiere: 'Informatique', center: 'Centre Mono', year: 'Licence 2', attendance: '77%', average: '11.8/20', status: 'A relancer' },
  { id: 7, name: 'Grâce Koudjodji', matricule: 'ETU-24007', filiere: 'Comptabilité', center: 'Centre Zou', year: 'Licence 3', attendance: '90%', average: '14.7/20', status: 'Actif' },
  { id: 8, name: 'Hervé Assogba', matricule: 'ETU-24008', filiere: 'Réseaux', center: 'Centre Atlantique', year: 'Licence 1', attendance: '84%', average: '13.2/20', status: 'En attente' },
];

const assignedCenter = {
  name: 'Centre Atlantique',
  city: 'Cotonou',
  students: 482,
  active: 441,
  pending: 17,
  attendance: '93%',
  manager: 'Coordination locale',
};

const enrollmentFlow = [
  { label: 'Pré-inscriptions', value: 54, tone: 'bg-sky-50 text-sky-700', Icon: EnrollmentIcon },
  { label: 'Dossiers à valider', value: 18, tone: 'bg-amber-50 text-amber-700', Icon: ValidationIcon },
  { label: 'Relances à faire', value: 11, tone: 'bg-rose-50 text-rose-700', Icon: FollowUpIcon },
];

const statusClasses: Record<StudentStatus, string> = {
  Actif: 'bg-emerald-50 text-emerald-700',
  'En attente': 'bg-amber-50 text-amber-700',
  'A relancer': 'bg-rose-50 text-rose-700',
};

const PAGE_SIZE = 5;

const StudentsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tous' | StudentStatus>('Tous');

  const centerStudents = useMemo(
    () => studentRows.filter((student) => student.center === assignedCenter.name),
    []
  );

  const filteredStudents = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();

    return centerStudents.filter((student) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        student.name.toLowerCase().includes(normalizedQuery) ||
        student.matricule.toLowerCase().includes(normalizedQuery) ||
        student.filiere.toLowerCase().includes(normalizedQuery);

      const matchesStatus = statusFilter === 'Tous' || student.status === statusFilter;

      return matchesQuery && matchesStatus;
    });
  }, [centerStudents, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const studentsToFollowUp = centerStudents.filter((student) => student.status !== 'Actif').slice(0, 4);

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <AdminTopbar
        title="Étudiants du centre"
        subtitle="Suivi des effectifs, des inscriptions et des situations de votre centre"
        rightSlot={<AdminMobileNav />}
      />

      <div className="space-y-6 px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <section className="overflow-hidden rounded-[28px] bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#7C3AED] text-white shadow-xl">
          <div className="grid gap-6 px-5 py-6 lg:grid-cols-[minmax(0,1.2fr)_340px] lg:px-8 lg:py-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-50">
                <CenterBadgeIcon />
                Centre de rattachement
              </div>

              <div className="space-y-3">
                <h2 className="max-w-2xl text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  Une lecture claire de l&apos;activité étudiante de votre centre, sans exposer les données des autres centres.
                </h2>
                <p className="max-w-2xl text-sm text-blue-100/90 sm:text-base">
                  L&apos;admin centre est rattaché à une seule structure. Il pilote uniquement ses étudiants, ses inscriptions en cours et ses priorités locales.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {enrollmentFlow.map(({ label, value, tone, Icon }) => (
                  <div key={label} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-blue-50">{label}</p>
                        <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
                      </div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
                        <Icon />
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>
                        suivi en cours
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[24px] border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <CenterPanelIcon />
                </div>
                <div>
                  <p className="text-sm text-blue-100/90">Centre consulté</p>
                  <p className="text-lg font-semibold text-white">{assignedCenter.name}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{assignedCenter.name}</p>
                      <p className="text-xs text-blue-100/80">
                        {assignedCenter.city} • {assignedCenter.manager}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-blue-100/80" />
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-white/10 px-3 py-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-blue-100/80">Étudiants</p>
                      <p className="mt-1 text-lg font-semibold text-white">{assignedCenter.students}</p>
                    </div>
                    <div className="rounded-xl bg-white/10 px-3 py-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-blue-100/80">Présence</p>
                      <p className="mt-1 text-lg font-semibold text-emerald-200">{assignedCenter.attendance}</p>
                    </div>
                    <div className="rounded-xl bg-white/10 px-3 py-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-blue-100/80">Étudiants actifs</p>
                      <p className="mt-1 text-lg font-semibold text-white">{assignedCenter.active}</p>
                    </div>
                    <div className="rounded-xl bg-white/10 px-3 py-2">
                      <p className="text-xs uppercase tracking-[0.18em] text-blue-100/80">Dossiers en attente</p>
                      <p className="mt-1 text-lg font-semibold text-white">{assignedCenter.pending}</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studentStats.map(({ label, value, delta, helperText, classes, Icon }) => (
            <article
              key={label}
              className={`rounded-3xl bg-gradient-to-r ${classes} p-5 text-white shadow-md sm:p-6`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-sm font-medium opacity-90 sm:text-base">{label}</p>
                  <p className="text-4xl font-semibold tracking-tight sm:text-5xl">{value}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <Icon />
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs sm:text-sm">
                <span className="font-medium text-white">{delta}</span>
                <span className="opacity-80">{helperText}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_360px]">
          <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <header className="flex flex-col gap-4 border-b border-slate-100 pb-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4ED8]">
                  <DirectoryIcon />
                </div>
                <div>
                <h2 className="text-lg font-semibold text-slate-900">Répertoire des étudiants du centre</h2>
                <p className="text-sm text-slate-500">
                  {filteredStudents.length} étudiant{filteredStudents.length > 1 ? 's' : ''} de {assignedCenter.name} visible{filteredStudents.length > 1 ? 's' : ''} dans la sélection actuelle
                </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="relative block min-w-[240px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Rechercher nom, matricule, filière..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#1D4ED8] focus:bg-white"
                  />
                </label>

                <label className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600">
                  <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                  <select
                    value={statusFilter}
                    onChange={(event) => {
                      setStatusFilter(event.target.value as 'Tous' | StudentStatus);
                      setPage(1);
                    }}
                    className="bg-transparent text-sm text-slate-700 outline-none"
                  >
                    <option value="Tous">Toutes les situations</option>
                    <option value="Actif">Actifs</option>
                    <option value="En attente">En attente</option>
                    <option value="A relancer">À relancer</option>
                  </select>
                </label>

                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1A43BF]"
                >
                  <UserPlus className="h-4 w-4" />
                  Ajouter
                </button>
              </div>
            </header>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-700">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-3 py-2">Étudiant</th>
                    <th className="px-3 py-2">Filière</th>
                    <th className="px-3 py-2">Niveau</th>
                    <th className="px-3 py-2">Présence</th>
                    <th className="px-3 py-2">Moyenne</th>
                    <th className="px-3 py-2">Statut</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((student) => (
                    <tr key={student.id} className="border-t border-slate-100">
                      <td className="px-3 py-3">
                        <div>
                          <p className="font-medium text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-500">{student.matricule} • {student.year}</p>
                        </div>
                      </td>
                      <td className="px-3 py-3">{student.filiere}</td>
                      <td className="px-3 py-3">{student.year}</td>
                      <td className="px-3 py-3">{student.attendance}</td>
                      <td className="px-3 py-3">{student.average}</td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[student.status]}`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <TableAction onEdit={() => {}} onDelete={() => {}} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {paginatedStudents.length === 0 ? (
                <div className="flex min-h-40 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center text-sm text-slate-500">
                  Aucun étudiant ne correspond aux filtres actuels.
                </div>
              ) : null}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setPage} />
          </article>

          <aside className="space-y-4">
            <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                  <AlertPanelIcon />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Situations prioritaires</h3>
                  <p className="text-sm text-slate-500">Étudiants qui demandent une attention rapide dans votre centre.</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {studentsToFollowUp.map((student) => (
                  <div key={student.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-slate-900">{student.name}</p>
                        <p className="text-xs text-slate-500">{assignedCenter.name} • {student.filiere}</p>
                      </div>
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusClasses[student.status]}`}>
                        {student.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">
                      Présence {student.attendance} • Moyenne {student.average}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-[#C7D2FE] bg-[#EEF2FF] p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#1D4ED8] shadow-sm">
                  <OverviewIcon />
                </div>
                <h3 className="text-base font-semibold text-slate-900">Repères rapides du centre</h3>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2">
                  <span className="text-sm text-slate-600">Informatique</span>
                  <span className="text-sm font-semibold text-slate-900">312</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2">
                  <span className="text-sm text-slate-600">Comptabilité</span>
                  <span className="text-sm font-semibold text-slate-900">274</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2">
                  <span className="text-sm text-slate-600">Réseaux</span>
                  <span className="text-sm font-semibold text-slate-900">198</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2">
                  <span className="text-sm text-slate-600">Gestion</span>
                  <span className="text-sm font-semibold text-slate-900">164</span>
                </div>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
};

export default StudentsPage;
