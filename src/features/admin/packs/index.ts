export interface Pack {
  id: string;
  name: string;
  price: number;
  durationMonths: number;
}

export async function fetchPacks(): Promise<Pack[]> {
  // TODO: implémenter API réelle
  return Promise.resolve([]);
}
