import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly key = 'prodv-theme';
  private readonly darkSubject = new BehaviorSubject<boolean>(this.readInitialValue());
  readonly dark$ = this.darkSubject.asObservable();

  constructor() { this.apply(this.darkSubject.value); }
  isDark(): boolean { return this.darkSubject.value; }

  setDark(enabled: boolean): void {
    this.apply(enabled);
    this.darkSubject.next(enabled);
    localStorage.setItem(this.key, enabled ? 'dark' : 'light');
  }

  private apply(enabled: boolean): void {
    document.body.setAttribute('color-theme', enabled ? 'dark' : 'light');
    document.documentElement.style.colorScheme = enabled ? 'dark' : 'light';
  }

  private readInitialValue(): boolean {
    const saved = localStorage.getItem(this.key);
    if (saved) { return saved === 'dark'; }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches || false;
  }
}
