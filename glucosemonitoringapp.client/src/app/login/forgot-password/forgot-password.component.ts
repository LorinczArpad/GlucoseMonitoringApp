import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  resetRequested: boolean = false;

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      console.log('Password reset requested for:', this.forgotPasswordForm.value.email);
      // Here you would call your authentication service
      this.resetRequested = true;
    } else {
      this.forgotPasswordForm.markAllAsTouched();
      console.log('Form is invalid.');
    }
  }

  // Helper to quickly access form controls in the template
  get f() { return this.forgotPasswordForm.controls; }
}