export type SiteStatus = 'Actif' | 'Maintenance' | 'A renforcer';

export type Site = {
  id: string;
  name: string;
  code: string;
  city: string;
  district: string;
  address: string;
  manager: string;
  phone: string;
  email: string;
  status: SiteStatus;
  students: number;
  teachers: number;
  programs: number;
  rooms: number;
  occupancyRate: number;
  capacity: number;
  completionRate: number;
  satisfactionRate: number;
  alerts: number;
  createdAt: string;
  updatedAt: string;
  highlights: string[];
};

export const sites: Site[] = [
  {
    id: 'site-cotonou',
    name: 'Centre Cotonou Littoral',
    code: 'CTL-01',
    city: 'Cotonou',
    district: 'Littoral',
    address: 'Akpakpa, boulevard de la Marina',
    manager: 'Nadine HOUNTONDJI',
    phone: '+229 01 60 20 14 10',
    email: 'cotonou@enangnon.bj',
    status: 'Actif',
    students: 482,
    teachers: 31,
    programs: 9,
    rooms: 24,
    occupancyRate: 88,
    capacity: 550,
    completionRate: 96,
    satisfactionRate: 93,
    alerts: 1,
    createdAt: '12 janvier 2022',
    updatedAt: '18 mars 2026',
    highlights: ['Centre principal', 'Admissions stables', 'Equipe administrative complete'],
  },
  {
    id: 'site-abomey-calavi',
    name: 'Centre Abomey-Calavi',
    code: 'ABC-02',
    city: 'Abomey-Calavi',
    district: 'Atlantique',
    address: 'Zopah, route inter-etats',
    manager: 'Arnaud ADJOVI',
    phone: '+229 01 67 11 25 42',
    email: 'calavi@enangnon.bj',
    status: 'Actif',
    students: 356,
    teachers: 24,
    programs: 7,
    rooms: 18,
    occupancyRate: 79,
    capacity: 430,
    completionRate: 91,
    satisfactionRate: 90,
    alerts: 0,
    createdAt: '04 juin 2022',
    updatedAt: '22 mars 2026',
    highlights: ['Bonne progression pedagogique', 'Faible taux d alertes', 'Centre en croissance'],
  },
  {
    id: 'site-porto-novo',
    name: 'Centre Porto-Novo',
    code: 'PON-03',
    city: 'Porto-Novo',
    district: 'Oueme',
    address: 'Ouando, avenue des écoles',
    manager: 'Clarisse TOHOUENOU',
    phone: '+229 01 95 44 32 08',
    email: 'portonovo@enangnon.bj',
    status: 'A renforcer',
    students: 241,
    teachers: 17,
    programs: 5,
    rooms: 14,
    occupancyRate: 67,
    capacity: 360,
    completionRate: 82,
    satisfactionRate: 84,
    alerts: 3,
    createdAt: '16 septembre 2023',
    updatedAt: '20 mars 2026',
    highlights: ['Besoin de renfort enseignant', 'Donnees administratives a completer', 'Bon potentiel local'],
  },
  {
    id: 'site-parakou',
    name: 'Centre Parakou Nord',
    code: 'PRK-04',
    city: 'Parakou',
    district: 'Borgou',
    address: 'Quartier Albarika, axe universite',
    manager: 'Basile TCHIBOZO',
    phone: '+229 01 97 03 65 51',
    email: 'parakou@enangnon.bj',
    status: 'Actif',
    students: 298,
    teachers: 20,
    programs: 6,
    rooms: 16,
    occupancyRate: 74,
    capacity: 400,
    completionRate: 89,
    satisfactionRate: 88,
    alerts: 1,
    createdAt: '08 janvier 2024',
    updatedAt: '24 mars 2026',
    highlights: ['Bon equilibre capacite effectif', 'Zone strategique nord', 'Demandes d admission en hausse'],
  },
  {
    id: 'site-bohicon',
    name: 'Centre Bohicon Plateau',
    code: 'BHK-05',
    city: 'Bohicon',
    district: 'Zou',
    address: 'Carrefour Agbangnizoun, batiment administratif',
    manager: 'Michele DAHITO',
    phone: '+229 01 58 77 18 93',
    email: 'bohicon@enangnon.bj',
    status: 'Maintenance',
    students: 187,
    teachers: 13,
    programs: 4,
    rooms: 11,
    occupancyRate: 61,
    capacity: 300,
    completionRate: 78,
    satisfactionRate: 80,
    alerts: 4,
    createdAt: '11 mai 2024',
    updatedAt: '25 mars 2026',
    highlights: ['Travaux de salles en cours', 'Capacite a relancer', 'Priorite sur l equipement'],
  },
];
