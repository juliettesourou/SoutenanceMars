export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  // TODO: brancher au backend réel
  return Promise.resolve([]);
}
