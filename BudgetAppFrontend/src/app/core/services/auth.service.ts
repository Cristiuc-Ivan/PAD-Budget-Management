import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(token: string): void {
    localStorage.setItem('authToken', token);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }

  // Новый метод для синхронной проверки
  isLoggedInSync(): boolean {
    return this.isLoggedInSubject.value;
  }
}
