import { Injectable } from '@angular/core';

interface CacheEntry<T> {
  version: number;
  storedAt: number;
  expiresAt: number;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class ApiCacheService {
  private readonly prefix = 'prodv-api-cache:';

  read<T>(key: string, version: number): { data: T; fresh: boolean } | null {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      if (!raw) { return null; }
      const entry = JSON.parse(raw) as CacheEntry<T>;
      if (entry.version !== version || !entry.data) {
        this.remove(key);
        return null;
      }
      return { data: entry.data, fresh: Date.now() < entry.expiresAt };
    } catch {
      this.remove(key);
      return null;
    }
  }

  write<T>(key: string, data: T, ttlMs: number, version: number): void {
    try {
      const now = Date.now();
      const entry: CacheEntry<T> = { version, storedAt: now, expiresAt: now + ttlMs, data };
      localStorage.setItem(this.prefix + key, JSON.stringify(entry));
    } catch {
      // La aplicación continúa aunque el navegador no permita almacenamiento.
    }
  }

  remove(key: string): void {
    try { localStorage.removeItem(this.prefix + key); } catch { /* no-op */ }
  }
}
