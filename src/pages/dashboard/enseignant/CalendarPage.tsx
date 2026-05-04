import React, { useEffect, useMemo, useState } from 'react';
import { CalendarClock, CheckCircle2, Clock3, MapPin, Send, UserCheck, UserX } from 'lucide-react';
import EnseignantTopbar from '../../../components/enseignant/EnseignantTopbar';
import type { AttendanceMark } from './data';
import {
  TEACHER_ATTENDANCE_STORAGE_KEY,
  TEACHER_MESSAGES_STORAGE_KEY,
  TEACHER_SESSIONS_STORAGE_KEY,
  teacherAttendanceSheets,
  teacherSessions,
} from './data';

const attendanceStyles: Record<string, string> = {
  'A faire': 'border-amber-100 bg-amber-50 text-amber-700',
  'En cours': 'border-sky-100 bg-sky-50 text-sky-700',
  Validee: 'border-emerald-100 bg-emerald-50 text-emerald-700',
};

const markStyles: Record<AttendanceMark, string> = {
  Present: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Absent: 'border-rose-200 bg-rose-50 text-rose-700',
  Retard: 'border-amber-200 bg-amber-50 text-amber-700',
};

const markLabels: Record<AttendanceMark, string> = {
  Present: 'Present',
  Absent: 'Absent',
  Retard: 'Retard',
};

const EnseignantCalendarPage: React.FC = () => {
  const [sessionItems, setSessionItems] = useState(teacherSessions);
  const [selectedSessionId, setSelectedSessionId] = useState(teacherSessions[1]?.id ?? teacherSessions[0]?.id ?? '');
  const [sheets, setSheets] = useState(teacherAttendanceSheets);
  const [parentAlerts, setParentAlerts] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedSessions = localStorage.getItem(TEACHER_SESSIONS_STORAGE_KEY);
      const storedSheets = localStorage.getItem(TEACHER_ATTENDANCE_STORAGE_KEY);

      if (storedSessions) {
        setSessionItems(JSON.parse(storedSessions));
      }

      if (storedSheets) {
        setSheets(JSON.parse(storedSheets));
      }
    } catch {
      // Keep fallback values when local storage is unavailable or malformed.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TEACHER_SESSIONS_STORAGE_KEY, JSON.stringify(sessionItems));
  }, [sessionItems]);

  useEffect(() => {
    localStorage.setItem(TEACHER_ATTENDANCE_STORAGE_KEY, JSON.stringify(sheets));
  }, [sheets]);

  const selectedSession =
    sessionItems.find((session) => session.id === selectedSessionId) ?? sessionItems[0];

  const selectedSheet = selectedSession ? sheets[selectedSession.id] ?? [] : [];

  const counts = useMemo(() => {
    return selectedSheet.reduce(
      (acc, student) => {
        acc[student.status] += 1;
        return acc;
      },
      { Present: 0, Absent: 0, Retard: 0 }
    );
  }, [selectedSheet]);

  const attendanceRate = selectedSheet.length === 0 ? 0 : Math.round((counts.Present / selectedSheet.length) * 100);

  const handleStatusChange = (studentId: string, nextStatus: AttendanceMark) => {
    if (!selectedSession) return;
    if (selectedSession.attendanceStatus === 'Validee') return;

    setSheets((current) => ({
      ...current,
      [selectedSession.id]: (current[selectedSession.id] ?? []).map((student) =>
        student.id === studentId ? { ...student, status: nextStatus } : student
      ),
    }));
  };

  const handleValidateAttendance = () => {
    if (!selectedSession) return;
    if (selectedSession.attendanceStatus === 'Validee') return;

    const absentStudents = selectedSheet.filter((student) => student.status === 'Absent');

    const generatedMessages = absentStudents.map((student) => ({
      id: `absence-${selectedSession.id}-${student.id}`,
      sender: student.guardianName,
      role: 'Tuteur',
      subject: `Absence signalee - ${student.name}`,
      preview: `Votre enfant ${student.name} a ete marque absent au cours de ${selectedSession.course} le ${selectedSession.dateLabel} a ${selectedSession.time}.`,
      channel: 'Parent' as const,
      unread: true,
    }));

    setSessionItems((current) =>
      current.map((session) =>
        session.id === selectedSession.id
          ? {
              ...session,
              attendanceStatus: 'Validee',
              attendanceRate,
            }
          : session
      )
    );

    if (generatedMessages.length > 0) {
      try {
        const storedMessages = localStorage.getItem(TEACHER_MESSAGES_STORAGE_KEY);
        const parsedMessages = storedMessages ? (JSON.parse(storedMessages) as typeof generatedMessages) : [];
        const nextMessages = [...generatedMessages, ...parsedMessages.filter(
          (message) => !generatedMessages.some((generated) => generated.id === message.id)
        )];
        localStorage.setItem(TEACHER_MESSAGES_STORAGE_KEY, JSON.stringify(nextMessages));
      } catch {
        localStorage.setItem(TEACHER_MESSAGES_STORAGE_KEY, JSON.stringify(generatedMessages));
      }

      setParentAlerts(generatedMessages.map((message) => message.subject));
      return;
    }

    setParentAlerts([]);
  };

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <EnseignantTopbar title="Calendrier" subtitle="Vos seances du jour avec le statut des listes de presence" />

      <div className="space-y-6 px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <header className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Seances prevues aujourd hui</h2>
              <p className="text-sm text-slate-500">Le responsable de salle cree les seances, l enseignant suit et valide la presence.</p>
            </div>
            <span className="rounded-full bg-[#E8EDFF] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">23 avril 2026</span>
          </header>

          <div className="space-y-4">
            {sessionItems.map((session) => (
              <article key={session.id} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarClock className="h-4 w-4" />
                      <span>{session.time}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900">{session.course}</h3>
                    <p className="mt-1 text-sm text-slate-500">{session.classLabel}</p>
                  </div>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${attendanceStyles[session.attendanceStatus]}`}>
                    Presence {session.attendanceStatus.toLowerCase()}
                  </span>
                </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs text-slate-400">Salle</p>
                    <p className="mt-1 flex items-center gap-2 font-semibold text-slate-900">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {session.room}
                    </p>
                  </div>
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs text-slate-400">Liste de presence</p>
                      <p className="mt-1 font-semibold text-slate-900">{session.attendanceStatus}</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs text-slate-400">Taux de presence</p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {session.attendanceStatus === 'A faire' ? 'En attente' : `${session.attendanceRate}%`}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedSessionId(session.id)}
                    className={`mt-4 inline-flex rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                      selectedSessionId === session.id
                        ? 'bg-[#1D4ED8] text-white'
                        : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Ouvrir la feuille de presence
                  </button>
                </article>
              ))}
            </div>
          </section>

        {selectedSession ? (
          <section className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <header>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Seance selectionnee</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{selectedSession.course}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {selectedSession.classLabel} • {selectedSession.dateLabel} • {selectedSession.time}
                </p>
              </header>

              <div className="mt-5 space-y-3">
                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs text-slate-400">Salle</p>
                  <p className="mt-1 font-semibold text-slate-900">{selectedSession.room}</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <UserCheck className="h-4 w-4" />
                    <p className="text-sm font-semibold">Presents</p>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-emerald-900">{counts.Present}</p>
                </div>
                <div className="rounded-2xl bg-rose-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-rose-700">
                    <UserX className="h-4 w-4" />
                    <p className="text-sm font-semibold">Absents</p>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-rose-900">{counts.Absent}</p>
                </div>
                <div className="rounded-2xl bg-amber-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Clock3 className="h-4 w-4" />
                    <p className="text-sm font-semibold">Retards</p>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-amber-900">{counts.Retard}</p>
                </div>
                <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] px-4 py-3">
                  <div className="flex items-center gap-2 text-[#1D4ED8]">
                    <CheckCircle2 className="h-4 w-4" />
                    <p className="text-sm font-semibold">Taux de presence calcule</p>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{attendanceRate}%</p>
                </div>
                <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Send className="h-4 w-4" />
                    <p className="text-sm font-semibold">Communication parentale</p>
                  </div>
                  <p className="mt-2 text-sm text-amber-900">
                    {counts.Absent > 0
                      ? `${counts.Absent} alerte(s) parent(s) seront generee(s) a la validation.`
                      : 'Aucune alerte parentale necessaire pour cette seance.'}
                  </p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <header className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Feuille de presence</h2>
                  <p className="text-sm text-slate-500">Marquez chaque etudiant comme present, absent ou en retard.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${attendanceStyles[selectedSession.attendanceStatus]}`}>
                    Statut {selectedSession.attendanceStatus.toLowerCase()}
                  </span>
                  <button
                    type="button"
                    onClick={handleValidateAttendance}
                    disabled={selectedSession.attendanceStatus === 'Validee'}
                    className={`inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                      selectedSession.attendanceStatus === 'Validee'
                        ? 'cursor-not-allowed bg-emerald-100 text-emerald-700'
                        : 'bg-[#1D4ED8] text-white hover:bg-[#1E40AF]'
                    }`}
                  >
                    {selectedSession.attendanceStatus === 'Validee' ? 'Presence validee' : 'Valider la presence'}
                  </button>
                </div>
              </header>

              {parentAlerts.length > 0 ? (
                <div className="mb-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                  <p className="text-sm font-semibold text-emerald-800">Alertes envoyees vers la messagerie parentale</p>
                  <p className="mt-1 text-sm text-emerald-700">{parentAlerts.join(' • ')}</p>
                </div>
              ) : null}

              <div className="space-y-3">
                {selectedSheet.map((student) => (
                  <article
                    key={student.id}
                    className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">{student.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{student.matricule}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(['Present', 'Absent', 'Retard'] as AttendanceMark[]).map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => handleStatusChange(student.id, status)}
                            disabled={selectedSession.attendanceStatus === 'Validee'}
                            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                              student.status === status
                                ? markStyles[status]
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                            } ${
                              selectedSession.attendanceStatus === 'Validee' ? 'cursor-not-allowed opacity-60' : ''
                            }`}
                          >
                            {markLabels[status]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </article>
          </section>
        ) : null}
      </div>
    </main>
  );
};

export default EnseignantCalendarPage;
