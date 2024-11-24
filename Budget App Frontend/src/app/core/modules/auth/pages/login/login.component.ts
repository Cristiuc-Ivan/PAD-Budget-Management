import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    const credentials = this.loginForm.value;

    this.authService.loginUser(credentials).subscribe({
      next: (response) => {
        const token = response?.token;
        if (token) {
          this.authService.login(token);
          console.log('Login successful. Token saved.');

          this.router.navigate(['/portfolio']).then(() => {
            console.log('Navigation to /portfolio was successful!');
          }).catch((err) => {
            console.error('Navigation error:', err);
          });
        } else {
          throw new Error('Token not found in response.');
        }
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
        this.isSubmitting = false;
      }
    });
  }
}
