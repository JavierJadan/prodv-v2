import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from '../../core/services/firebase-auth.service';
import { ThemeService } from '../../core/services/theme.service';

@Component({ selector: 'app-page-profile', templateUrl: './page-profile.page.html', styleUrls: ['./page-profile.page.scss'] })
export class PageProfilePage implements OnDestroy {
  dark = false;
  user: firebase.User | null = null;
  authReady = false;
  accountMessage = '';
  accountError = false;
  accountBusy = false;
  private readonly subscriptions = new Subscription();

  constructor(private auth: FirebaseAuthService, private router: Router, private theme: ThemeService) {
    this.dark = theme.isDark();
    this.subscriptions.add(auth.user$.subscribe(user => this.user = user));
    this.subscriptions.add(auth.ready$.subscribe(ready => this.authReady = ready));
  }

  ngOnDestroy(): void { this.subscriptions.unsubscribe(); }

  toggleTheme(event: Event): void {
    this.dark = Boolean((event as CustomEvent).detail?.checked);
    this.theme.setDark(this.dark);
  }

  async resendVerification(): Promise<void> {
    this.accountBusy = true;
    this.accountMessage = '';
    try {
      await this.auth.resendVerification();
      this.accountError = false;
      this.accountMessage = 'Correo de verificación enviado.';
    } catch {
      this.accountError = true;
      this.accountMessage = 'No se pudo enviar el correo. Intenta nuevamente.';
    } finally { this.accountBusy = false; }
  }

  async logout(): Promise<void> {
    this.accountBusy = true;
    try {
      await this.auth.logout();
      this.accountMessage = '';
      await this.router.navigateByUrl('/page-main-menu/page-local');
    } finally { this.accountBusy = false; }
  }
}

