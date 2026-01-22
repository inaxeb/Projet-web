import { Injectable, computed, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { User, UserRole } from '../models/user';
import { environment } from '../../../environments/environment';
import { Observable, tap, map } from 'rxjs';

type JwtPayload = {
  sub?: string;
  email?: string;
  pseudo?: string;
  role?: UserRole;
  exp?: number;
};

const TOKEN_KEY = 'token';

type LoginResponse = {
  access_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

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

  login(credentials: any): Observable<void> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => this.setToken(res.access_token)),
      map(() => void 0)
    );
  }

  register(payload: any): Observable<void> {

    const body = {
      username: payload.pseudo,
      email: payload.email,
      password: payload.password
    };
    return this.http.post<void>(`${this.apiUrl}/register`, body);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this._token.set(null);
    this.router.navigate(['/login']);
  }
}
