import { Injectable, computed, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { User, UserRole } from '../models/user';

type JwtPayload = {
  sub?: string;
  email?: string;
  pseudo?: string;
  role?: UserRole;
  exp?: number;
};

const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  readonly token = this._token.asReadonly();

  readonly user = computed<User | null>(() => {
    const token = this._token();
    if (!token) return null;

    try {
      const payload = jwtDecode<JwtPayload>(token);
      if (!payload.exp || !payload.sub || !payload.email || !payload.pseudo || !payload.role) return null;

      const nowSeconds = Math.floor(Date.now() / 1000);
      if (payload.exp <= nowSeconds) return null;

      return {
        id: payload.sub,
        email: payload.email,
        pseudo: payload.pseudo,
        role: payload.role,
      };
    } catch {
      return null;
    }
  });

  readonly isAuthenticated = computed(() => this.user() !== null);
  readonly isAdmin = computed(() => this.user()?.role === 'ADMIN');

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this._token.set(token);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this._token.set(null);
  }
}
