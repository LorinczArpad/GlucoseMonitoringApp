import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


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
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Or use Tailwind directly in HTML
})
export class LoginComponent {
  loginForm: FormGroup;
    value!: string;
  constructor(private fb: FormBuilder,public router:Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login credentials:', this.loginForm.value);
      // Implement your actual authentication logic here
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form is invalid.');
    }
  }
  onForgotPassword(){
    this.router.navigate(['forgot-password'])
  }
  // Helper to quickly access form controls in the template
  get f() { return this.loginForm.controls; }
}