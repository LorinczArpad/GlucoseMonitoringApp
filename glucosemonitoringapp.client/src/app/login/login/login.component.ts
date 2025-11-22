import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/authentication/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Or use Tailwind directly in HTML
})
export class LoginComponent {
  loginForm: FormGroup;
  value!: string;
  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          if (isPlatformBrowser(this.platformId)) {
            if (response !== 'Invalid username or password.') {
              localStorage.setItem('token', JSON.stringify(response));

              this.router.navigate(['patient-selector']);
            } else {
              this.messageService.add({
                severity: 'warn',
                summary: 'Hiba',
                detail: 'Hibás jelszó vagy felhasználónév!',
              });
            }
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Login request failed.',
          });
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid.');
    }
  }
  onForgotPassword() {
    this.router.navigate(['forgot-password']);
  }
  // Helper to quickly access form controls in the template
  get f() {
    return this.loginForm.controls;
  }
}
