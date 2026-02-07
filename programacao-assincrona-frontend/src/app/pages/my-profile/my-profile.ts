import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  standalone: false,
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile {
  infos = [
    'Nome: Matheus Ueno',
    'CPF: 602.066.628-07',
    'Matrícula: 2021001',
    'Situação Geral: Pendente ',
  ]

  subjects = [
    { nome: 'Matemática', media: 8.5, status: 'Aprovado' },
    { nome: 'Português', media: 7.2, status: 'Aprovado' },
    { nome: 'Ciências', media: 5.9, status: 'Reprovado' },
  ]

  scoresData = [
    { id: 1, atividade: 'Matemática',notas: 8.5 },
    { id: 2, atividade: 'Português', notas: 7.2},
    { id: 3, atividade: 'Ciências', notas: 9.0},
        { id: 3, atividade: 'Ciências', notas: 9.0},
    { id: 3, atividade: 'Ciências', notas: 9.0},

  ];
  selectedFilter: string | null = null;

  selectFilter(filter: string) {
      this.selectedFilter = filter;
  }
  
    

}
