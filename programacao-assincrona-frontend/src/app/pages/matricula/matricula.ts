import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-matricula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './matricula.html',
  styleUrl: './matricula.css'
})
export class Matricula {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) {

    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmSenha: ['', Validators.required]
    });

  }

  onSubmit() {

    if (this.registerForm.invalid) return;

    if (this.registerForm.value.senha !== this.registerForm.value.confirmSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    const aluno = {
      nome: this.registerForm.value.nome,
      cpf: this.registerForm.value.cpf,
      senha: this.registerForm.value.senha,
      matricula: this.gerarMatricula()
    };
    this.studentService.criarAluno(aluno).subscribe({
      next: (res) => {
        console.log('Aluno criado', res);
        this.router.navigate(['/matricula-success']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar', err);
        alert('Erro ao realizar matrícula');
      }
    });
  }

  gerarMatricula(): string {
    return "0002-"+Math.floor(100000 + Math.random() * 900000).toString()+`${new Date().getFullYear()}${new Date().getMonth()+1}${new Date().getDate()}`;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

}
