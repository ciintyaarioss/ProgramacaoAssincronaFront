import { Component } from '@angular/core';

@Component({
  selector: 'app-teachers',
  standalone: false,
  templateUrl: './teachers.html',
  styleUrl: './teachers.css',
})
export class Teachers {
  teachersData = [
    { id: 1, nome: 'Alice', disciplina: 'Matemática', matricula: '2021001' },
    { id: 2, nome: 'Bob', disciplina: 'História', matricula: '2021002' },
    { id: 3, nome: 'Charlie', disciplina: 'Ciências', matricula: '2021003' },
  ];
}
