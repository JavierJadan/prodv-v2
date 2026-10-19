import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiTokenService {
  private readonly storageKey = 'prodv-api-token';

  get(): string { return localStorage.getItem(this.storageKey) || ''; }
  hasToken(): boolean { return this.get().length > 0; }
  save(token: string): void {
    const cleanToken = token.trim().replace(/^Bearer\s+/i, '');
    if (cleanToken) { localStorage.setItem(this.storageKey, cleanToken); }
  }
  clear(): void { localStorage.removeItem(this.storageKey); }
}
