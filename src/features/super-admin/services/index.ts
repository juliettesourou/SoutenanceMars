export interface SuperAdminSummary {
  totalSites: number;
  totalStudents: number;
  totalTeachers: number;
}

export async function fetchSuperAdminSummary(): Promise<SuperAdminSummary> {
  // TODO: remplacer par l'appel API réel
  return Promise.resolve({ totalSites: 0, totalStudents: 0, totalTeachers: 0 });
}

export async function fetchSuperAdminNotifications(): Promise<string[]> {
  // TODO: remplacer par l'appel API réel
  return Promise.resolve([]);
}
