import React from 'react';
import {
  AlertTriangle,
  BellRing,
  CalendarClock,
  CheckCircle2,
  Clock3,
  DoorOpen,
  FileWarning,
  GraduationCap,
  LayoutGrid,
  MapPin,
  Plus,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import SurveillantTopbar from '../../../components/surveillant/SurveillantTopbar';

const stats = [
  {
    label: 'Cours programmés',
    value: '28',
    detail: 'cette semaine',
    icon: CalendarClock,
    style: 'bg-[#E8EDFF] text-[#1D4ED8]',
  },
  {
    label: 'Salles affectées',
    value: '14',
    detail: 'sur 16 disponibles',
    icon: DoorOpen,
    style: 'bg-emerald-50 text-emerald-700',
  },
  {
    label: 'Conflits détectés',
    value: '3',
    detail: 'à corriger',
    icon: AlertTriangle,
    style: 'bg-amber-50 text-amber-700',
  },
  {
    label: 'Absences signalées',
    value: '12',
    detail: "aujourd'hui",
    icon: FileWarning,
    style: 'bg-rose-50 text-rose-700',
  },
];

const schedule = [
  {
    id: 1,
    time: '08:00 - 10:00',
    course: 'Mathématiques appliquées',
    classLabel: 'Licence 1 - Informatique',
    teacher: 'M. Ahouandjinou',
    room: 'Salle B12',
    status: 'Validé',
  },
  {
    id: 2,
    time: '10:15 - 12:15',
    course: 'Base de données',
    classLabel: 'Licence 2 - Informatique',
    teacher: 'Mme Gandonou',
    room: 'Laboratoire 2',
    status: 'À vérifier',
  },
  {
    id: 3,
    time: '14:00 - 16:00',
    course: 'Communication professionnelle',
    classLabel: 'BTS 1 - Gestion',
    teacher: 'Mme Hounkpatin',
    room: 'Salle A04',
    status: 'Validé',
  },
  {
    id: 4,
    time: '16:15 - 18:15',
    course: 'Réseaux informatiques',
    classLabel: 'Licence 3 - Systèmes',
    teacher: 'M. Kouton',
    room: 'Salle C08',
    status: 'Conflit',
  },
];

const conflicts = [
  {
    title: 'Salle C08 occupée',
    detail: 'Deux cours sont placés sur le créneau 16:15 - 18:15.',
    level: 'Critique',
  },
  {
    title: 'Enseignant indisponible',
    detail: 'M. Kouton a déclaré une indisponibilité le vendredi après-midi.',
    level: 'À traiter',
  },
  {
    title: 'Chevauchement de filière',
    detail: 'Licence 2 - Informatique a deux matières entre 10:00 et 12:15.',
    level: 'À traiter',
  },
];

const absences = [
  { student: 'Ariane Tossou', classLabel: 'Licence 1', course: 'Mathématiques', type: 'Absent', notified: true },
  { student: 'David Mensah', classLabel: 'BTS 1', course: 'Communication', type: 'Retard', notified: false },
  { student: 'Grâce Houessou', classLabel: 'Licence 3', course: 'Réseaux', type: 'Absent', notified: true },
];

const resources = [
  { label: 'Enseignants disponibles', value: '22/26', color: 'bg-[#1D4ED8]' },
  { label: 'Salles libres après 14h', value: '6', color: 'bg-[#0F766E]' },
  { label: 'Créneaux complets', value: '9', color: 'bg-[#F59E0B]' },
];

const statusStyles: Record<string, string> = {
  Validé: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  'À vérifier': 'border-amber-100 bg-amber-50 text-amber-700',
  Conflit: 'border-rose-100 bg-rose-50 text-rose-700',
};

const SurveillantDashboardPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <SurveillantTopbar
        title="Organisation pédagogique"
        subtitle="Emplois du temps, affectations, conflits de salles et suivi des absences."
        rightSlot={
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1742B6]">
            <Plus className="h-4 w-4" />
            Nouveau cours
          </button>
        }
      />

      <div className="space-y-6 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <section className="relative overflow-hidden rounded-[28px] border border-[#D7E3FF] bg-[linear-gradient(135deg,#1D4ED8_0%,#0F766E_100%)] p-6 text-white shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_26%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.14),_transparent_30%)]" />
          <div className="relative grid gap-6 xl:grid-cols-[1.35fr,0.9fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-white/90">
                <ShieldCheck className="h-4 w-4" />
                Surveillance académique
              </span>
              <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight">
                Piloter les emplois du temps, les salles et les absences sans conflit opérationnel.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
                Vue consolidée des filières, niveaux, matières, enseignants, salles et créneaux horaires du centre.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {resources.map((resource) => (
                  <div key={resource.label} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
                    <div className={`h-1.5 w-12 rounded-full ${resource.color}`} />
                    <p className="mt-3 text-xs text-white/70">{resource.label}</p>
                    <p className="mt-2 text-2xl font-semibold">{resource.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[26px] border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-white/70">Actions prioritaires</p>
              <div className="mt-4 space-y-3">
                {conflicts.slice(0, 2).map((conflict) => (
                  <div key={conflict.title} className="rounded-2xl bg-white/10 px-4 py-3">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-100" />
                      <div>
                        <p className="font-semibold text-white">{conflict.title}</p>
                        <p className="mt-1 text-sm text-white/72">{conflict.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#1D4ED8] shadow-sm transition hover:bg-[#F8FAFF]">
                  <LayoutGrid className="h-4 w-4" />
                  Ouvrir le planning
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, detail, icon: Icon, style }) => (
            <article key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <span className={`rounded-2xl p-3 ${style}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm text-slate-500">{label}</p>
                  <div className="mt-1 flex items-end gap-2">
                    <p className="text-2xl font-semibold text-slate-900">{value}</p>
                    <p className="pb-1 text-xs text-slate-400">{detail}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.45fr,0.8fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <header className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Emploi du temps du jour</h2>
                <p className="text-sm text-slate-500">Affectations par matière, enseignant, salle et créneau.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#1D4ED8] hover:text-[#1D4ED8]">
                  <CalendarClock className="h-4 w-4" />
                  Semaine
                </button>
                <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#1D4ED8] hover:text-[#1D4ED8]">
                  <UsersRound className="h-4 w-4" />
                  Filières
                </button>
              </div>
            </header>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-y border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <th className="px-4 py-3 font-semibold">Créneau</th>
                    <th className="px-4 py-3 font-semibold">Cours</th>
                    <th className="px-4 py-3 font-semibold">Enseignant</th>
                    <th className="px-4 py-3 font-semibold">Salle</th>
                    <th className="px-4 py-3 font-semibold">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {schedule.map((item) => (
                    <tr key={item.id} className="align-top text-slate-700">
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="inline-flex items-center gap-2 font-semibold text-slate-900">
                          <Clock3 className="h-4 w-4 text-[#1D4ED8]" />
                          {item.time}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-900">{item.course}</p>
                        <p className="mt-1 text-sm text-slate-500">{item.classLabel}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="inline-flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-slate-400" />
                          {item.teacher}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-slate-400" />
                          {item.room}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <div className="space-y-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <header className="flex items-center gap-3">
                <span className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Conflits à résoudre</h2>
                  <p className="text-sm text-slate-500">Chevauchements et indisponibilités.</p>
                </div>
              </header>

              <div className="mt-4 space-y-3">
                {conflicts.map((conflict) => (
                  <div key={conflict.title} className="rounded-2xl border border-amber-100 bg-amber-50/60 px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{conflict.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{conflict.detail}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-amber-700">
                        {conflict.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <header className="flex items-center gap-3">
                <span className="rounded-2xl bg-rose-50 p-3 text-rose-700">
                  <BellRing className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Absences récentes</h2>
                  <p className="text-sm text-slate-500">Signalements envoyés à l'administration.</p>
                </div>
              </header>

              <div className="mt-4 space-y-3">
                {absences.map((absence) => (
                  <div key={`${absence.student}-${absence.course}`} className="rounded-2xl bg-slate-50 px-4 py-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{absence.student}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {absence.classLabel} • {absence.course} • {absence.type}
                        </p>
                      </div>
                      {absence.notified ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      ) : (
                        <Clock3 className="h-5 w-5 shrink-0 text-amber-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SurveillantDashboardPage;
