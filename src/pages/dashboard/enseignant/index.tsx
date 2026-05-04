import React from 'react';
import {
  BellRing,
  BookOpenText,
  CalendarClock,
  ClipboardCheck,
  MessageSquareMore,
  TriangleAlert,
  Users,
} from 'lucide-react';
import EnseignantTopbar from '../../../components/enseignant/EnseignantTopbar';
import {
  teacherClasses,
  teacherEvaluations,
  teacherMessages,
  teacherNotifications,
  teacherProfile,
  teacherSessions,
} from './data';

const attendanceStyles: Record<string, string> = {
  'A faire': 'border-amber-100 bg-amber-50 text-amber-700',
  'En cours': 'border-sky-100 bg-sky-50 text-sky-700',
  Validee: 'border-emerald-100 bg-emerald-50 text-emerald-700',
};

const EnseignantDashboardPage: React.FC = () => {
  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <EnseignantTopbar
        title={`Bonjour, ${teacherProfile.name}`}
        subtitle="Suivez vos cours, marquez les presences, saisissez les notes et gardez le lien avec les tuteurs."
      />

      <div className="space-y-6 px-4 pb-10 pt-6 sm:px-6 lg:px-10">
        <section className="relative overflow-hidden rounded-[28px] border border-[#D7E3FF] bg-[linear-gradient(135deg,#1D4ED8_0%,#0F766E_100%)] p-6 text-white shadow-sm">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_24%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.16),_transparent_28%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.4fr,0.9fr]">
            <div>
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/90">
                Suivi pedagogique
              </span>
              <h1 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight">
                Un espace enseignant centre sur les presences, les notes et la communication parentale.
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-white/80">
                {teacherProfile.speciality} • Prochain cours: {teacherProfile.nextCourse}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
                  <p className="text-xs text-white/70">Seances du jour</p>
                  <p className="mt-2 text-2xl font-semibold">{teacherSessions.length}</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
                  <p className="text-xs text-white/70">Presences a valider</p>
                  <p className="mt-2 text-2xl font-semibold">
                    {teacherSessions.filter((item) => item.attendanceStatus !== 'Validee').length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
                  <p className="text-xs text-white/70">Messages non lus</p>
                  <p className="mt-2 text-2xl font-semibold">{teacherMessages.filter((item) => item.unread).length}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[26px] border border-white/15 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-white/70">Priorites du jour</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-white/10 px-4 py-3">
                  <p className="text-sm text-white/70">Presence en attente</p>
                  <p className="mt-1 font-semibold text-white">Algorithmique - Licence 2 a 10:30</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-3">
                  <p className="text-sm text-white/70">Note a transmettre</p>
                  <p className="mt-1 font-semibold text-white">Interrogation SQL avant 16h</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-4 py-3">
                  <p className="text-sm text-white/70">Suivi parent</p>
                  <p className="mt-1 font-semibold text-white">1 justification d absence a consulter</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-[#E8EDFF] p-3 text-[#1D4ED8]">
                <CalendarClock className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">Seances programmees</p>
                <p className="text-2xl font-semibold text-slate-900">{teacherSessions.length}</p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <ClipboardCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">Evaluations suivies</p>
                <p className="text-2xl font-semibold text-slate-900">{teacherEvaluations.length}</p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                <Users className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">Classes suivies</p>
                <p className="text-2xl font-semibold text-slate-900">{teacherClasses.length}</p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-rose-50 p-3 text-rose-700">
                <BellRing className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">Alertes actives</p>
                <p className="text-2xl font-semibold text-slate-900">{teacherNotifications.length}</p>
              </div>
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <header className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Emploi du temps et presences</h2>
                <p className="text-sm text-slate-500">Marquez chaque etudiant present, absent ou en retard pour chaque seance.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Aujourd hui</span>
            </header>

            <div className="space-y-4">
              {teacherSessions.map((session) => (
                <article key={session.id} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">{session.course}</h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {session.classLabel} • {session.room} • {session.time}
                      </p>
                    </div>
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${attendanceStyles[session.attendanceStatus]}`}>
                      {session.attendanceStatus}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Presence relevee</p>
                      <p className="mt-2 font-semibold text-slate-900">
                        {session.attendanceStatus === 'A faire' ? 'A renseigner' : `${session.attendanceRate}%`}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Action attendue</p>
                      <p className="mt-2 font-semibold text-slate-900">
                        {session.attendanceStatus === 'Validee' ? 'Liste cloturee' : 'Valider la feuille de presence'}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </article>

          <div className="space-y-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <header className="flex items-center gap-3">
                <span className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                  <BookOpenText className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Notes et evaluations</h2>
                  <p className="text-sm text-slate-500">Suivi rapide des notes avant validation officielle.</p>
                </div>
              </header>

              <div className="mt-4 space-y-3">
                {teacherEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="rounded-2xl bg-slate-50 px-4 py-3">
                    <p className="font-semibold text-slate-900">{evaluation.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{evaluation.classLabel}</p>
                    <p className="mt-2 text-sm text-slate-700">
                      {evaluation.status} • {evaluation.average}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <header className="flex items-center gap-3">
                <span className="rounded-2xl bg-rose-50 p-3 text-rose-700">
                  <TriangleAlert className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Etudiants a suivre</h2>
                  <p className="text-sm text-slate-500">Cas signales au responsable de classe ou a l administration.</p>
                </div>
              </header>

              <div className="mt-4 space-y-3">
                {teacherClasses.map((classItem) => (
                  <div key={classItem.id} className="rounded-2xl bg-rose-50/70 px-4 py-3">
                    <p className="font-semibold text-slate-900">{classItem.label}</p>
                    <p className="mt-1 text-sm text-slate-600">{classItem.repeatedAbsences} absences repetees</p>
                    <p className="mt-2 text-sm text-rose-800">{classItem.atRiskStudents.join(', ')}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <header className="flex items-center gap-3">
                <span className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                  <MessageSquareMore className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Messagerie recente</h2>
                  <p className="text-sm text-slate-500">Echanges avec tuteurs et administration.</p>
                </div>
              </header>

              <div className="mt-4 space-y-3">
                {teacherMessages.slice(0, 2).map((message) => (
                  <div key={message.id} className="rounded-2xl bg-slate-50 px-4 py-3">
                    <p className="font-semibold text-slate-900">{message.subject}</p>
                    <p className="mt-1 text-sm text-slate-500">{message.sender}</p>
                    <p className="mt-2 text-sm text-slate-700">{message.preview}</p>
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

export default EnseignantDashboardPage;
