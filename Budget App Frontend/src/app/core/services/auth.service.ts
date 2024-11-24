import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));
  private baseUrl = 'http://localhost:25565';
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(user: { firstName: string; lastName: string; email: string; password: string }): Observable<any> {
    console.log('Login URL:', this.baseUrl);
    return this.http.post(`${this.baseUrl}/user/register`, user);
  }

  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/login`, credentials);
  }

  login(token: string): void {
    localStorage.setItem('authToken', token);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }

  isLoggedInSync(): boolean {
    return this.isLoggedInSubject.value;
  }
}
