import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedInSync()) {
      return true;
    } else {
      this.router.navigate(['/login']).then(() => {
        console.log('Redirected to /login');
      }).catch(err => {
        console.error('Navigation error:', err);
      });
      return false;
    }
  }
}
