import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../models/user.model';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenData: AuthResponse | null = null;

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {
    this.loadStoredToken();
    this.loadUser();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.loginUrl, credentials)
      .pipe(
        tap(response => {
          this.setTokenData(response);
          this.loadUser();
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiConfig.registerUrl, userData)
      .pipe(
        tap(response => {
          this.setTokenData(response);
          this.loadUser();
        })
      );
  }

  logout(): void {
    this.tokenData = null;
    localStorage.removeItem('tokenData');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.apiConfig.authUrl);
  }

  isAuthenticated(): boolean {
    return !!this.tokenData?.token;
  }

  getToken(): string | null {
    return this.tokenData?.token || null;
  }

  getEmail(): string | null {
    return this.tokenData?.email || null;
  }

  private setTokenData(response: AuthResponse): void {
    this.tokenData = response;
    localStorage.setItem('tokenData', JSON.stringify(response));
  }

  private loadStoredToken(): void {
    const storedTokenData = localStorage.getItem('tokenData');
    if (storedTokenData) {
      try {
        this.tokenData = JSON.parse(storedTokenData);
      } catch (error) {
        console.error('Error parsing stored token data:', error);
        localStorage.removeItem('tokenData');
      }
    }
  }

  private loadUser(): void {
    if (this.isAuthenticated()) {
      this.getCurrentUser().subscribe({
        next: (user) => this.currentUserSubject.next(user),
        error: () => this.logout()
      });
    }
  }
}
