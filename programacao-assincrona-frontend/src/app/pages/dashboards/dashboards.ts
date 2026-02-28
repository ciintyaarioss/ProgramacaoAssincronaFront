import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboards',
  standalone: false,
  templateUrl: './dashboards.html',
  styleUrl: './dashboards.css',
})
export class Dashboards {
  studentsData = [
    { Aluno: 'Rafael Roschel', Nota: 6.9, Situação: 'Pendente' },
    { Aluno: 'Persona', Nota: 8.9, Situação: 'Pendente' },
    { Aluno: 'Melges', Nota: 1.5, Situação: 'Pendente' },
    { Aluno: 'Rafael Akira', Nota: 5.6, Situação: 'Pendente' },
    { Aluno: 'Breno Souza', Nota: 7.8, Situação: 'Pendente' }
  ];

  adminStudentsData = [
    { Aluno: 'Rafael Roschel', Matrícula: 123456, Observações: 9 },
    { Aluno: 'Persona', Matrícula: 123456, Observações: 8 },
    { Aluno: 'Melges', Matrícula: 11234565, Observações: 6 },
    { Aluno: 'Rafael Akira', Matrícula: 123456, Observações: 4 },
    { Aluno: 'Breno Souza', Matrícula: 123456, Observações: 2 },
    { Aluno: 'Rafael Akira', Matrícula: 123456, Observações: 4 },
    { Aluno: 'Breno Souza', Matrícula: 123456, Observações: 2 },
    { Aluno: 'Rafael Akira', Matrícula: 123456, Observações: 4 },
    { Aluno: 'Breno Souza', Matrícula: 123456, Observações: 2 }
  ];

}
