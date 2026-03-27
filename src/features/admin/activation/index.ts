export interface ActivationRequest {
  id: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
}

export async function fetchActivationRequests(): Promise<ActivationRequest[]> {
  // TODO: brancher sur l’API réelle
  return Promise.resolve([]);
}
