import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseAuthService } from '../../core/services/firebase-auth.service';

type AuthMode = 'login' | 'register' | 'recovery';

@Component({ selector: 'app-page-auth', templateUrl: './page-auth.page.html', styleUrls: ['./page-auth.page.scss'] })
export class PageAuthPage implements OnInit, OnDestroy {
  mode: AuthMode = 'login';
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  loading = false;
  error = '';
  success = '';
  private routeSubscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location, private auth: FirebaseAuthService) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const mode = params.get('mode');
      this.mode = mode === 'register' || mode === 'recovery' ? mode : 'login';
      this.error = '';
      this.success = '';
    });
  }

  ngOnDestroy(): void { this.routeSubscription?.unsubscribe(); }

  get title(): string {
    return this.mode === 'register' ? 'Crear cuenta' : this.mode === 'recovery' ? 'Recuperar acceso' : 'Bienvenido';
  }

  changeMode(event: Event): void {
    const value = (event as CustomEvent<{ value?: string }>).detail.value;
    if (value !== 'login' && value !== 'register') { return; }
    if (this.mode === value) { return; }
    this.mode = value;
    this.error = '';
    this.success = '';
    this.showPassword = false;
    this.location.replaceState(`/auth/${value}`);
  }

  async submit(): Promise<void> {
    this.error = '';
    this.success = '';
    if (!this.email.trim()) { this.error = 'Ingresa tu correo electrónico.'; return; }
    if (this.mode !== 'recovery' && this.password.length < 6) {
      this.error = 'La contraseña debe tener al menos 6 caracteres.'; return;
    }
    if (this.mode === 'register' && this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden.'; return;
    }
    this.loading = true;
    try {
      if (this.mode === 'login') {
        await this.auth.login(this.email, this.password);
        await this.router.navigateByUrl('/page-main-menu/page-profile');
      } else if (this.mode === 'register') {
        await this.auth.register(this.name, this.email, this.password);
        this.success = 'Cuenta creada. Revisa tu correo para verificarla.';
      } else {
        await this.auth.resetPassword(this.email);
        this.success = 'Te enviamos un enlace para restablecer tu contraseña.';
      }
    } catch (error: unknown) {
      this.error = this.authErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  private authErrorMessage(error: unknown): string {
    const code = typeof error === 'object' && error && 'code' in error ? String((error as { code: unknown }).code) : '';
    const messages: Record<string, string> = {
      'auth/email-already-in-use': 'Este correo ya tiene una cuenta.',
      'auth/invalid-email': 'El correo no tiene un formato válido.',
      'auth/user-not-found': 'No existe una cuenta con este correo.',
      'auth/wrong-password': 'La contraseña es incorrecta.',
      'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos.',
      'auth/network-request-failed': 'No se pudo conectar. Revisa tu conexión.',
      'auth/weak-password': 'La contraseña es demasiado débil.'
    };
    return messages[code] || 'No pudimos completar la operación. Intenta nuevamente.';
  }
}
