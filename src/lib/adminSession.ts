export interface AdminSession {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function getAdminSession(): AdminSession | null {
  // TODO: remplacer par une vraie persistance (cookies/localStorage/API)
  return null;
}
