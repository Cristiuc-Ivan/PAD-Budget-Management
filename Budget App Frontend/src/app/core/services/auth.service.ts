import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  private baseUrl = 'http://localhost:25565';
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Регистрация пользователя
  registerUser(user: { firstName: string; lastName: string; email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/user/register`, user).pipe(
      tap((response) => {
        this.saveToken(response.token); // Сохранить токен после успешной регистрации
      })
    );
  }

  // Авторизация пользователя
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/user/login`, credentials).pipe(
      tap((response) => {
        this.saveToken(response.token); // Сохранить токен после успешного входа
      })
    );
  }

  // Сохранение токена и обновление статуса авторизации
  private saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  // Выход пользователя
  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  // Синхронная проверка статуса авторизации
  isLoggedInSync(): boolean {
    return this.isLoggedInSubject.value;
  }

  // Получение заголовков с токеном для использования в других сервисах
  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
