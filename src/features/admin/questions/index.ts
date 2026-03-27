export interface Question {
  id: string;
  label: string;
  type: 'text' | 'choice' | 'boolean';
}

export async function fetchQuestions(): Promise<Question[]> {
  // TODO: relier au backend
  return Promise.resolve([]);
}
