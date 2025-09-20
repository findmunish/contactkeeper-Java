import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Check for pre-filled data from users page
    this.checkForPrefillData();
  }

  private checkForPrefillData(): void {
    const prefillData = sessionStorage.getItem('loginPrefill');
    if (prefillData) {
      try {
        const { email, name } = JSON.parse(prefillData);
        this.loginForm.patchValue({ email });
        
        // Clear the prefill data after using it
        sessionStorage.removeItem('loginPrefill');
        
        // Show a helpful message
        console.log(`Login form pre-filled for ${name} (${email})`);
      } catch (error) {
        console.error('Error parsing prefill data:', error);
        sessionStorage.removeItem('loginPrefill');
      }
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.alertService.showAlert('success', 'Login successful!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.alertService.showAlert('error', 'Invalid credentials');
          this.isLoading = false;
        }
      });
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}

