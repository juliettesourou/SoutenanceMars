import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Filter,
  MapPin,
  Phone,
  Plus,
  Users,
  X,
  Mail,
} from 'lucide-react';
import AdminTopbar from '../../../../components/adminCEntre/AdminTopbar';
import AdminMobileNav from '../../../../components/adminCEntre/AdminMobileNav';

type EvaluationStatus = 'A planifier' | 'Confirmee' | 'Sous surveillance';
type SessionStatus = 'A faire' | 'En cours' | 'Termine';
type SessionFilter = 'Toutes' | SessionStatus;

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

interface SurveillanceSession {
  id: string;
  title: string;
  room: string;
  filiere: string;
  time: string;
  status: SessionStatus;
  expectedStudents: number;
}

interface TeamSurveillant {
  id: string;
  name: string;
  zone: string;
  status: 'Actif' | 'Non actif';
  detail: string;
}

interface PlanningItem {
  id: string;
  title: string;
  detail: string;
  source: string;
  evaluationId?: string;
}

interface AbsenceSummary {
  id: string;
  title: string;
  count: number;
  detail: string;
  status: 'Urgent' | 'En suivi' | 'Stabilisé';
}

const STORAGE_FILIERE_KEY = 'enangnon_filieres';
const STORAGE_OPTION_KEY = 'enangnon_options';
const STORAGE_MATIERE_KEY = 'enangnon_matieres';
const STORAGE_ANNEE_KEY = 'enangnon_annees_etude';
const STORAGE_SALLE_KEY = 'enangnon_salles';
const STORAGE_EVALUATION_KEY = 'enangnon_admin_evaluations';
const PLANNING_ITEMS_PER_PAGE = 3;

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

const currentSurveillant = {
  name: 'Alice Houngbedji',
  center: 'Centre Atlantique',
  phone: '+229 01 97 45 32 10',
  email: 'alice.houngbedji@enangnon.bj',
  role: 'Surveillante principale',
};

const sessionsToday: SurveillanceSession[] = [
  {
    id: 'sv-1',
    title: 'Contrôle continu - Algorithmique',
    room: 'Salle A2',
    filiere: 'Licence 2 Informatique',
    time: '08:00 - 10:00',
    status: 'En cours',
    expectedStudents: 42,
  },
  {
    id: 'sv-2',
    title: 'TD - Réseaux avancés',
    room: 'Laboratoire 1',
    filiere: 'Licence 3 Réseaux',
    time: '10:30 - 12:30',
    status: 'A faire',
    expectedStudents: 27,
  },
  {
    id: 'sv-3',
    title: 'Examen blanc - Comptabilité',
    room: 'Salle B1',
    filiere: 'Licence 1 Comptabilité',
    time: '14:00 - 16:00',
    status: 'A faire',
    expectedStudents: 38,
  },
];

const surveillantTeam: TeamSurveillant[] = [
  {
    id: 'team-1',
    name: 'Alice Houngbedji',
    zone: 'Bloc A',
    status: 'Actif',
    detail: 'Contrôle continu Algorithmique • 08:00 - 10:00',
  },
  {
    id: 'team-2',
    name: 'Mickael Dossou',
    zone: 'Bloc B',
    status: 'Actif',
    detail: 'TD Réseaux avancés • 10:30 - 12:30',
  },
  {
    id: 'team-3',
    name: 'Ruth Kiki',
    zone: 'Laboratoire 1',
    status: 'Actif',
    detail: 'Examen blanc Comptabilité • 14:00 - 16:00',
  },
  {
    id: 'team-4',
    name: 'Pauline Ahouandjinou',
    zone: 'Bloc C',
    status: 'Non actif',
    detail: 'En attente d affectation',
  },
  {
    id: 'team-5',
    name: 'Fidele Agossou',
    zone: 'Renfort',
    status: 'Non actif',
    detail: 'Absent signalé ce matin',
  },
];

const studentAbsenceSummary: AbsenceSummary = {
  id: 'student-absences',
  title: 'Absences étudiants',
  count: 14,
  detail: '8 en attente de justification et 6 déjà traitées aujourd hui.',
  status: 'En suivi',
};

const teacherAbsenceSummary: AbsenceSummary = {
  id: 'teacher-absences',
  title: 'Absences enseignants',
  count: 3,
  detail: '2 signalées ce matin et 1 transmise à l administration.',
  status: 'Urgent',
};

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

const SurveillantsPage: React.FC = () => {
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [filieres, setFilieres] = useState<FiliereItem[]>(fallbackFilieres);
  const [options, setOptions] = useState<OptionItem[]>(fallbackOptions);
  const [matieres, setMatieres] = useState<MatiereItem[]>(fallbackMatieres);
  const [annees, setAnnees] = useState<string[]>(fallbackAnnees);
  const [salles, setSalles] = useState<string[]>(fallbackSalles);
  const [evaluationItems, setEvaluationItems] = useState<EvaluationItem[]>([]);
  const [selectedFiliere, setSelectedFiliere] = useState(fallbackFilieres[0]?.label ?? '');
  const [selectedOption, setSelectedOption] = useState(fallbackOptions[0]?.label ?? '');
  const [selectedAnnee, setSelectedAnnee] = useState(fallbackAnnees[0] ?? '');
  const [selectedMatiere, setSelectedMatiere] = useState(fallbackMatieres[0]?.label ?? '');
  const [selectedSalle, setSelectedSalle] = useState(fallbackSalles[0] ?? '');
  const [scheduledDate, setScheduledDate] = useState('16 avril 2026');
  const [scheduledTime, setScheduledTime] = useState('08:30 - 11:30');
  const [planningPage, setPlanningPage] = useState(1);
  const [sessionFilter, setSessionFilter] = useState<SessionFilter>('Toutes');
  const [confirmedFallbackPlanningIds, setConfirmedFallbackPlanningIds] = useState<string[]>([]);

  const formattedToday = useMemo(
    () =>
      new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date()),
    []
  );

  useEffect(() => {
    try {
      const storedFilieres = localStorage.getItem(STORAGE_FILIERE_KEY);
      if (storedFilieres) {
        const parsed = JSON.parse(storedFilieres) as Array<string | FiliereItem>;
        if (Array.isArray(parsed) && parsed.length > 0) {
          const normalized = parsed.map((item) =>
            typeof item === 'string'
              ? { label: item, options: [] }
              : { label: item.label, options: Array.isArray(item.options) ? item.options : [] }
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
        if (Array.isArray(parsed)) setEvaluationItems(parsed);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données surveillant', error);
    }
  }, []);

  const availableOptions = useMemo(
    () => options.filter((option) => option.filiere === selectedFiliere),
    [options, selectedFiliere]
  );

  const availableMatieres = useMemo(
    () => matieres.filter((matiere) => matiere.option === selectedOption),
    [matieres, selectedOption]
  );

  const selectedMatiereDetails = useMemo(
    () => matieres.find((matiere) => matiere.label === selectedMatiere),
    [matieres, selectedMatiere]
  );

  const proposedEvaluations = useMemo(
    () => evaluationItems.filter((evaluation) => evaluation.createdBy === 'Surveillant'),
    [evaluationItems]
  );

  const pendingConfirmations = useMemo(
    () => proposedEvaluations.filter((evaluation) => evaluation.needsAdminConfirmation).length,
    [proposedEvaluations]
  );

  const filteredSessions = useMemo(
    () => (sessionFilter === 'Toutes' ? sessionsToday : sessionsToday.filter((session) => session.status === sessionFilter)),
    [sessionFilter]
  );

  const activeSurveillants = useMemo(
    () => surveillantTeam.filter((surveillant) => surveillant.status === 'Actif'),
    []
  );

  const inactiveSurveillants = useMemo(
    () => surveillantTeam.filter((surveillant) => surveillant.status === 'Non actif'),
    []
  );

  const planningToConfirm = useMemo<PlanningItem[]>(() => {
    const proposedPlanning = proposedEvaluations
      .filter((evaluation) => evaluation.needsAdminConfirmation)
      .map((evaluation) => ({
        id: evaluation.id,
        title: evaluation.title,
        detail: `${evaluation.dateLabel} • ${evaluation.room} • ${evaluation.startTime} - ${evaluation.endTime}`,
        source: 'Proposition surveillant',
        evaluationId: evaluation.id,
      }));

    if (proposedPlanning.length > 0) {
      return proposedPlanning.filter((item) => !confirmedFallbackPlanningIds.includes(item.id));
    }

    return [
      {
        id: 'fallback-1',
        title: 'Contrôle continu - Base de données',
        detail: '16 avril 2026 • Salle A5 • 08:30 - 11:30',
        source: 'À confirmer',
      },
      {
        id: 'fallback-2',
        title: 'Examen - Comptabilité générale',
        detail: '18 avril 2026 • Salle B1 • 14:00 - 16:00',
        source: 'Salle à valider',
      },
    ].filter((item) => !confirmedFallbackPlanningIds.includes(item.id));
  }, [confirmedFallbackPlanningIds, proposedEvaluations]);

  const planningTotalPages = Math.max(1, Math.ceil(planningToConfirm.length / PLANNING_ITEMS_PER_PAGE));

  const paginatedPlanning = useMemo(
    () =>
      planningToConfirm.slice(
        (planningPage - 1) * PLANNING_ITEMS_PER_PAGE,
        planningPage * PLANNING_ITEMS_PER_PAGE
      ),
    [planningPage, planningToConfirm]
  );

  const isProposalReady = Boolean(
    selectedFiliere && selectedOption && selectedAnnee && selectedMatiere && selectedSalle
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

  useEffect(() => {
    if (planningPage > planningTotalPages) {
      setPlanningPage(planningTotalPages);
    }
  }, [planningPage, planningTotalPages]);

  const openProposalModal = () => {
    const initialFiliere = filieres[0]?.label ?? '';
    const initialOptions = options.filter((option) => option.filiere === initialFiliere);
    const initialOption = initialOptions[0]?.label ?? '';
    const initialMatieres = matieres.filter((matiere) => matiere.option === initialOption);

    setSelectedFiliere(initialFiliere);
    setSelectedOption(initialOption);
    setSelectedAnnee(annees[0] ?? '');
    setSelectedMatiere(initialMatieres[0]?.label ?? '');
    setSelectedSalle(salles[0] ?? '');
    setScheduledDate('16 avril 2026');
    setScheduledTime('08:30 - 11:30');
    setShowProposalModal(true);
  };

  const handleCreateProposal = () => {
    if (!isProposalReady) return;

    const { startTime, endTime } = normalizeTimeRange(scheduledTime);
    const nextEvaluation: EvaluationItem = {
      id: `eval-${Date.now()}`,
      title: `Evaluation - ${selectedMatiere}`,
      filiere: `${selectedFiliere} • ${selectedOption}`,
      level: selectedAnnee,
      teacher: currentSurveillant.name,
      room: selectedSalle,
      dateLabel: scheduledDate,
      monthKey: 'Avril 2026',
      day: normalizeDay(scheduledDate),
      startTime,
      endTime,
      students: 24 + (selectedMatiereDetails?.credits ?? 3) * 3,
      progressRate: 35,
      status: 'A planifier',
      priority: `Proposition du surveillant ${currentSurveillant.name} en attente de validation admin.`,
      createdBy: 'Surveillant',
      needsAdminConfirmation: true,
    };

    const updatedEvaluations = [nextEvaluation, ...evaluationItems];
    setEvaluationItems(updatedEvaluations);
    try {
      localStorage.setItem(STORAGE_EVALUATION_KEY, JSON.stringify(updatedEvaluations));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la proposition surveillant', error);
    }
    setShowProposalModal(false);
  };

  const handleConfirmPlanning = (item: PlanningItem) => {
    if (item.evaluationId) {
      const updatedEvaluations = evaluationItems.map((evaluation) =>
        evaluation.id === item.evaluationId
          ? { ...evaluation, needsAdminConfirmation: false, status: 'Confirmee' as EvaluationStatus }
          : evaluation
      );

      setEvaluationItems(updatedEvaluations);

      try {
        localStorage.setItem(STORAGE_EVALUATION_KEY, JSON.stringify(updatedEvaluations));
      } catch (error) {
        console.error('Erreur lors de la confirmation du planning', error);
      }

      return;
    }

    setConfirmedFallbackPlanningIds((current) => [...current, item.id]);
  };

  return (
    <main className="flex-1 bg-[#F3F7FF]">
      <AdminTopbar
        title="Surveillants"
        subtitle="Vue globale des surveillants et des points essentiels à suivre"
        rightSlot={<AdminMobileNav />}
      />

      <section className="space-y-6 px-4 pb-10 pt-5 sm:px-6 lg:space-y-8 lg:px-10">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F766E] via-[#0EA5A4] to-[#2563EB] px-6 py-8 text-white shadow-[0_28px_80px_rgba(14,165,164,0.24)] sm:px-8 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.22),_transparent_28%)]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
            <div>
              <div className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-white/90">
                Administration • {currentSurveillant.center}
              </div>
              <div className="mt-4 inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90">
                {formattedToday}
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl">
                Vue globale des surveillants pour suivre l activité du centre en un coup d oeil.
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-cyan-50 sm:text-base">
                Cette interface se concentre sur l activité réelle du surveillant: suivi terrain, gestion des absences et emplois du temps à confirmer.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-50">Total surveillants</p>
                  <p className="mt-2 text-2xl font-semibold">{surveillantTeam.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-50">Surveillants actifs</p>
                  <p className="mt-2 text-2xl font-semibold">{activeSurveillants.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-50">EDT à confirmer</p>
                  <p className="mt-2 text-2xl font-semibold">{planningToConfirm.length}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-50">Repères essentiels</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-cyan-50">Surveillants actifs</p>
                  <p className="mt-2 text-4xl font-bold">{activeSurveillants.length}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-cyan-50">Surveillants non actifs</p>
                  <p className="mt-2 text-4xl font-bold">{inactiveSurveillants.length}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-cyan-50">Absences étudiants</p>
                  <p className="mt-2 text-4xl font-bold">{studentAbsenceSummary.count}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-5">
                  <p className="text-sm text-cyan-50">Absences enseignants</p>
                  <p className="mt-2 text-4xl font-bold">{teacherAbsenceSummary.count}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-white/10 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-50">Contact référent</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-lg font-semibold text-white">{currentSurveillant.name}</p>
                    <p className="text-sm text-cyan-50">{currentSurveillant.role}</p>
                  </div>
                  <div className="space-y-2 text-sm text-cyan-50">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{currentSurveillant.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{currentSurveillant.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-[28px] bg-gradient-to-br from-[#1D4ED8] to-[#2563EB] p-5 text-white shadow-lg">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-blue-100">Surveillants actifs</p>
                <p className="mt-3 text-4xl font-bold">{activeSurveillants.length}</p>
              </div>
              <CalendarClock className="h-7 w-7" strokeWidth={2.1} />
            </div>
            <p className="mt-2 text-sm text-blue-50">sur le terrain en ce moment</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-emerald-600">Absences étudiants</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{studentAbsenceSummary.count}</p>
              </div>
              <Users className="h-7 w-7 text-emerald-500" strokeWidth={2.1} />
            </div>
            <p className="mt-2 text-sm text-slate-500">signalées ou à justifier aujourd hui</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-amber-600">Absences enseignants</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{teacherAbsenceSummary.count}</p>
              </div>
              <MapPin className="h-7 w-7 text-amber-500" strokeWidth={2.1} />
            </div>
            <p className="mt-2 text-sm text-slate-500">cas suivis par le surveillant référent</p>
          </article>

          <article className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-lg backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-rose-600">EDT à confirmer</p>
                <p className="mt-3 text-3xl font-bold text-[#0F172A]">{planningToConfirm.length}</p>
              </div>
              <Clock3 className="h-7 w-7 text-rose-500" strokeWidth={2.1} />
            </div>
            <p className="mt-2 text-sm text-slate-500">emplois du temps ou propositions en attente</p>
          </article>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6">
            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0F766E]">Gestion des absences</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Ce que le surveillant traite aujourd hui</h2>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
                    <Filter className="h-3.5 w-3.5" />
                    Filtre
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['Toutes', 'En cours', 'A faire', 'Termine'] as SessionFilter[]).map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setSessionFilter(filter)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                          sessionFilter === filter
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-2">
                {[studentAbsenceSummary, teacherAbsenceSummary].map((item) => (
                  <article key={item.id} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[#0F172A]">{item.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === 'Urgent'
                            ? 'bg-rose-50 text-rose-700'
                            : item.status === 'En suivi'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-emerald-50 text-emerald-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Total du jour</p>
                        <p className="mt-2 font-semibold text-[#0F172A]">{item.count}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Action</p>
                        <p className="mt-2 font-semibold text-[#0F172A]">
                          {item.id === 'student-absences' ? 'Contrôle et justification' : 'Signalement et remplacement'}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Responsable</p>
                        <p className="mt-2 font-semibold text-[#0F172A]">{currentSurveillant.name}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-2">
                {filteredSessions.map((session) => (
                  <article key={session.id} className="rounded-[24px] border border-slate-100 bg-white p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Activité surveillant</p>
                        <h3 className="mt-2 text-lg font-semibold text-[#0F172A]">{session.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">{session.filiere}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {session.status}
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Horaire</p>
                        <p className="mt-2 font-semibold text-[#0F172A]">{session.time}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Zone</p>
                        <p className="mt-2 font-semibold text-[#0F172A]">{session.room}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Mission</p>
                        <p className="mt-2 font-semibold text-[#0F172A]">Suivi de présence</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1D4ED8]">Surveillants actifs</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Équipe actuellement mobilisée</h2>
                </div>
                <div className="rounded-full bg-[#EFF6FF] px-4 py-2 text-xs font-semibold text-[#1D4ED8]">
                  Vue globale
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                {activeSurveillants.map((surveillant) => (
                  <article key={surveillant.id} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[#0F172A]">{surveillant.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{surveillant.detail}</p>
                      </div>
                      <span className="inline-flex rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        {surveillant.status}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Zone</p>
                        <p className="mt-2 font-semibold text-[#0F172A]">{surveillant.zone}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Statut</p>
                        <p className="mt-2 font-semibold text-[#0F172A]">En service</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Période</p>
                        <p className="mt-2 font-semibold text-[#0F172A]">Aujourd hui</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#DC2626]">Surveillants non actifs</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Disponibilités à suivre</h2>
                </div>
                <div className="rounded-full bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-700">
                  À surveiller
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                {inactiveSurveillants.map((surveillant) => (
                  <article key={surveillant.id} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[#0F172A]">{surveillant.name}</h3>
                        <p className="mt-1 text-sm text-slate-500">{surveillant.detail}</p>
                      </div>
                      <span className="inline-flex rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                        {surveillant.status}
                      </span>
                    </div>

                    <div className="mt-4 rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Zone</p>
                      <p className="mt-2 font-semibold text-[#0F172A]">{surveillant.zone}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#6C4CCF]">Planning des devoirs</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Éléments à confirmer</h2>
                </div>
                <div className="rounded-full bg-violet-50 px-4 py-2 text-xs font-semibold text-[#6C4CCF]">
                  Essentiel
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                {paginatedPlanning.map((item) => (
                  <article key={item.id} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-[#0F172A]">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{item.detail}</p>
                      </div>
                      <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                        {item.source}
                      </span>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleConfirmPlanning(item)}
                        className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                      >
                        Confirmer
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              {planningToConfirm.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
                  Aucun élément en attente de confirmation.
                </div>
              ) : (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">
                    Page {planningPage} sur {planningTotalPages}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPlanningPage((page) => Math.max(1, page - 1))}
                      disabled={planningPage === 1}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Précédent
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlanningPage((page) => Math.min(planningTotalPages, page + 1))}
                      disabled={planningPage === planningTotalPages}
                      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#EA580C]">Signalements et remontées</p>
                  <h2 className="text-xl font-semibold text-[#0F172A]">Sessions et retours transmis à l administration</h2>
                </div>
                <button
                  type="button"
                  onClick={openProposalModal}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1D4ED8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1A43BF]"
                >
                  <Plus className="h-4 w-4" />
                  Nouvelle proposition
                </button>
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-2">
                {proposedEvaluations.map((evaluation) => (
                  <article key={evaluation.id} className="rounded-[24px] border border-slate-100 bg-slate-50/80 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                          {evaluation.dateLabel}
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-[#0F172A]">{evaluation.title}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {evaluation.filiere} • {evaluation.level}
                        </p>
                      </div>
                      <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                        {evaluation.needsAdminConfirmation ? 'À confirmer par l admin' : 'Confirmée'}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Surveillant</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">{evaluation.teacher}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Salle</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">{evaluation.room}</p>
                      </div>
                      <div className="rounded-2xl bg-white px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Horaire</p>
                        <p className="mt-2 text-sm font-semibold text-slate-900">
                          {evaluation.startTime} - {evaluation.endTime}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {proposedEvaluations.length === 0 ? (
                <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center text-sm text-slate-500">
                  Aucune proposition surveillant enregistrée pour le moment.
                </div>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E293B]"
                >
                  Transmettre le rapport du jour à l admin
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Envoyer un avertissement
                </button>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EFF6FF] text-[#1D4ED8]">
                  <Users className="h-5 w-5" strokeWidth={2.1} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#1D4ED8]">Répartition rapide</p>
                  <h2 className="text-lg font-semibold text-[#0F172A]">Statut des surveillants</h2>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                  <span>Actifs</span>
                  <span className="font-semibold text-slate-900">{activeSurveillants.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                  <span>Non actifs</span>
                  <span className="font-semibold text-slate-900">{inactiveSurveillants.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                  <span>Absences étudiants</span>
                  <span className="font-semibold text-slate-900">{studentAbsenceSummary.count}</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
                  <span>Absences enseignants</span>
                  <span className="font-semibold text-slate-900">{teacherAbsenceSummary.count}</span>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <ClipboardCheck className="h-5 w-5" strokeWidth={2.1} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-600">Confirmations</p>
                  <h2 className="text-lg font-semibold text-[#0F172A]">Planning à traiter</h2>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {planningToConfirm.slice(0, 3).map((item, index) => (
                  <div key={item.id} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-sm text-slate-600">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#1D4ED8] shadow-sm">
                      {index + 1}
                    </span>
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                  <Phone className="h-5 w-5" strokeWidth={2.1} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">Référent terrain</p>
                  <h2 className="text-lg font-semibold text-[#0F172A]">Coordonnées utiles</h2>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 px-4 py-4">
                  <p className="font-semibold text-slate-900">{currentSurveillant.name}</p>
                  <p className="mt-1">{currentSurveillant.role}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-4">
                  <p className="font-semibold text-slate-900">Téléphone</p>
                  <p className="mt-1">{currentSurveillant.phone}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-4">
                  <p className="font-semibold text-slate-900">Email</p>
                  <p className="mt-1 break-all">{currentSurveillant.email}</p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                  <AlertTriangle className="h-5 w-5" strokeWidth={2.1} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-600">Alertes rapides</p>
                  <h2 className="text-lg font-semibold text-[#0F172A]">Points à surveiller</h2>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 px-4 py-4">
                  <p className="font-semibold text-slate-900">{inactiveSurveillants.length} surveillant(s) non actif(s)</p>
                  <p className="mt-1">Prévoir un remplacement ou une réaffectation si nécessaire.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-4">
                  <p className="font-semibold text-slate-900">{planningToConfirm.length} élément(s) en attente de confirmation</p>
                  <p className="mt-1">Le planning doit être validé pour stabiliser les activités du surveillant.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-4 py-4">
                  <p className="font-semibold text-slate-900">{teacherAbsenceSummary.count + studentAbsenceSummary.count} absence(s) suivie(s)</p>
                  <p className="mt-1">Le surveillant doit clôturer les cas urgents avant la fin de journée.</p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-lg backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <CalendarClock className="h-5 w-5" strokeWidth={2.1} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600">Action rapide</p>
                  <h2 className="text-lg font-semibold text-[#0F172A]">Ajouter un devoir à confirmer</h2>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl bg-slate-50 px-4 py-4">
                  <p className="font-semibold text-[#0F172A]">Statut actuel</p>
                  <p className="mt-1">{pendingConfirmations} proposition(s) attendent encore une validation admin.</p>
                </div>
                <button
                  type="button"
                  onClick={openProposalModal}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1D4ED8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1A43BF]"
                >
                  <Plus className="h-4 w-4" />
                  Nouveau devoir à confirmer
                </button>
              </div>
            </section>
          </aside>
        </div>
      </section>

      {showProposalModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-[2px]">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[30px] border border-[#DBEAFE] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#1D4ED8]">Proposition surveillant</p>
                <h3 className="mt-2 text-xl font-semibold text-[#0F172A]">Proposer une évaluation à l administration</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Cette proposition sera enregistrée avec le statut à confirmer par l&apos;admin du centre.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowProposalModal(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 px-6 py-6">
              <div className="rounded-[24px] border border-amber-100 bg-amber-50 px-5 py-4 text-sm text-amber-700">
                Le surveillant transmet ici une proposition de session. L&apos;admin pourra ensuite la valider ou la corriger.
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Surveillant</span>
                  <input
                    type="text"
                    value={currentSurveillant.name}
                    readOnly
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Filière</span>
                  <select
                    value={selectedFiliere}
                    onChange={(event) => setSelectedFiliere(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/10"
                  >
                    {filieres.map((filiere) => (
                      <option key={filiere.label} value={filiere.label}>
                        {filiere.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Option</span>
                  <select
                    value={selectedOption}
                    onChange={(event) => setSelectedOption(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/10"
                  >
                    {availableOptions.map((option) => (
                      <option key={option.label} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Année d étude</span>
                  <select
                    value={selectedAnnee}
                    onChange={(event) => setSelectedAnnee(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/10"
                  >
                    {annees.map((annee) => (
                      <option key={annee} value={annee}>
                        {annee}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Matière</span>
                  <select
                    value={selectedMatiere}
                    onChange={(event) => setSelectedMatiere(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/10"
                  >
                    {availableMatieres.map((matiere) => (
                      <option key={matiere.label} value={matiere.label}>
                        {matiere.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Salle</span>
                  <select
                    value={selectedSalle}
                    onChange={(event) => setSelectedSalle(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/10"
                  >
                    {salles.map((salle) => (
                      <option key={salle} value={salle}>
                        {salle}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Date proposée</span>
                  <input
                    type="text"
                    value={scheduledDate}
                    onChange={(event) => setScheduledDate(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/10"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Horaire proposé</span>
                  <input
                    type="text"
                    value={scheduledTime}
                    onChange={(event) => setScheduledTime(event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#1D4ED8] focus:ring-4 focus:ring-[#1D4ED8]/10"
                  />
                </label>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Statut de sortie</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">À confirmer par l admin</p>
                  <p className="mt-1 text-xs text-slate-500">La proposition sera revue côté centre.</p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
                <div className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Résumé</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs text-slate-500">Structure</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {selectedFiliere} • {selectedOption}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs text-slate-500">Année et salle</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {selectedAnnee} • {selectedSalle}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs text-slate-500">Matière</p>
                      <p className="mt-1 font-semibold text-slate-900">{selectedMatiere}</p>
                    </div>
                    <div className="rounded-2xl bg-white px-4 py-3">
                      <p className="text-xs text-slate-500">Crédits</p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {selectedMatiereDetails ? `${selectedMatiereDetails.credits} crédits` : 'Non défini'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[24px] bg-[#0F172A] p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">Actions</p>
                  <p className="mt-2 text-sm leading-6 text-slate-100">
                    Le surveillant transmet ici une proposition de session à l administration du centre.
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={handleCreateProposal}
                      disabled={!isProposalReady}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Envoyer pour validation admin
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProposalModal(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      <Clock3 className="h-4 w-4" />
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

export default SurveillantsPage;
