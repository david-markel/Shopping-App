import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse, RegisterResponse, User } from '../models/interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  public user = this.userSubject.asObservable();

  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userSubject.next(decodedToken);
      this.isAuthenticatedSubject.next(true);
    }
  }

  register(user: any): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(`${this.apiUrl}/register`, user)
      .pipe(
        tap((response) => {
          if (response.success) {
            localStorage.setItem('token', response.message);
            const decodedToken = this.jwtHelper.decodeToken(response.message);
            this.userSubject.next(decodedToken);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  login(credentials: any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.auth) {
            localStorage.setItem('token', response.token);
            const decodedToken = this.jwtHelper.decodeToken(response.token);
            this.userSubject.next(decodedToken);
            this.isAuthenticatedSubject.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null);
  }
}
