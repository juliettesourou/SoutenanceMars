import React from 'react';
import Topbar from '../../components/super-admin/navigation/Topbar';
import { absences, grades } from '../../features/super-admin/students/data/student';

const PresenceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a8 8 0 1 0-8-8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m12 7 3 3-3 3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10H8" />
  </svg>
);

const CoursesIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7.5 12 4l8 3.5L12 11 4 7.5Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 10.5V16L12 19l5.5-3v-5.5" />
  </svg>
);

const AbsenceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14v14H5z" />
  </svg>
);

const TableIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 11h16M9 6v12M15 6v12" />
  </svg>
);

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5A2.25 2.25 0 0 1 6 5.25h3l1.5 2.25H18A2.25 2.25 0 0 1 20.25 9.75v7.5A2.25 2.25 0 0 1 18 19.5H6a2.25 2.25 0 0 1-2.25-2.25v-9.75Z" />
  </svg>
);

const cards = [
  {
    label: 'Taux de presence (%)',
    value: '15',
    change: '↑ 3.46%',
    caption: 'Ce mois',
    classes: 'from-[#059669] to-[#10B981]',
    Icon: PresenceIcon,
  },
  {
    label: 'Nombre total de cours suivis',
    value: '5',
    change: '↑ 3.46%',
    caption: 'Ce mois',
    classes: 'from-[#1D4ED8] to-[#2563EB]',
    Icon: CoursesIcon,
  },
  {
    label: "Nombre d'absences",
    value: '5',
    change: '↑ 3.46%',
    caption: 'Ce mois',
    classes: 'from-[#7C3AED] to-[#9333EA]',
    Icon: AbsenceIcon,
  },
];

const StudentDetailsPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <Topbar />
      <section className="space-y-5 px-4 pb-6 sm:px-6 lg:space-y-6 lg:px-10 lg:pb-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#0F172A] sm:text-xl">Detail etudiant</h2>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Vue globale des performances, absences et documents.
            </p>
          </div>
        </div>

        <div className="grid gap-6 items-start">
          <div className="w-full space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map(({ label, value, change, caption, classes, Icon }) => (
                <div
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
                    <span className="font-medium text-emerald-100">{change}</span>
                    <span className="opacity-80">{caption}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                    <AbsenceIcon />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] sm:text-lg">Absences</h3>
                </div>
              </div>

              <div className="px-4 pb-4 sm:px-6">
                <div className="grid grid-cols-2 gap-3 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 sm:grid-cols-4 sm:gap-4 sm:text-sm">
                  <span>Date</span>
                  <span>Cours</span>
                  <span>Type d&apos;absence</span>
                  <span>Motif</span>
                </div>

                {absences.map((absence) => (
                  <div
                    key={`${absence.date}-${absence.course}`}
                    className="mb-2 grid grid-cols-2 items-center gap-3 rounded-2xl bg-[#F9FAFB] px-3 py-3 text-sm sm:grid-cols-4 sm:gap-4 sm:px-4 sm:text-base"
                  >
                    <span className="font-medium text-slate-700">{absence.date}</span>
                    <span className="text-slate-700">{absence.course}</span>
                    <span>
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold sm:text-sm ${
                          absence.type === 'Justifiée'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-red-50 text-red-500'
                        }`}
                      >
                        {absence.type}
                      </span>
                    </span>
                    <span className="text-slate-500">{absence.reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#1D4ED8]">
                    <TableIcon />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] sm:text-lg">Notes</h3>
                </div>
                <span className="hidden text-sm text-slate-500 sm:inline">1ere semestre</span>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm sm:text-base">
                  <thead>
                    <tr className="bg-[#EEF2FF] text-xs font-semibold uppercase tracking-[0.08em] text-slate-600 sm:text-sm">
                      <th className="px-4 py-3 text-left">Matiere</th>
                      <th colSpan={3} className="bg-[#F6F0FF] px-4 py-3 text-center">
                        Interrogation
                      </th>
                      <th className="px-4 py-3 text-center">Devoir</th>
                      <th className="px-4 py-3 text-center">Coef</th>
                      <th className="px-4 py-3 text-center">Moyenne</th>
                    </tr>
                    <tr className="border-b border-slate-200 bg-[#EEF2FF] text-xs text-slate-500 sm:text-sm">
                      <th />
                      <th className="px-4 py-2 text-center">1ere</th>
                      <th className="px-4 py-2 text-center">2eme</th>
                      <th className="px-4 py-2 text-center">3eme</th>
                      <th />
                      <th />
                      <th />
                    </tr>
                  </thead>

                  <tbody className="text-slate-700">
                    {grades.map((row, idx) => (
                      <tr key={row.matiere} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}>
                        <td className="whitespace-nowrap px-4 py-3 font-medium">{row.matiere}</td>
                        {row.interrogations.map((note) => (
                          <td key={note} className="px-4 py-3 text-center">
                            {note}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center">{row.devoir}</td>
                        <td className="px-4 py-3 text-center">{row.coef}</td>
                        <td className="px-4 py-3 text-center font-semibold text-[#1D4ED8]">{row.moyenne}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                    <FolderIcon />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] sm:text-lg">
                    Documents &amp; Dossiers
                  </h3>
                </div>
              </div>
              <div className="px-4 py-5 text-sm text-slate-500 sm:px-6 sm:text-base">
                <p>Liste des documents de l&apos;etudiant.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StudentDetailsPage;
