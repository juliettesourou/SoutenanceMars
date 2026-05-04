import React, { useEffect, useMemo, useState } from 'react';
import { ClipboardCheck, FilePenLine, GraduationCap, Send, Users, X } from 'lucide-react';
import EnseignantTopbar from '../../../components/enseignant/EnseignantTopbar';
import {
  TEACHER_ATTENDANCE_STORAGE_KEY,
  TEACHER_EVALUATIONS_STORAGE_KEY,
  TEACHER_GRADES_STORAGE_KEY,
  teacherAttendanceSheets,
  teacherEvaluationGrades,
  teacherEvaluations,
} from './data';

const statusStyles: Record<string, string> = {
  Brouillon: 'border-amber-100 bg-amber-50 text-amber-700',
  'Notes saisies': 'border-sky-100 bg-sky-50 text-sky-700',
  'Transmise au service examens': 'border-violet-100 bg-violet-50 text-violet-700',
  Validee: 'border-emerald-100 bg-emerald-50 text-emerald-700',
};

const EnseignantEvaluationsPage: React.FC = () => {
  const [evaluationItems, setEvaluationItems] = useState(teacherEvaluations);
  const [gradeSheets, setGradeSheets] = useState(teacherEvaluationGrades);
  const [attendanceSheets, setAttendanceSheets] = useState(teacherAttendanceSheets);
  const [selectedEvaluationId, setSelectedEvaluationId] = useState(teacherEvaluations[0]?.id ?? '');
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [draftScore, setDraftScore] = useState('');
  const [draftObservation, setDraftObservation] = useState('');
  const [modalError, setModalError] = useState('');

  useEffect(() => {
    try {
      const storedEvaluations = localStorage.getItem(TEACHER_EVALUATIONS_STORAGE_KEY);
      const storedGrades = localStorage.getItem(TEACHER_GRADES_STORAGE_KEY);
      const storedAttendance = localStorage.getItem(TEACHER_ATTENDANCE_STORAGE_KEY);

      if (storedEvaluations) {
        setEvaluationItems(JSON.parse(storedEvaluations));
      }

      if (storedGrades) {
        setGradeSheets(JSON.parse(storedGrades));
      }

      if (storedAttendance) {
        setAttendanceSheets(JSON.parse(storedAttendance));
      }
    } catch {
      // Keep fallback values if storage is unavailable.
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TEACHER_EVALUATIONS_STORAGE_KEY, JSON.stringify(evaluationItems));
  }, [evaluationItems]);

  useEffect(() => {
    localStorage.setItem(TEACHER_GRADES_STORAGE_KEY, JSON.stringify(gradeSheets));
  }, [gradeSheets]);

  const selectedEvaluation =
    evaluationItems.find((evaluation) => evaluation.id === selectedEvaluationId) ?? evaluationItems[0];

  const selectedGrades = selectedEvaluation ? gradeSheets[selectedEvaluation.id] ?? [] : [];
  const linkedAttendance = selectedEvaluation ? attendanceSheets[selectedEvaluation.sessionId] ?? [] : [];
  const presentStudents = linkedAttendance.filter((student) => student.status === 'Present');
  const attendanceByStudentId = new Map(linkedAttendance.map((student) => [student.id, student.status]));
  const presentGradeRows = selectedGrades.filter((student) => attendanceByStudentId.get(student.id) === 'Present');
  const editingStudent = presentGradeRows.find((student) => student.id === editingStudentId) ?? null;

  const gradedCount = useMemo(
    () => presentGradeRows.filter((student) => student.score.trim() !== '').length,
    [presentGradeRows]
  );

  const averageScore = useMemo(() => {
    const numericScores = presentGradeRows
      .map((student) => Number(student.score))
      .filter((score) => !Number.isNaN(score));

    if (numericScores.length === 0 || !selectedEvaluation) {
      return 'En attente';
    }

    const average = numericScores.reduce((sum, score) => sum + score, 0) / numericScores.length;
    return `${average.toFixed(1)} / ${selectedEvaluation.maxScore}`;
  }, [presentGradeRows, selectedEvaluation]);

  const handleScoreChange = (studentId: string, nextScore: string) => {
    if (!selectedEvaluation || selectedEvaluation.status === 'Transmise au service examens' || selectedEvaluation.status === 'Validee') {
      return;
    }

    setGradeSheets((current) => ({
      ...current,
      [selectedEvaluation.id]: (current[selectedEvaluation.id] ?? []).map((student) =>
        student.id === studentId ? { ...student, score: nextScore } : student
      ),
    }));
  };

  const handleObservationChange = (studentId: string, nextObservation: string) => {
    if (!selectedEvaluation || selectedEvaluation.status === 'Transmise au service examens' || selectedEvaluation.status === 'Validee') {
      return;
    }

    setGradeSheets((current) => ({
      ...current,
      [selectedEvaluation.id]: (current[selectedEvaluation.id] ?? []).map((student) =>
        student.id === studentId ? { ...student, observation: nextObservation } : student
      ),
    }));
  };

  const openStudentModal = (studentId: string) => {
    const student = presentGradeRows.find((item) => item.id === studentId);
    if (!student) return;

    setEditingStudentId(student.id);
    setDraftScore(student.score);
    setDraftObservation(student.observation);
    setModalError('');
  };

  const closeStudentModal = () => {
    setEditingStudentId(null);
    setDraftScore('');
    setDraftObservation('');
    setModalError('');
  };

  const handleSaveStudentGrade = () => {
    if (!editingStudent || !selectedEvaluation) return;

    const numericScore = Number(draftScore);
    const isEmpty = draftScore.trim() === '';
    const isInvalidNumber = Number.isNaN(numericScore);
    const isOutOfRange = numericScore < 0 || numericScore > selectedEvaluation.maxScore;

    if (isEmpty) {
      setModalError('Veuillez saisir la note d interrogation de l etudiant.');
      return;
    }

    if (isInvalidNumber || isOutOfRange) {
      setModalError(`La note doit etre comprise entre 0 et ${selectedEvaluation.maxScore}.`);
      return;
    }

    handleScoreChange(editingStudent.id, draftScore);
    handleObservationChange(editingStudent.id, draftObservation);
    closeStudentModal();
  };

  const handleSaveGrades = () => {
    if (!selectedEvaluation) return;

    setEvaluationItems((current) =>
      current.map((evaluation) =>
        evaluation.id === selectedEvaluation.id
          ? {
              ...evaluation,
              status: 'Notes saisies',
              average: averageScore,
            }
          : evaluation
      )
    );
  };

  const handleTransmitGrades = () => {
    if (!selectedEvaluation) return;

    setEvaluationItems((current) =>
      current.map((evaluation) =>
        evaluation.id === selectedEvaluation.id
          ? {
              ...evaluation,
              status: 'Transmise au service examens',
              average: averageScore,
            }
          : evaluation
      )
    );
  };

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <EnseignantTopbar
        title="Enregistrement des notes d interrogation"
        subtitle="L enseignant saisit les notes d interrogation des etudiants presents, puis les envoie au service examens"
      />

      <div className="space-y-6 px-4 pb-10 pt-4 sm:px-6 lg:px-10">
        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-[#E8EDFF] p-3 text-[#1D4ED8]">
                <ClipboardCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">Interrogations du mois</p>
                <p className="text-2xl font-semibold text-slate-900">{evaluationItems.length}</p>
              </div>
            </div>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                <FilePenLine className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">Notes a enregistrer</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {evaluationItems.filter((item) => item.status === 'Brouillon' || item.status === 'Notes saisies').length}
                </p>
              </div>
            </div>
          </article>
          <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="rounded-2xl bg-violet-50 p-3 text-violet-700">
                <Send className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm text-slate-500">Deja transmises</p>
                <p className="text-2xl font-semibold text-slate-900">
                  {evaluationItems.filter((item) => item.status === 'Transmise au service examens' || item.status === 'Validee').length}
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <header className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Interrogations a traiter</h2>
              <p className="text-sm text-slate-500">L enseignant choisit une interrogation, saisit les notes des etudiants, puis envoie la feuille au service examens.</p>
            </header>

            <div className="space-y-4">
              {evaluationItems.map((evaluation) => (
              <article
                key={evaluation.id}
                className={`rounded-2xl border bg-slate-50/70 p-4 transition hover:border-slate-200 ${
                  selectedEvaluationId === evaluation.id ? 'border-[#BFDBFE] bg-[#EFF6FF]' : 'border-slate-100'
                }`}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{evaluation.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {evaluation.classLabel} • {evaluation.room} • Echeance {evaluation.dueDate}
                    </p>
                  </div>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[evaluation.status]}`}>
                    {evaluation.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Moyenne</p>
                    <p className="mt-2 font-semibold text-slate-900">{evaluation.average}</p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Action metier</p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {evaluation.status === 'Brouillon' ? 'Saisir les notes des etudiants' : 'Verifier les notes avant envoi'}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Suite</p>
                    <p className="mt-2 font-semibold text-slate-900">
                      {evaluation.status === 'Transmise au service examens' ? 'Validation administrative' : 'Pret pour transmission'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEvaluationId(evaluation.id)}
                  className={`mt-4 inline-flex rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    selectedEvaluationId === evaluation.id
                      ? 'bg-[#1D4ED8] text-white'
                      : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Ouvrir la feuille de notes d interrogation
                </button>
              </article>
            ))}
            </div>
          </article>

          {selectedEvaluation ? (
            <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <header className="flex flex-col gap-4 border-b border-slate-100 pb-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Formulaire de saisie</p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900">{selectedEvaluation.title}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedEvaluation.classLabel} • {selectedEvaluation.room} • L enseignant enregistre ici les notes sur {selectedEvaluation.maxScore}
                    </p>
                  </div>
                  <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[selectedEvaluation.status]}`}>
                    {selectedEvaluation.status}
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Users className="h-4 w-4" />
                      <p className="text-xs uppercase tracking-[0.18em]">Etudiants lies</p>
                    </div>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{presentGradeRows.length}</p>
                  </div>
                  <div className="rounded-2xl bg-sky-50 px-4 py-3">
                    <div className="flex items-center gap-2 text-sky-700">
                      <FilePenLine className="h-4 w-4" />
                      <p className="text-xs uppercase tracking-[0.18em]">Notes saisies</p>
                    </div>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{gradedCount}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <GraduationCap className="h-4 w-4" />
                      <p className="text-xs uppercase tracking-[0.18em]">Moyenne calculee</p>
                    </div>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{averageScore}</p>
                  </div>
                </div>
              </header>

              <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-4">
                <div className="flex items-center gap-2 text-emerald-700">
                  <Users className="h-4 w-4" />
                  <p className="text-sm font-semibold">Etudiants presents dans cette salle</p>
                </div>
                <p className="mt-2 text-2xl font-semibold text-emerald-900">{presentStudents.length}</p>
                <p className="mt-1 text-sm text-emerald-800">
                  Liste issue de la feuille de presence de {selectedEvaluation.room}.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {presentStudents.length > 0 ? (
                    presentStudents.map((student) => (
                      <span
                        key={student.id}
                        className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-sm font-medium text-emerald-800"
                      >
                        {student.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-emerald-800">Aucun etudiant marque present pour le moment.</span>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSaveGrades}
                  disabled={selectedEvaluation.status === 'Transmise au service examens' || selectedEvaluation.status === 'Validee'}
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    selectedEvaluation.status === 'Transmise au service examens' || selectedEvaluation.status === 'Validee'
                      ? 'cursor-not-allowed bg-slate-200 text-slate-500'
                      : 'bg-[#1D4ED8] text-white hover:bg-[#1E40AF]'
                  }`}
                >
                  Enregistrer les notes
                </button>
                <button
                  type="button"
                  onClick={handleTransmitGrades}
                  disabled={
                    selectedEvaluation.status === 'Transmise au service examens' ||
                    selectedEvaluation.status === 'Validee' ||
                    gradedCount === 0
                  }
                  className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                    selectedEvaluation.status === 'Transmise au service examens' ||
                    selectedEvaluation.status === 'Validee' ||
                    gradedCount === 0
                      ? 'cursor-not-allowed bg-violet-100 text-violet-400'
                      : 'bg-violet-600 text-white hover:bg-violet-700'
                  }`}
                >
                  Transmettre au service examens
                </button>
              </div>

              <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                <p className="text-sm font-semibold text-amber-800">Rappel metier</p>
                <p className="mt-1 text-sm text-amber-900">
                  L enseignant enregistre les notes d interrogation dans les champs ci-dessous, puis envoie la feuille au service examens.
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-900">Liste des etudiants dans cette salle</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    L enseignant choisit un etudiant dans la liste, puis enregistre sa note d interrogation dans un formulaire.
                  </p>
                </div>

                {presentGradeRows.length > 0 ? (
                  presentGradeRows.map((student) => {
                    const isLocked =
                      selectedEvaluation.status === 'Transmise au service examens' ||
                      selectedEvaluation.status === 'Validee';

                    return (
                  <article key={student.id} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
                    <div className="grid gap-4 lg:grid-cols-[1fr,140px,1.1fr,180px]">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold text-slate-900">{student.name}</h3>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                              student.score.trim() !== ''
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border-amber-200 bg-amber-50 text-amber-700'
                            }`}
                          >
                            {student.score.trim() !== '' ? 'Note enregistree' : 'En attente de note'}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{student.matricule}</p>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                          Presence: Present
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Note enregistree</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">
                          {student.score.trim() !== '' ? `${student.score} / ${selectedEvaluation.maxScore}` : 'Non renseignee'}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Observation</p>
                        <p className="mt-2 text-sm text-slate-700">
                          {student.observation.trim() !== '' ? student.observation : 'Aucune observation'}
                        </p>
                      </div>

                      <div className="flex items-center lg:justify-end">
                        <button
                          type="button"
                          onClick={() => openStudentModal(student.id)}
                          disabled={isLocked}
                          className={`w-full rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                            isLocked
                              ? 'cursor-not-allowed bg-slate-200 text-slate-500'
                              : 'bg-[#1D4ED8] text-white hover:bg-[#1E40AF]'
                          }`}
                        >
                          {student.score.trim() !== '' ? 'Modifier la note' : 'Saisir la note'}
                        </button>
                      </div>
                    </div>
                  </article>
                    );
                  })
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                    Aucun etudiant present n est disponible pour la saisie des notes dans cette salle.
                  </div>
                )}
              </div>
            </article>
          ) : null}
        </section>
      </div>

      {editingStudent && selectedEvaluation ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
          <div className="w-full max-w-xl rounded-[28px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Formulaire modal</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Enregistrer la note d interrogation</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {editingStudent.name} • {editingStudent.matricule} • {selectedEvaluation.title}
                </p>
              </div>
              <button
                type="button"
                onClick={closeStudentModal}
                className="rounded-2xl bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 grid gap-4">
              <label className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Note d interrogation</p>
                <input
                  type="number"
                  min="0"
                  max={selectedEvaluation.maxScore}
                  step="0.1"
                  value={draftScore}
                  onChange={(event) => setDraftScore(event.target.value)}
                  className="mt-2 w-full bg-transparent text-lg font-semibold text-slate-900 outline-none"
                  placeholder={`Sur ${selectedEvaluation.maxScore}`}
                />
              </label>

              {modalError ? (
                <div className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {modalError}
                </div>
              ) : null}

              <label className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Observation</p>
                <textarea
                  value={draftObservation}
                  onChange={(event) => setDraftObservation(event.target.value)}
                  className="mt-2 min-h-28 w-full resize-none bg-transparent text-sm text-slate-700 outline-none"
                  placeholder="Commentaire de l enseignant"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={closeStudentModal}
                className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSaveStudentGrade}
                className="rounded-2xl bg-[#1D4ED8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1E40AF]"
              >
                Enregistrer la note
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default EnseignantEvaluationsPage;
