export interface TrainingCenter {
  id: string;
  name: string;
  city: string;
  students: number;
}

export async function fetchTrainingCenters(): Promise<TrainingCenter[]> {
  // TODO: implémentation API
  return Promise.resolve([]);
}
