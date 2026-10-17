export const environment = {
  production: true,
  // Mantiene el mock hasta conectar la API real.
  sportsDataUrl: 'assets/mocks/app-data.json',
  apiCacheTtlMs: 5 * 60 * 1000,
  apiCacheVersion: 1
};
