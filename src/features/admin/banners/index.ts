export interface Banner {
  id: string;
  title: string;
  active: boolean;
}

export async function fetchBanners(): Promise<Banner[]> {
  // TODO: implémenter l'appel API réel
  return Promise.resolve([]);
}
