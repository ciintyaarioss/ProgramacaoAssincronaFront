import { Component } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
    this.router.navigate(['/register']);
  }

  onSubmit() {

    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Login realizado', res);
        this.authService.setUserData(res);
        const type = this.loginForm.value.user_type;

        if (type === 'admin') {
          this.router.navigate(['/admin']);
        }

        if (type === 'teacher') {
          this.router.navigate(['/teacher']);
        }

        if (type === 'student') {
          this.router.navigate(['/student']);
        }
      },
      error: (err) => {
        console.error('Erro no login', err);
        alert('CPF ou senha inválidos');
      }
    });
  }

}
