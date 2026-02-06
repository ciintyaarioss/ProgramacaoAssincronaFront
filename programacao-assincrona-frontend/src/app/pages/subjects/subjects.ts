import { Component } from '@angular/core';

@Component({
  selector: 'app-subjects',
  standalone: false,
  templateUrl: './subjects.html',
  styleUrl: './subjects.css',
})
export class Subjects {
    subjectsData = [
    { id: 1, nome: 'Matemática',media: 8.5, reprovados: '2021001' },
    { id: 2, nome: 'Português', media: 7.2, reprovados: '2021002' },
    { id: 3, nome: 'Ciências', media: 9.0, reprovados: '2021003' },
  ];
}
