import { Injectable, computed } from '@angular/core';
import { persistedSignal } from '../utils/persisted-signal';
import { LoginProvider, Session } from '../models/session.model';
import { DEMO_CREDENTIALS } from '../../../mocks/auth.mock';

/**
 * Mock authentication. The real version will call POST /api/v1/auth/login
 * on finapp-api and keep the JWT; for now any valid email and password works.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly session = persistedSignal<Session | null>('session', null);

  readonly isLoggedIn = computed(() => this.session() !== null);
  readonly currentSession = this.session.asReadonly();

  login(email: string, password: string): boolean {
    const isValid = /\S+@\S+\.\S+/.test(email) && password.length >= 6;
    if (isValid) {
      this.startSession(email, 'email');
    }
    return isValid;
  }

  loginWith(provider: Exclude<LoginProvider, 'email'>): void {
    this.startSession(DEMO_CREDENTIALS.email, provider);
  }

  logout(): void {
    this.session.set(null);
  }

  private startSession(email: string, provider: LoginProvider): void {
    this.session.set({ email, provider, startedAt: new Date().toISOString() });
  }
}
