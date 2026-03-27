export interface AttemptLog {
  id: string;
  userId: string;
  status: 'success' | 'failure';
  at: string;
}

export async function fetchAttemptLogs(): Promise<AttemptLog[]> {
  // TODO: connecter à la source de données
  return Promise.resolve([]);
}
