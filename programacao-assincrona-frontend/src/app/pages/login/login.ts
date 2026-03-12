import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage = '';
  cpfRaw = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      cpf: ['', Validators.required],
      password: ['', Validators.required],
      user_type: ['aluno', Validators.required]
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  goToRegister() {
    this.router.navigate(['/matricula']);
  }

  clearError() {
    this.errorMessage = '';
  }

  onCpfInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/\D/g, '').slice(0, 11);
    this.cpfRaw = raw;

    let formatted = raw;
    if (raw.length > 9) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`;
    } else if (raw.length > 6) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`;
    } else if (raw.length > 3) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3)}`;
    }

    input.value = formatted;
  }

  onSubmit() {
    this.errorMessage = '';

    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Login realizado', res);

        this.authService.setUserData(res);
        this.authService.setUserType(this.loginForm.value.user_type);

        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        console.error('Erro no login', err);
        
        this.errorMessage = 'Credenciais incorretas, tente novamente.';
        setTimeout(() => {
          this.cdr.detectChanges();
        });
      }
    });
  }
}
