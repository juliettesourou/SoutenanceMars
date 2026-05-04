export interface TeacherSession {
  id: string;
  course: string;
  classLabel: string;
  room: string;
  time: string;
  dateLabel: string;
  attendanceStatus: 'A faire' | 'En cours' | 'Validee';
  attendanceRate: number;
}

export type AttendanceMark = 'Present' | 'Absent' | 'Retard';

export interface TeacherAttendanceStudent {
  id: string;
  name: string;
  matricule: string;
  guardianName: string;
  status: AttendanceMark;
}

export interface TeacherEvaluation {
  id: string;
  title: string;
  classLabel: string;
  room: string;
  dueDate: string;
  status: 'Brouillon' | 'Notes saisies' | 'Transmise au service examens' | 'Validee';
  average: string;
  maxScore: number;
  sessionId: string;
}

export interface TeacherGradeStudent {
  id: string;
  name: string;
  matricule: string;
  score: string;
  observation: string;
}

export interface TeacherClass {
  id: string;
  label: string;
  students: number;
  repeatedAbsences: number;
  atRiskStudents: string[];
  delegate: string;
}

export interface TeacherNotification {
  id: string;
  title: string;
  detail: string;
  type: 'Urgent' | 'Info' | 'Suivi';
  time: string;
}

export interface TeacherMessage {
  id: string;
  sender: string;
  role: string;
  subject: string;
  preview: string;
  channel: 'Parent' | 'Administration';
  unread: boolean;
}

export const TEACHER_MESSAGES_STORAGE_KEY = 'enangnon_teacher_messages';
export const TEACHER_SESSIONS_STORAGE_KEY = 'enangnon_teacher_sessions';
export const TEACHER_ATTENDANCE_STORAGE_KEY = 'enangnon_teacher_attendance';
export const TEACHER_EVALUATIONS_STORAGE_KEY = 'enangnon_teacher_evaluations';
export const TEACHER_GRADES_STORAGE_KEY = 'enangnon_teacher_grades';

export const teacherProfile = {
  name: 'Mme Ahlonsou',
  speciality: 'Base de donnees et algorithmique',
  nextCourse: 'Base de donnees - Licence 3 a 13:30',
};

export const teacherSessions: TeacherSession[] = [
  {
    id: 'session-1',
    course: 'Base de donnees',
    classLabel: 'Licence 3 Informatique',
    room: 'Salle A4',
    time: '08:00 - 10:00',
    dateLabel: '23 avril 2026',
    attendanceStatus: 'Validee',
    attendanceRate: 94,
  },
  {
    id: 'session-2',
    course: 'Algorithmique',
    classLabel: 'Licence 2 Informatique',
    room: 'Salle A2',
    time: '10:30 - 12:30',
    dateLabel: '23 avril 2026',
    attendanceStatus: 'En cours',
    attendanceRate: 88,
  },
  {
    id: 'session-3',
    course: 'Projet tutoré',
    classLabel: 'Licence 3 Informatique',
    room: 'Laboratoire 1',
    time: '13:30 - 15:30',
    dateLabel: '23 avril 2026',
    attendanceStatus: 'A faire',
    attendanceRate: 0,
  },
];

export const teacherAttendanceSheets: Record<string, TeacherAttendanceStudent[]> = {
  'session-1': [
    { id: 'l3-1', name: 'Marie Sossa', matricule: 'L3INF001', guardianName: 'Parent de Marie Sossa', status: 'Present' },
    { id: 'l3-2', name: 'Cedric Agossou', matricule: 'L3INF004', guardianName: 'Parent de Cedric Agossou', status: 'Present' },
    { id: 'l3-3', name: 'Nadine Houngbe', matricule: 'L3INF007', guardianName: 'Parent de Nadine Houngbe', status: 'Retard' },
    { id: 'l3-4', name: 'Junior Dossou', matricule: 'L3INF010', guardianName: 'Parent de Junior Dossou', status: 'Present' },
    { id: 'l3-5', name: 'Estelle Kiki', matricule: 'L3INF013', guardianName: 'Parent de Estelle Kiki', status: 'Absent' },
  ],
  'session-2': [
    { id: 'l2-1', name: 'Arielle Dossou', matricule: 'L2INF002', guardianName: 'Parent de Arielle Dossou', status: 'Present' },
    { id: 'l2-2', name: 'Sael Kouassi', matricule: 'L2INF005', guardianName: 'Parent de Sael Kouassi', status: 'Absent' },
    { id: 'l2-3', name: 'Prince Hounkpe', matricule: 'L2INF008', guardianName: 'Parent de Prince Hounkpe', status: 'Present' },
    { id: 'l2-4', name: 'Joelle Adjaho', matricule: 'L2INF011', guardianName: 'Parent de Joelle Adjaho', status: 'Retard' },
    { id: 'l2-5', name: 'Brice Codjia', matricule: 'L2INF014', guardianName: 'Parent de Brice Codjia', status: 'Present' },
    { id: 'l2-6', name: 'Clarisse Vigninou', matricule: 'L2INF017', guardianName: 'Parent de Clarisse Vigninou', status: 'Present' },
  ],
  'session-3': [
    { id: 'pt-1', name: 'Kevin Agbidinoukoun', matricule: 'L3INF003', guardianName: 'Parent de Kevin Agbidinoukoun', status: 'Present' },
    { id: 'pt-2', name: 'Mireille Ahouansou', matricule: 'L3INF006', guardianName: 'Parent de Mireille Ahouansou', status: 'Present' },
    { id: 'pt-3', name: 'Oscar Houndegla', matricule: 'L3INF009', guardianName: 'Parent de Oscar Houndegla', status: 'Present' },
    { id: 'pt-4', name: 'Judicael Kassa', matricule: 'L3INF012', guardianName: 'Parent de Judicael Kassa', status: 'Present' },
  ],
};

export const teacherEvaluations: TeacherEvaluation[] = [
  {
    id: 'eval-1',
    title: 'Interrogation SQL',
    classLabel: 'Licence 3 Informatique',
    room: 'Salle A4',
    dueDate: '24 avril 2026',
    status: 'Notes saisies',
    average: '12.8 / 20',
    maxScore: 20,
    sessionId: 'session-1',
  },
  {
    id: 'eval-2',
    title: 'Controle continu Algorithmique',
    classLabel: 'Licence 2 Informatique',
    room: 'Salle A2',
    dueDate: '26 avril 2026',
    status: 'Transmise au service examens',
    average: '11.4 / 20',
    maxScore: 20,
    sessionId: 'session-2',
  },
  {
    id: 'eval-3',
    title: 'Evaluation finale Base de donnees',
    classLabel: 'Licence 3 Informatique',
    room: 'Laboratoire 1',
    dueDate: '30 avril 2026',
    status: 'Brouillon',
    average: 'En attente',
    maxScore: 20,
    sessionId: 'session-3',
  },
];

export const teacherEvaluationGrades: Record<string, TeacherGradeStudent[]> = {
  'eval-1': [
    { id: 'l3-1', name: 'Marie Sossa', matricule: 'L3INF001', score: '15', observation: 'Bonne maitrise des jointures.' },
    { id: 'l3-2', name: 'Cedric Agossou', matricule: 'L3INF004', score: '13', observation: 'Requetes correctes, optimisation a revoir.' },
    { id: 'l3-3', name: 'Nadine Houngbe', matricule: 'L3INF007', score: '11', observation: 'Progression stable.' },
    { id: 'l3-4', name: 'Junior Dossou', matricule: 'L3INF010', score: '14', observation: 'Travail regulier.' },
    { id: 'l3-5', name: 'Estelle Kiki', matricule: 'L3INF013', score: '11', observation: 'Absence a justifier avant validation finale.' },
  ],
  'eval-2': [
    { id: 'l2-1', name: 'Arielle Dossou', matricule: 'L2INF002', score: '16', observation: 'Tres bonne logique.' },
    { id: 'l2-2', name: 'Sael Kouassi', matricule: 'L2INF005', score: '09', observation: 'Manque de rigueur dans les traces.' },
    { id: 'l2-3', name: 'Prince Hounkpe', matricule: 'L2INF008', score: '12', observation: 'Bases acquises.' },
    { id: 'l2-4', name: 'Joelle Adjaho', matricule: 'L2INF011', score: '10', observation: 'Participation correcte.' },
    { id: 'l2-5', name: 'Brice Codjia', matricule: 'L2INF014', score: '11', observation: 'Ensemble satisfaisant.' },
    { id: 'l2-6', name: 'Clarisse Vigninou', matricule: 'L2INF017', score: '10.4', observation: 'Peut mieux faire sur les algorithmes de tri.' },
  ],
  'eval-3': [
    { id: 'pt-1', name: 'Kevin Agbidinoukoun', matricule: 'L3INF003', score: '', observation: '' },
    { id: 'pt-2', name: 'Mireille Ahouansou', matricule: 'L3INF006', score: '', observation: '' },
    { id: 'pt-3', name: 'Oscar Houndegla', matricule: 'L3INF009', score: '', observation: '' },
    { id: 'pt-4', name: 'Judicael Kassa', matricule: 'L3INF012', score: '', observation: '' },
  ],
};

export const teacherClasses: TeacherClass[] = [
  {
    id: 'class-1',
    label: 'Licence 2 Informatique',
    students: 42,
    repeatedAbsences: 4,
    atRiskStudents: ['A. Hounkpe', 'J. Dossa'],
    delegate: 'Arielle Dossou',
  },
  {
    id: 'class-2',
    label: 'Licence 3 Informatique',
    students: 29,
    repeatedAbsences: 2,
    atRiskStudents: ['M. Sossa'],
    delegate: 'Kevin Agbidinoukoun',
  },
];

export const teacherNotifications: TeacherNotification[] = [
  {
    id: 'notif-1',
    title: 'Liste de presence a valider',
    detail: 'La seance de 10:30 pour Licence 2 Informatique attend votre validation.',
    type: 'Urgent',
    time: 'Il y a 12 min',
  },
  {
    id: 'notif-2',
    title: 'Service examens',
    detail: 'Les notes de Controle continu Algorithmique ont ete recues et sont en verification.',
    type: 'Suivi',
    time: 'Aujourd hui',
  },
  {
    id: 'notif-3',
    title: 'Administration',
    detail: 'Merci de signaler avant 17h les etudiants avec absences repetees cette semaine.',
    type: 'Info',
    time: 'Aujourd hui',
  },
];

export const teacherMessages: TeacherMessage[] = [
  {
    id: 'msg-1',
    sender: 'Parent de S. Kouassi',
    role: 'Tuteur',
    subject: 'Justification d absence',
    preview: 'Je vous transmets le certificat pour l absence du 22 avril.',
    channel: 'Parent',
    unread: true,
  },
  {
    id: 'msg-2',
    sender: 'Service examens',
    role: 'Administration',
    subject: 'Validation en attente',
    preview: 'Merci de verifier la grille de notes avant publication finale.',
    channel: 'Administration',
    unread: false,
  },
  {
    id: 'msg-3',
    sender: 'Responsable de classe L2 Info',
    role: 'Vie de classe',
    subject: 'Etudiants a suivre',
    preview: 'Deux cas d absences repetees ont ete remontes ce matin.',
    channel: 'Administration',
    unread: true,
  },
];
