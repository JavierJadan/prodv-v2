import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FirebaseAuthService {
  private readonly auth: firebase.auth.Auth;
  private readonly userSubject = new BehaviorSubject<firebase.User | null>(null);
  private readonly readySubject = new BehaviorSubject<boolean>(false);

  readonly user$: Observable<firebase.User | null> = this.userSubject.asObservable();
  readonly ready$: Observable<boolean> = this.readySubject.asObservable();

  constructor(private zone: NgZone) {
    const app = firebase.apps.length
      ? firebase.app()
      : firebase.initializeApp(environment.firebaseConfig);
    this.auth = app.auth();
    void this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    this.auth.onAuthStateChanged(user => this.zone.run(() => {
      this.userSubject.next(user);
      this.readySubject.next(true);
    }));
  }

  get currentUser(): firebase.User | null { return this.auth.currentUser; }

  async login(email: string, password: string): Promise<firebase.User> {
    const credential = await this.auth.signInWithEmailAndPassword(email.trim(), password);
    if (!credential.user) { throw new Error('No se pudo obtener el usuario autenticado.'); }
    return credential.user;
  }

  async register(name: string, email: string, password: string): Promise<firebase.User> {
    const credential = await this.auth.createUserWithEmailAndPassword(email.trim(), password);
    if (!credential.user) { throw new Error('No se pudo crear el usuario.'); }
    const displayName = name.trim();
    if (displayName) { await credential.user.updateProfile({ displayName }); }
    await credential.user.sendEmailVerification();
    await credential.user.reload();
    this.userSubject.next(this.auth.currentUser);
    return credential.user;
  }

  resetPassword(email: string): Promise<void> {
    return this.auth.sendPasswordResetEmail(email.trim());
  }

  async resendVerification(): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) { throw new Error('Debes iniciar sesión.'); }
    await user.sendEmailVerification();
  }

  logout(): Promise<void> { return this.auth.signOut(); }

  async getIdToken(forceRefresh = false): Promise<string | null> {
    return this.auth.currentUser?.getIdToken(forceRefresh) ?? null;
  }
}
