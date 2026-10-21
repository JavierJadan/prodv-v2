export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBqDrm5rAQGo5s_TD3xlVv5C0J9zx5YzVw',
    authDomain: 'prodv-app.firebaseapp.com',
    projectId: 'prodv-app',
    storageBucket: 'prodv-app.appspot.com',
    messagingSenderId: '442737847371',
    appId: '1:442737847371:web:b21a056f2659f57280b1ce'
  },
  // No guardar tokens reales en archivos versionados. En desarrollo se admite
  // temporalmente un token local y, si la API falla, se usan los datos simulados.
  apiAuthMode: 'sanctum' as 'public' | 'sanctum' | 'firebase',
  apiBaseUrl: 'https://laravel-dashboard-prodv-production.up.railway.app/api/v2',
  apiReadToken: '',
  useMockDataOnApiError: true,
  apiCacheVersion: 2,
  catalogCacheTtlMs: 6 * 60 * 60 * 1000,
  overviewCacheTtlMs: 5 * 60 * 1000,
  matchesCacheTtlMs: 60 * 1000,
  matchCacheTtlMs: 30 * 1000
};
