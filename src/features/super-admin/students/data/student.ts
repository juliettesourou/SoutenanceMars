export interface Absence {
  date: string;
  course: string;
  type: 'Justifiée' | 'Injustifiée';
  reason: string;
}

export interface GradeRow {
  matiere: string;
  interrogations: [string, string, string];
  devoir: string;
  coef: string;
  moyenne: string;
}

export const absences: Absence[] = [
  {
    date: '12/03/2025',
    course: 'Développement web',
    type: 'Injustifiée',
    reason: 'Aucun',
  },
  {
    date: '14/03/2025',
    course: 'Analyse de données',
    type: 'Justifiée',
    reason: 'Maladie',
  },
];

export const grades: GradeRow[] = [
  {
    matiere: 'Développement web',
    interrogations: ['15.6', '09', '18.7'],
    devoir: '20',
    coef: '2',
    moyenne: '17',
  },
  {
    matiere: 'Intelligence Artificielle',
    interrogations: ['20.3', '12', '15.4'],
    devoir: '25',
    coef: '1',
    moyenne: '30',
  },
  {
    matiere: 'Design UX/UI',
    interrogations: ['10.5', '08', '12.0'],
    devoir: '18',
    coef: '3',
    moyenne: '20',
  },
  {
    matiere: 'Développement mobile',
    interrogations: ['18.0', '10', '20.0'],
    devoir: '22',
    coef: '2',
    moyenne: '18',
  },
  {
    matiere: 'Analyse de données',
    interrogations: ['22.1', '14', '19.4'],
    devoir: '28',
    coef: '1',
    moyenne: '25',
  },
];
