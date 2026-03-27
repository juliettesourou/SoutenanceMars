// Centralise les variables d'environnement accessibles côté client.
// Utilise import.meta.env (Vite) pour injecter des valeurs au build.

export type AppEnv = {
  API_BASE_URL: string
  PUBLIC_API_BASE_URL: string
}

const env: AppEnv = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? '',
  PUBLIC_API_BASE_URL: import.meta.env.VITE_PUBLIC_API_BASE_URL ?? '',
}

export default env
