import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = 'http://localhost:3003/api/v1/users';  

  constructor(private http: HttpClient) {}
 
  register(username: string, email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/register`, { username, email, password })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'inscription :', error);
          return throwError(() => error);
        })
      );
  }

   login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

   setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

   getToken(): string | null {
    return localStorage.getItem('authToken');
  }
   isAuthenticated(): boolean {
    return !!this.getToken();
  }

   logout(): void {
    localStorage.removeItem('authToken');
  }
}
