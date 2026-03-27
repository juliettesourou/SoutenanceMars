export type CompositionLanguage = 'fr' | 'en' | 'ar' | 'pt';

export async function fetchCompositionLanguages(): Promise<CompositionLanguage[]> {
  // TODO: implémentation API
  return Promise.resolve(['fr']);
}
