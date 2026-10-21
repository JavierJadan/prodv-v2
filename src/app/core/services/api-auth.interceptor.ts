import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiTokenService } from './api-token.service';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable()
export class ApiAuthInterceptor implements HttpInterceptor {
  constructor(private tokens: ApiTokenService, private auth: FirebaseAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith(environment.apiBaseUrl)) { return next.handle(request); }
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (environment.apiAuthMode === 'public') {
      return next.handle(request.clone({ setHeaders: headers }));
    }
    if (environment.apiAuthMode === 'firebase') {
      return from(this.auth.getIdToken()).pipe(switchMap(token => {
        if (token) { headers.Authorization = `Bearer ${token}`; }
        return next.handle(request.clone({ setHeaders: headers }));
      }));
    }
    // El token integrado permite consultar datos públicos desde una instalación nueva.
    // El valor local solo se usa cuando todavía no se ha configurado uno en el ambiente.
    const token = environment.apiReadToken || this.tokens.get();
    if (token) { headers.Authorization = `Bearer ${token}`; }
    return next.handle(request.clone({ setHeaders: headers }));
  }
}
