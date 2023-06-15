import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse, RegisterResponse, User } from '../models/interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.BASE_URL;
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
      .post<RegisterResponse>(`${this.apiUrl}/api/register`, user)
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
      .post<LoginResponse>(`${this.apiUrl}/api/login`, credentials)
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

  updateAccount(user: User): Observable<RegisterResponse> {
    return this.http
      .put<RegisterResponse>(`${this.apiUrl}/api/updateUser`, user)
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

  // Delete User Method
  deleteAccount(id: string): Observable<{ success: boolean; message: string }> {
    return this.http
      .delete<{ success: boolean; message: string }>(
        `${this.apiUrl}/api/deleteUser/${id}`
      )
      .pipe(
        tap((response) => {
          if (response.success) {
            this.logout();
          }
        })
      );
  }

  validatePassword(id: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/validatePassword`, {
      id,
      password,
    });
  }
}
