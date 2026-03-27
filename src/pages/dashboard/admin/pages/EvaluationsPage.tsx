import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  X,
  Plus,
  Search,
  ShieldAlert,
} from 'lucide-react';
import AdminTopbar from '../../../../components/adminCEntre/AdminTopbar';
import AdminMobileNav from '../../../../components/adminCEntre/AdminMobileNav';

type EvaluationStatus = 'A planifier' | 'Confirmee' | 'Sous surveillance';

interface EvaluationItem {
  id: string;
  title: string;
  filiere: string;
  level: string;
  teacher: string;
  room: string;
  dateLabel: string;
  monthKey: string;
  day: number;
  startTime: string;
  endTime: string;
  students: number;
  progressRate: number;
  status: EvaluationStatus;
  priority: string;
  createdBy: 'Admin' | 'Surveillant';
  needsAdminConfirmation: boolean;
}

interface FiliereItem {
  label: string;
  options: string[];
}

interface OptionItem {
  label: string;
  filiere: string;
}

interface MatiereItem {
  label: string;
  credits: number;
  option: string;
}

const STORAGE_FILIERE_KEY = 'enangnon_filieres';
const STORAGE_OPTION_KEY = 'enangnon_options';
const STORAGE_MATIERE_KEY = 'enangnon_matieres';
const STORAGE_ANNEE_KEY = 'enangnon_annees_etude';
const STORAGE_SALLE_KEY = 'enangnon_salles';
const STORAGE_EVALUATION_KEY = 'enangnon_admin_evaluations';

const fallbackFilieres: FiliereItem[] = [
  { label: 'Informatique', options: ['Genie logiciel', 'Reseaux'] },
  { label: 'Comptabilite', options: ['Finance', 'Audit'] },
];

const fallbackOptions: OptionItem[] = [
  { label: 'Genie logiciel', filiere: 'Informatique' },
  { label: 'Reseaux', filiere: 'Informatique' },
  { label: 'Finance', filiere: 'Comptabilite' },
];

const fallbackMatieres: MatiereItem[] = [
  { label: 'Architecture logicielle', credits: 4, option: 'Genie logiciel' },
  { label: 'Base de donnees', credits: 3, option: 'Genie logiciel' },
  { label: 'Administration reseaux', credits: 5, option: 'Reseaux' },
  { label: 'Comptabilite generale', credits: 4, option: 'Finance' },
];

const fallbackAnnees = ['Licence 1', 'Licence 2', 'Licence 3'];
const fallbackSalles = ['Salle A2', 'Salle A5', 'Salle B1', 'Laboratoire 1'];

const evaluations: EvaluationItem[] = [
  {
    id: 'eval-1',
    title: 'Contrôle continu - Algorithmique',
    filiere: 'Informatique',
    level: 'Licence 2',
    teacher: 'M. Agossou',
    room: 'Salle A2',
    dateLabel: '02 avril 2026',
    monthKey: 'Avril 2026',
    day: 2,
    startTime: '08:00',
    endTime: '10:00',
    students: 42,
    progressRate: 100,
    status: 'Confirmee',
    priority: 'Surveillants validés',
    createdBy: 'Admin',
    needsAdminConfirmation: false,
  },
  {
    id: 'eval-2',
    title: 'Examen partiel - Comptabilité générale',
    filiere: 'Comptabilité',
    level: 'Licence 1',
    teacher: 'Mme Dossou',
    room: 'Salle B1',
    dateLabel: '03 avril 2026',
    monthKey: 'Avril 2026',
    day: 3,
    startTime: '10:30',
    endTime: '12:30',
    students: 38,
    progressRate: 82,
    status: 'Sous surveillance',
    priority: 'Copies et émargement à sécuriser',
    createdBy: 'Surveillant',
    needsAdminConfirmation: true,
  },
  {
    id: 'eval-3',
    title: 'Devoir surveillé - Réseaux',
    filiere: 'Réseaux',
    level: 'Licence 3',
    teacher: 'M. Kiki',
    room: 'Laboratoire 1',
    dateLabel: '04 avril 2026',
    monthKey: 'Avril 2026',
    day: 4,
    startTime: '14:00',
    endTime: '16:00',
    students: 27,
    progressRate: 61,
    status: 'Sous surveillance',
    priority: 'Validation des notes attendue',
    createdBy: 'Surveillant',
    needsAdminConfirmation: true,
  },
  {
    id: 'eval-4',
    title: 'Évaluation finale - Marketing opérationnel',
    filiere: 'Marketing',
    level: 'Licence 1',
    teacher: 'Mme Adjanohoun',
    room: 'Salle C3',
    dateLabel: '06 avril 2026',
    monthKey: 'Avril 2026',
    day: 6,
    startTime: '09:00',
    endTime: '11:00',
    students: 31,
    progressRate: 100,
    status: 'Confirmee',
    priority: 'Prêt pour diffusion',
    createdBy: 'Admin',
    needsAdminConfirmation: false,
  },
  {
    id: 'eval-5',
    title: 'Interrogation - Gestion budgétaire',
    filiere: 'Gestion',
    level: 'Licence 2',
    teacher: 'M. Houngbo',
    room: 'Salle B3',
    dateLabel: '09 avril 2026',
    monthKey: 'Avril 2026',
    day: 9,
    startTime: '08:30',
    endTime: '10:00',
    students: 34,
    progressRate: 45,
    status: 'A planifier',
    priority: 'Date à confirmer avec l équipe pédagogique',
    createdBy: 'Surveillant',
    needsAdminConfirmation: true,
  },
  {
    id: 'eval-6',
    title: 'Examen semestriel - Base de données',
    filiere: 'Informatique',
    level: 'Licence 3',
    teacher: 'Mme Ahlonsou',
    room: 'Salle A4',
    dateLabel: '11 avril 2026',
    monthKey: 'Avril 2026',
    day: 11,
    startTime: '13:30',
    endTime: '16:30',
    students: 29,
    progressRate: 38,
    status: 'A planifier',
    priority: 'Affectation de salle à finaliser',
    createdBy: 'Admin',
    needsAdminConfirmation: false,
  },
];

const statusStyles: Record<EvaluationStatus, string> = {
  'A planifier': 'border-amber-100 bg-amber-50 text-amber-700',
  Confirmee: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  'Sous surveillance': 'border-rose-100 bg-rose-50 text-rose-700',
};

const statusAccent: Record<EvaluationStatus, string> = {
  'A planifier': 'from-amber-500 to-orange-500',
  Confirmee: 'from-emerald-500 to-teal-500',
  'Sous surveillance': 'from-rose-500 to-pink-500',
};

const calendarDays = Array.from({ length: 30 }, (_, index) => index + 1);

const normalizeDay = (dateLabel: string) => {
  const matchedDay = dateLabel.match(/\d{1,2}/);
  if (!matchedDay) return 1;
  const numericDay = Number(matchedDay[0]);
  if (Number.isNaN(numericDay)) return 1;
  return Math.min(Math.max(numericDay, 1), 30);
};

const normalizeTimeRange = (timeRange: string) => {
  const [start = '08:30', end = '11:30'] = timeRange.split('-').map((item) => item.trim());
  return { startTime: start || '08:30', endTime: end || '11:30' };
};

const EvaluationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'Tous' | EvaluationStatus>('Tous');
  const [evaluationItems, setEvaluationItems] = useState<EvaluationItem[]>(evaluations);
  const [selectedEvaluationId, setSelectedEvaluationId] = useState(evaluations[0]?.id ?? '');
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [filieres, setFilieres] = useState<FiliereItem[]>(fallbackFilieres);
  const [options, setOptions] = useState<OptionItem[]>(fallbackOptions);
  const [matieres, setMatieres] = useState<MatiereItem[]>(fallbackMatieres);
  const [annees, setAnnees] = useState<string[]>(fallbackAnnees);
  const [salles, setSalles] = useState<string[]>(fallbackSalles);
  const [selectedFiliere, setSelectedFiliere] = useState(fallbackFilieres[0]?.label ?? '');
  const [selectedOption, setSelectedOption] = useState(fallbackOptions[0]?.label ?? '');
  const [selectedAnnee, setSelectedAnnee] = useState(fallbackAnnees[0] ?? '');
  const [selectedMatiere, setSelectedMatiere] = useState(fallbackMatieres[0]?.label ?? '');
  const [selectedSalle, setSelectedSalle] = useState(fallbackSalles[0] ?? '');
  const [selectedTeacher, setSelectedTeacher] = useState('Mme Ahlonsou');
  const [scheduledDate, setScheduledDate] = useState('14 avril 2026');
  const [scheduledTime, setScheduledTime] = useState('08:30 - 11:30');
  const [editingEvaluationId, setEditingEvaluationId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedFilieres = localStorage.getItem(STORAGE_FILIERE_KEY);
      if (storedFilieres) {
        const parsed = JSON.parse(storedFilieres) as Array<string | FiliereItem>;
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized = parsed.map((item) =>
            typeof item === 'string' ? { label: item, options: [] } : { label: item.label, options: Array.isArray(item.options) ? item.options : [] }
          );
          setFilieres(normalized);
        }
      }

      const storedOptions = localStorage.getItem(STORAGE_OPTION_KEY);
      if (storedOptions) {
        const parsed = JSON.parse(storedOptions) as OptionItem[];
        if (Array.isArray(parsed) && parsed.length > 0) setOptions(parsed);
      }

      const storedMatieres = localStorage.getItem(STORAGE_MATIERE_KEY);
      if (storedMatieres) {
        const parsed = JSON.parse(storedMatieres) as MatiereItem[];
        if (Array.isArray(parsed) && parsed.length > 0) setMatieres(parsed);
      }

      const storedAnnees = localStorage.getItem(STORAGE_ANNEE_KEY);
      if (storedAnnees) {
        const parsed = JSON.parse(storedAnnees) as string[];
        if (Array.isArray(parsed) && parsed.length > 0) setAnnees(parsed);
      }

      const storedSalles = localStorage.getItem(STORAGE_SALLE_KEY);
      if (storedSalles) {
        const parsed = JSON.parse(storedSalles) as string[];
        if (Array.isArray(parsed) && parsed.length > 0) setSalles(parsed);
      }

      const storedEvaluations = localStorage.getItem(STORAGE_EVALUATION_KEY);
      if (storedEvaluations) {
        const parsed = JSON.parse(storedEvaluations) as EvaluationItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEvaluationItems(parsed);
          setSelectedEvaluationId(parsed[0].id);
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la structure académique', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_EVALUATION_KEY, JSON.stringify(evaluationItems));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des evaluations admin', error);
    }
  }, [evaluationItems]);

  const availableOptions = useMemo(() => {
    return options.filter((option) => option.filiere === selectedFiliere);
  }, [options, selectedFiliere]);

  const availableMatieres = useMemo(() => {
    return matieres.filter((matiere) => matiere.option === selectedOption);
  }, [matieres, selectedOption]);

  const selectedMatiereDetails = useMemo(() => {
    return matieres.find((matiere) => matiere.label === selectedMatiere);
  }, [matieres, selectedMatiere]);

  const evaluationTitle = useMemo(() => {
    if (!selectedMatiere) return '';
    return `Evaluation - ${selectedMatiere}`;
  }, [selectedMatiere]);

  const missingStructureItems = useMemo(() => {
    const missing: string[] = [];
    if (!selectedFiliere) missing.push('filiere');
    if (!selectedOption) missing.push('option');
    if (!selectedAnnee) missing.push("annee d'etude");
    if (!selectedMatiere) missing.push('matiere');
    if (!selectedSalle) missing.push('salle');
    return missing;
  }, [selectedAnnee, selectedFiliere, selectedMatiere, selectedOption, selectedSalle]);

  const isCreationReady = missingStructureItems.length === 0;
  const pendingSupervisorConfirmations = useMemo(
    () => evaluationItems.filter((evaluation) => evaluation.createdBy === 'Surveillant' && evaluation.needsAdminConfirmation).length,
    [evaluationItems]
  );

  useEffect(() => {
    if (availableOptions.length > 0 && !availableOptions.some((option) => option.label === selectedOption)) {
      setSelectedOption(availableOptions[0].label);
    }
  }, [availableOptions, selectedOption]);

  useEffect(() => {
    if (availableMatieres.length > 0 && !availableMatieres.some((matiere) => matiere.label === selectedMatiere)) {
      setSelectedMatiere(availableMatieres[0].label);
    }
  }, [availableMatieres, selectedMatiere]);

  const openCreationModal = () => {
    const initialFiliere = filieres[0]?.label ?? '';
    const initialOptions = options.filter((option) => option.filiere === initialFiliere);
    const initialOption = initialOptions[0]?.label ?? '';
    const initialMatieres = matieres.filter((matiere) => matiere.option === initialOption);

    setSelectedFiliere(initialFiliere);
    setSelectedOption(initialOption);
    setSelectedMatiere(initialMatieres[0]?.label ?? '');
    setSelectedAnnee(annees[0] ?? '');
    setSelectedSalle(salles[0] ?? '');
    setSelectedTeacher('Mme Ahlonsou');
    setScheduledDate('14 avril 2026');
    setScheduledTime('08:30 - 11:30');
    setEditingEvaluationId(null);
    setShowCreationModal(true);
  };

  const openEditModal = (evaluation: EvaluationItem) => {
    const [filierePart = '', optionPart = ''] = evaluation.filiere.split('•').map((item) => item.trim());
    const matchingOptions = options.filter((option) => option.filiere === filierePart);
    const normalizedOption =
      optionPart && matchingOptions.some((option) => option.label === optionPart)
        ? optionPart
        : matchingOptions[0]?.label ?? '';
    const matchingMatieres = matieres.filter((matiere) => matiere.option === normalizedOption);
    const inferredMatiere =
      matchingMatieres.find((matiere) => evaluation.title.toLowerCase().includes(matiere.label.toLowerCase()))?.label ??
      matchingMatieres[0]?.label ??
      '';

    setSelectedFiliere(filierePart);
    setSelectedOption(normalizedOption);
    setSelectedAnnee(evaluation.level);
    setSelectedMatiere(inferredMatiere);
    setSelectedSalle(evaluation.room);
    setSelectedTeacher(evaluation.teacher);
    setScheduledDate(evaluation.dateLabel);
    setScheduledTime(`${evaluation.startTime} - ${evaluation.endTime}`);
    setEditingEvaluationId(evaluation.id);
    setShowCreationModal(true);
  };

  const handleCreateEvaluation = () => {
    if (!isCreationReady) return;

    const { startTime, endTime } = normalizeTimeRange(scheduledTime);
    const baseEvaluation: EvaluationItem = {
      id: editingEvaluationId ?? `eval-${Date.now()}`,
      title: evaluationTitle || `Evaluation - ${selectedMatiere}`,
      filiere: `${selectedFiliere}${selectedOption ? ` • ${selectedOption}` : ''}`,
      level: selectedAnnee,
      teacher: selectedTeacher.trim() || 'A confirmer',
      room: selectedSalle,
      dateLabel: scheduledDate,
      monthKey: 'Avril 2026',
      day: normalizeDay(scheduledDate),
      startTime,
      endTime,
      students: 24 + (selectedMatiereDetails?.credits ?? 3) * 3,
      progressRate: 18,
      status: 'A planifier',
      priority: `Confirmer la salle ${selectedSalle} et notifier l equipe de ${selectedOption || selectedFiliere}.`,
      createdBy: 'Admin',
      needsAdminConfirmation: false,
    };

    setEvaluationItems((prev) => {
      if (editingEvaluationId) {
        return prev.map((evaluation) =>
          evaluation.id === editingEvaluationId
            ? {
                ...evaluation,
                ...baseEvaluation,
                progressRate: evaluation.progressRate,
                status: evaluation.status,
              }
            : evaluation
        );
      }

      return [baseEvaluation, ...prev];
    });
    setSelectedEvaluationId(baseEvaluation.id);
    setEditingEvaluationId(null);
    setShowCreationModal(false);
  };

  const handleDeleteEvaluation = (evaluationId: string) => {
    setEvaluationItems((prev) => prev.filter((evaluation) => evaluation.id !== evaluationId));
    setEditingEvaluationId((prev) => (prev === evaluationId ? null : prev));
  };

  const handleConfirmEvaluation = (evaluationId: string) => {
    setEvaluationItems((prev) =>
      prev.map((evaluation) =>
        evaluation.id === evaluationId
          ? {
              ...evaluation,
              status: 'Confirmee',
              progressRate: Math.max(evaluation.progressRate, 100),
              priority: 'Session validée par l administration du centre',
              needsAdminConfirmation: false,
            }
          : evaluation
      )
    );
  };

  const filteredEvaluations = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return evaluationItems.filter((evaluation) => {
      const matchesSearch =
        !normalizedSearch ||
        evaluation.title.toLowerCase().includes(normalizedSearch) ||
        evaluation.filiere.toLowerCase().includes(normalizedSearch) ||
        evaluation.teacher.toLowerCase().includes(normalizedSearch) ||
        evaluation.room.toLowerCase().includes(normalizedSearch);

      const matchesStatus = statusFilter === 'Tous' || evaluation.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [evaluationItems, searchTerm, statusFilter]);

  const selectedEvaluation = useMemo(() => {
    return (
      filteredEvaluations.find((evaluation) => evaluation.id === selectedEvaluationId) ??
      filteredEvaluations[0] ??
      evaluationItems[0]
    );
  }, [evaluationItems, filteredEvaluations, selectedEvaluationId]);

  useEffect(() => {
    if (!selectedEvaluationId && evaluationItems[0]) {
      setSelectedEvaluationId(evaluationItems[0].id);
      return;
    }

    if (evaluationItems.length > 0 && !evaluationItems.some((evaluation) => evaluation.id === selectedEvaluationId)) {
      setSelectedEvaluationId(evaluationItems[0].id);
    }
  }, [evaluationItems, selectedEvaluationId]);

  const stats = useMemo(() => {
    const planned = evaluationItems.filter((evaluation) => evaluation.status === 'A planifier').length;
    const confirmed = evaluationItems.filter((evaluation) => evaluation.status === 'Confirmee').length;
    const watch = evaluationItems.filter((evaluation) => evaluation.status === 'Sous surveillance').length;
    const averageProgress = Math.round(
      evaluationItems.reduce((sum, evaluation) => sum + evaluation.progressRate, 0) / evaluationItems.length
    );

    return {
      planned,
      confirmed,
      watch,
      averageProgress,
    };
  }, [evaluationItems]);

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <AdminTopbar
        title="Planification des évaluations"
        subtitle="Organisez les dates, les salles et le suivi opérationnel des évaluations du centre"
        rightSlot={<AdminMobileNav />}
      />

      <section className="space-y-6 px-4 pb-8 pt-6 sm:px-6 lg:space-y-8 lg:px-10 lg:pb-12">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1D4ED8] via-[#2563EB] to-[#7C3AED] px-6 py-9 text-white shadow-[0_30px_80px_rgba(37,99,235,0.25)] sm:px-8 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.35),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.25),_transparent_26%)]" />
          <div className="absolute right-0 top-0 h-40 w-40 -translate-y-10 translate-x-10 rounded-full bg-white/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE]/40 bg-[#DBEAFE] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.32em] text-[#1D4ED8] shadow-sm">
                Admin Centre • Évaluations
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
                Une vue professionnelle pour fixer les dates d&apos;évaluation et garder une organisation sans faille.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-100 sm:text-lg">
                L&apos;admin centre pilote ici la planification des évaluations prévues, la disponibilité des salles
                et le suivi des échéances jusqu&apos;à la publication des résultats.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200">À planifier</p>
                  <p className="mt-2 text-3xl font-semibold">{stats.planned}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Confirmées</p>
                  <p className="mt-2 text-3xl font-semibold">{stats.confirmed}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-200">Attente admin</p>
                  <p className="mt-2 text-3xl font-semibold">{pendingSupervisorConfirmations}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-50">Repère calendrier</p>
              <p className="mt-2 text-sm text-slate-200">
                Votre centre a {evaluationItems.length} évaluations prévues sur la période, dont {stats.watch} à surveiller de près.
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Salles mobilisées</p>
                  <p className="mt-2 text-4xl font-bold">4</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Surveillants validés</p>
                  <p className="mt-2 text-4xl font-bold">9</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Résultats en attente</p>
                  <p className="mt-2 text-4xl font-bold">7</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-base text-slate-200">Copies corrigées</p>
                  <p className="mt-2 text-4xl font-bold">{stats.averageProgress}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[28px] bg-gradient-to-br from-[#2C6ED5] to-[#55A3FF] p-5 text-white shadow-lg shadow-[#2C6ED5]/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-100">Échéancier</p>
                <p className="mt-3 text-4xl font-bold">{evaluationItems.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white">
                <CalendarClock className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-blue-50">évaluations ouvertes sur la période</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#1EB980]">Validation</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.confirmed}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-[#1EB980]">
                <CheckCircle2 className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">sessions confirmées par l administration</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#6C4CCF]">Programmation</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.planned}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-[#6C4CCF]">
                <ClipboardCheck className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">créneaux encore à finaliser</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-rose-500">Surveillance</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{stats.watch}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                <ShieldAlert className="h-6 w-6" strokeWidth={2.1} />
              </div>
            </div>
            <p className="mt-1 text-sm text-slate-500">évaluations à sécuriser avant publication</p>
          </article>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2C6ED5]">Organisation</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Calendrier des évaluations prévues</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Visualisez les dates, sélectionnez une session et ajustez votre planification.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <label className="relative">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="search"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      placeholder="Rechercher une évaluation, une filière, une salle"
                      className="w-full rounded-full border border-slate-200 py-2.5 pl-11 pr-4 text-sm text-slate-600 placeholder:text-slate-400 focus:border-[#2C6ED5] focus:outline-none focus:ring-4 focus:ring-[#2C6ED5]/10 sm:w-80"
                    />
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value as 'Tous' | EvaluationStatus)}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-600 focus:border-[#2C6ED5] focus:outline-none focus:ring-4 focus:ring-[#2C6ED5]/10"
                  >
                    <option value="Tous">Toutes les situations</option>
                    <option value="A planifier">À planifier</option>
                    <option value="Confirmee">Confirmées</option>
                    <option value="Sous surveillance">Sous surveillance</option>
                  </select>
                  <button
                    type="button"
                    onClick={openCreationModal}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1A43BF]"
                  >
                    <Plus className="h-4 w-4" />
                    Créer une évaluation
                  </button>
                </div>
              </div>

              <div className="mt-6 rounded-[26px] border border-slate-100 bg-slate-50/80 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Mois actif</p>
                    <h3 className="mt-1 text-lg font-semibold text-[#0F172A]">Avril 2026</h3>
                  </div>
                  <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#2C6ED5] shadow-sm">
                    {evaluationItems.length} sessions planifiées
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((label) => (
                    <div key={label} className="py-2">
                      {label}
                    </div>
                  ))}
                </div>

                <div className="mt-2 grid grid-cols-7 gap-2">
                  {calendarDays.map((day) => {
                    const dayEvaluation = evaluationItems.find((evaluation) => evaluation.day === day);
                    const isSelected = selectedEvaluation?.day === day;

                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          if (dayEvaluation) {
                            setSelectedEvaluationId(dayEvaluation.id);
                          }
                        }}
                        className={`min-h-[88px] rounded-2xl border p-3 text-left transition ${
                          dayEvaluation
                            ? isSelected
                              ? 'border-[#2C6ED5]/30 bg-[#EFF6FF] shadow-[0_12px_35px_rgba(44,110,213,0.16)]'
                              : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-[#2C6ED5]/20 hover:shadow-lg'
                            : 'border-dashed border-slate-200 bg-white/70 text-slate-300'
                        }`}
                      >
                        <p className={`text-sm font-semibold ${dayEvaluation ? 'text-[#0F172A]' : 'text-slate-300'}`}>{day}</p>
                        {dayEvaluation ? (
                          <div className="mt-3">
                            <p className="text-xs font-semibold text-[#2C6ED5]">{dayEvaluation.startTime}</p>
                            <p className="mt-1 line-clamp-2 text-xs text-slate-500">{dayEvaluation.filiere}</p>
                          </div>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 grid gap-4 xl:grid-cols-2">
                {filteredEvaluations.map((evaluation) => {
                  const isSelected = selectedEvaluation?.id === evaluation.id;

                  return (
                    <div
                      key={evaluation.id}
                      className={`rounded-[26px] border p-5 transition-all duration-300 ${
                        isSelected
                          ? 'border-[#2C6ED5]/30 bg-[#EFF6FF] shadow-[0_18px_45px_rgba(44,110,213,0.18)]'
                          : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-[#2C6ED5]/20 hover:shadow-lg'
                      }`}
                    >
                      <button type="button" onClick={() => setSelectedEvaluationId(evaluation.id)} className="w-full text-left">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                              {evaluation.dateLabel}
                            </div>
                            <h3 className="mt-3 text-lg font-semibold text-[#0F172A]">{evaluation.title}</h3>
                            <p className="mt-1 text-sm text-slate-500">
                              {evaluation.filiere} • {evaluation.level}
                            </p>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                              Créée par: {evaluation.createdBy}
                            </p>
                          </div>
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[evaluation.status]}`}>
                            {evaluation.status}
                          </span>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Horaire</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{evaluation.startTime}</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Salle</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{evaluation.room}</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Étudiants</p>
                            <p className="mt-2 text-xl font-bold text-[#0F172A]">{evaluation.students}</p>
                          </div>
                        </div>

                        <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                          <span>Responsable: {evaluation.teacher}</span>
                          <span className="font-semibold text-[#2C6ED5]">Sélectionner la session</span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {filteredEvaluations.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">
                  Aucune évaluation ne correspond à votre filtre actuel.
                </div>
              ) : null}
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6C4CCF]">Lecture croisée</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Tableau des évaluations du centre</h2>
                </div>
                <p className="text-sm text-slate-500">Vue tabulaire pour vérifier la cohérence du planning.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[780px] divide-y divide-slate-100 text-sm text-slate-600">
                  <thead className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    <tr>
                      <th className="px-4 py-3 text-left">Évaluation</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Salle</th>
                      <th className="px-4 py-3 text-left">Responsable</th>
                      <th className="px-4 py-3 text-left">Avancement</th>
                      <th className="px-4 py-3 text-left">Situation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEvaluations.map((evaluation) => (
                      <tr key={evaluation.id} className={evaluation.id === selectedEvaluation?.id ? 'bg-[#EFF6FF]/70' : 'hover:bg-slate-50/80'}>
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-semibold text-[#0F172A]">{evaluation.title}</p>
                            <p className="mt-1 text-xs text-slate-400">
                              {evaluation.filiere} • {evaluation.level}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">{evaluation.dateLabel}</td>
                        <td className="px-4 py-4">{evaluation.room}</td>
                        <td className="px-4 py-4">{evaluation.teacher}</td>
                        <td className="px-4 py-4">{evaluation.progressRate}%</td>
                        <td className="px-4 py-4">
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[evaluation.status]}`}>
                            {evaluation.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            {selectedEvaluation ? (
              <>
                <section className="overflow-hidden rounded-[30px] border border-[#0F172A]/5 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.1)]">
                  <div className={`bg-gradient-to-r ${statusAccent[selectedEvaluation.status]} px-6 py-6 text-white`}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80">Session observée</p>
                        <h2 className="mt-2 text-2xl font-bold">{selectedEvaluation.title}</h2>
                        <p className="mt-2 text-sm text-white/85">
                          {selectedEvaluation.dateLabel} • {selectedEvaluation.room}
                        </p>
                      </div>
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold">
                        {selectedEvaluation.level}
                      </span>
                    </div>
                    {selectedEvaluation.needsAdminConfirmation ? (
                      <div className="mt-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                        En attente de confirmation admin
                      </div>
                    ) : null}
                  </div>

                  <div className="space-y-6 p-6">
                    <div className="rounded-[26px] border border-slate-100 bg-slate-50/80 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Synthèse de planification</p>
                          <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Lecture instantanée de la session</h3>
                        </div>
                        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[selectedEvaluation.status]}`}>
                          {selectedEvaluation.status}
                        </span>
                      </div>

                      <div className="mt-5 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Horaire</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedEvaluation.startTime}</p>
                          <p className="mt-1 text-xs text-slate-500">fin prévue à {selectedEvaluation.endTime}</p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Avancement</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedEvaluation.progressRate}%</p>
                          <p className="mt-1 text-xs text-slate-500">préparation administrative</p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Effectif</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedEvaluation.students}</p>
                          <p className="mt-1 text-xs text-slate-500">étudiants concernés</p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Provenance</p>
                          <p className="mt-2 text-2xl font-bold text-[#0F172A]">{selectedEvaluation.createdBy}</p>
                          <p className="mt-1 text-xs text-slate-500">créateur de la session</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[26px] border border-slate-100 bg-white p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#2C6ED5]">
                          <ClipboardCheck className="h-5 w-5" strokeWidth={2.1} />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2C6ED5]">Organisation de la session</p>
                      </div>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                            <Clock3 className="h-4 w-4" />
                            <span>Créneau retenu</span>
                          </div>
                          <p className="mt-2 font-semibold text-[#0F172A]">
                            {selectedEvaluation.startTime} - {selectedEvaluation.endTime}
                          </p>
                          <p className="mt-1 text-sm text-slate-500">{selectedEvaluation.dateLabel}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                            <CalendarClock className="h-4 w-4" />
                            <span>Responsable</span>
                          </div>
                          <p className="mt-2 font-semibold text-[#0F172A]">{selectedEvaluation.teacher}</p>
                          <p className="mt-1 text-sm text-slate-500">{selectedEvaluation.room}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-400">
                            <ShieldAlert className="h-4 w-4" />
                            <span>Point d attention</span>
                          </div>
                          <p className="mt-2 font-semibold text-[#0F172A]">{selectedEvaluation.priority}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[26px] border border-slate-100 bg-white p-5">
                      <div className="mb-4 flex flex-wrap gap-3">
                        {selectedEvaluation.needsAdminConfirmation ? (
                          <button
                            type="button"
                            onClick={() => handleConfirmEvaluation(selectedEvaluation.id)}
                            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                          >
                            Confirmer la session
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => openEditModal(selectedEvaluation)}
                          className="inline-flex items-center justify-center rounded-full bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1A43BF]"
                        >
                          Modifier la session
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvaluation(selectedEvaluation.id)}
                          className="inline-flex items-center justify-center rounded-full border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                        >
                          Supprimer la session
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-500">Étapes à sécuriser</p>
                          <h3 className="mt-2 text-lg font-semibold text-[#0F172A]">Checklist administrative</h3>
                        </div>
                        <div className="rounded-2xl bg-rose-50 px-4 py-3 text-center">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-400">Priorité</p>
                          <p className="mt-1 text-sm font-bold text-rose-600">{selectedEvaluation.status}</p>
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {[
                          'Valider la disponibilité de la salle et du surveillant principal.',
                          'Confirmer la liste des étudiants et les émargements.',
                          'Préparer le circuit de correction et la date de publication.',
                        ].map((item, index) => (
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

                <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-[#1EB980]">
                      <CalendarClock className="h-5 w-5" strokeWidth={2.1} />
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1EB980]">Décision recommandée</p>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Lecture orientée organisation</h3>
                  <div className="mt-5 grid gap-4 text-sm text-slate-600">
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Session ciblée</p>
                      <p className="mt-2 text-lg font-semibold text-[#0F172A]">{selectedEvaluation.title}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Créneau retenu</p>
                      <p className="mt-2 text-lg font-semibold text-[#0F172A]">
                        {selectedEvaluation.dateLabel} • {selectedEvaluation.startTime}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] px-4 py-4 text-white">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">Recommandation</p>
                      <p className="mt-2 text-sm leading-6 text-slate-100">
                        {selectedEvaluation.needsAdminConfirmation
                          ? 'Cette session a été créée par le surveillant. Vérifiez la date, la salle et la matière puis confirmez-la officiellement.'
                          : selectedEvaluation.status === 'A planifier'
                          ? 'Finaliser la date et la salle avant validation finale, puis notifier l équipe pédagogique.'
                          : selectedEvaluation.status === 'Sous surveillance'
                            ? 'Sécuriser les copies, les présences et la date de publication avant clôture.'
                            : 'La session est prête. Vous pouvez confirmer le circuit de correction et la communication des résultats.'}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Filière concernée</p>
                      <p className="mt-2 text-lg font-semibold text-[#0F172A]">
                        {selectedEvaluation.filiere} • {selectedEvaluation.level}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Validation admin</p>
                      <p className="mt-2 text-lg font-semibold text-[#0F172A]">
                        {selectedEvaluation.needsAdminConfirmation ? 'En attente' : 'Confirmée'}
                      </p>
                    </div>
                  </div>
                </section>
              </>
            ) : null}
          </aside>
        </div>
      </section>

      {showCreationModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[30px] border border-[#DBEAFE] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#2C6ED5]">
                  {editingEvaluationId ? 'Modification' : 'Création'}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">
                  {editingEvaluationId ? "Modifier une évaluation" : 'Préparer une nouvelle évaluation'}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Définissez la planification en suivant la structure académique du super-admin: filière, option,
                  année d&apos;étude, matière et salle.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreationModal(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                aria-label="Fermer la création"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              <div className="flex flex-col gap-3 rounded-[26px] border border-[#BFDBFE] bg-[#EFF6FF] p-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#1D4ED8]">Fenêtre recommandée</p>
                  <p className="mt-1 text-sm text-slate-600">08 au 15 avril 2026 pour rester cohérent avec le planning du centre.</p>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                  Créneau suggéré: <span className="font-semibold text-[#0F172A]">matinée 08:30 - 11:30</span>
                </div>
              </div>

              <div className="rounded-[26px] border border-slate-100 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Parcours de création</p>
                <div className="mt-4 grid gap-3 md:grid-cols-5">
                  {[
                    { label: 'Filière', value: selectedFiliere || 'À choisir' },
                    { label: 'Option', value: selectedOption || 'À choisir' },
                    { label: 'Année', value: selectedAnnee || 'À choisir' },
                    { label: 'Matière', value: selectedMatiere || 'À choisir' },
                    { label: 'Salle', value: selectedSalle || 'À choisir' },
                  ].map((step) => (
                    <div key={step.label} className="rounded-2xl bg-slate-50 px-4 py-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{step.label}</p>
                      <p className="mt-2 text-sm font-semibold text-[#0F172A]">{step.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Intitulé de l&apos;évaluation</span>
                  <input
                    type="text"
                    value={evaluationTitle}
                    readOnly
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Filière</span>
                  <select
                    value={selectedFiliere}
                    onChange={(event) => setSelectedFiliere(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#2C6ED5] focus:ring-4 focus:ring-[#2C6ED5]/10"
                    disabled={filieres.length === 0}
                  >
                    {filieres.length > 0 ? (
                      filieres.map((filiere) => (
                        <option key={filiere.label} value={filiere.label}>
                          {filiere.label}
                        </option>
                      ))
                    ) : (
                      <option value="">Aucune filière disponible</option>
                    )}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Option</span>
                  <select
                    value={selectedOption}
                    onChange={(event) => setSelectedOption(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#2C6ED5] focus:ring-4 focus:ring-[#2C6ED5]/10"
                    disabled={availableOptions.length === 0}
                  >
                    {availableOptions.length > 0 ? (
                      availableOptions.map((option) => (
                        <option key={option.label} value={option.label}>
                          {option.label}
                        </option>
                      ))
                    ) : (
                      <option value="">Aucune option disponible</option>
                    )}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Année d&apos;étude</span>
                  <select
                    value={selectedAnnee}
                    onChange={(event) => setSelectedAnnee(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#2C6ED5] focus:ring-4 focus:ring-[#2C6ED5]/10"
                    disabled={annees.length === 0}
                  >
                    {annees.length > 0 ? (
                      annees.map((annee) => (
                        <option key={annee} value={annee}>
                          {annee}
                        </option>
                      ))
                    ) : (
                      <option value="">Aucune année disponible</option>
                    )}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Matière</span>
                  <select
                    value={selectedMatiere}
                    onChange={(event) => setSelectedMatiere(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#2C6ED5] focus:ring-4 focus:ring-[#2C6ED5]/10"
                    disabled={availableMatieres.length === 0}
                  >
                    {availableMatieres.length > 0 ? (
                      availableMatieres.map((matiere) => (
                        <option key={matiere.label} value={matiere.label}>
                          {matiere.label}
                        </option>
                      ))
                    ) : (
                      <option value="">Aucune matière disponible</option>
                    )}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Date prévue</span>
                  <input
                    type="text"
                    value={scheduledDate}
                    onChange={(event) => setScheduledDate(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#2C6ED5] focus:ring-4 focus:ring-[#2C6ED5]/10"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Horaire</span>
                  <input
                    type="text"
                    value={scheduledTime}
                    onChange={(event) => setScheduledTime(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#2C6ED5] focus:ring-4 focus:ring-[#2C6ED5]/10"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Salle retenue</span>
                  <select
                    value={selectedSalle}
                    onChange={(event) => setSelectedSalle(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#2C6ED5] focus:ring-4 focus:ring-[#2C6ED5]/10"
                    disabled={salles.length === 0}
                  >
                    {salles.length > 0 ? (
                      salles.map((salle) => (
                        <option key={salle} value={salle}>
                          {salle}
                        </option>
                      ))
                    ) : (
                      <option value="">Aucune salle disponible</option>
                    )}
                  </select>
                </label>

                <label className="space-y-2 md:col-span-2 xl:col-span-3">
                  <span className="text-sm font-medium text-slate-700">Enseignant responsable</span>
                  <input
                    type="text"
                    value={selectedTeacher}
                    onChange={(event) => setSelectedTeacher(event.target.value)}
                    placeholder="Nom de l'enseignant responsable"
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#2C6ED5] focus:ring-4 focus:ring-[#2C6ED5]/10"
                  />
                </label>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
                <div className="rounded-[26px] border border-slate-100 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Validation administrative</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-xl bg-slate-50 px-3 py-3">
                      <p className="text-xs text-slate-500">Enseignant</p>
                      <p className="mt-1 font-semibold text-slate-900">{selectedTeacher || 'A confirmer'}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-3">
                      <p className="text-xs text-slate-500">Structure retenue</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {selectedFiliere || 'Filiere'} • {selectedOption || 'Option'}
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-3">
                      <p className="text-xs text-slate-500">Salle et année</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {selectedSalle || 'Salle'} • {selectedAnnee || 'Annee'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                    Cette évaluation est reliée à la structure académique définie au niveau super-admin. Vérifiez la cohérence entre la matière
                    {selectedMatiere ? ` "${selectedMatiere}"` : ''}, l&apos;option, l&apos;année d&apos;étude et la salle retenue avant validation.
                  </div>

                  <div
                    className={`mt-4 rounded-2xl border px-4 py-4 text-sm ${
                      isCreationReady
                        ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                        : 'border-amber-100 bg-amber-50 text-amber-700'
                    }`}
                  >
                    {isCreationReady
                      ? 'La structure académique est complète. Cette évaluation peut être planifiée sur une combinaison cohérente.'
                      : `Complétez encore: ${missingStructureItems.join(', ')}.`}
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 px-3 py-3">
                      <p className="text-xs text-slate-500">Matière sélectionnée</p>
                      <p className="mt-1 font-semibold text-slate-900">{selectedMatiere || 'Aucune matière'}</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 px-3 py-3">
                      <p className="text-xs text-slate-500">Crédits</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {selectedMatiereDetails ? `${selectedMatiereDetails.credits} crédits` : 'Non défini'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[26px] bg-[#0F172A] p-5 text-white shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Actions</p>
                  <p className="mt-2 text-sm leading-6 text-slate-100">
                    Une fois les ressources confirmées, l&apos;administration peut {editingEvaluationId ? 'mettre à jour' : 'enregistrer'} la date et diffuser l&apos;information aux enseignants.
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleCreateEvaluation}
                      disabled={!isCreationReady}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {editingEvaluationId ? 'Enregistrer les modifications' : 'Enregistrer la date'}
                    </button>
                    <button
                      type="button"
                      disabled={!isCreationReady}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <CalendarClock className="h-4 w-4" />
                      Envoyer aux enseignants
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreationModal(false);
                        setEditingEvaluationId(null);
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      <X className="h-4 w-4" />
                      Fermer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
};

export default EvaluationsPage;
