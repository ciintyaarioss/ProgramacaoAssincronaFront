import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students {

  studentsData = [
    { id: 1, nome: 'Alice', cpf: '60206662807', matricula: '2021001' },
    { id: 2, nome: 'Bob', cpf: '12345678901', matricula: '2021002' },
    { id: 3, nome: 'Charlie', cpf: '98765432109', matricula: '2021003' },
  ];

  selectedFilter: string | null = null;

  constructor(private router: Router) {}
  goToStudent(id: number) {
    this.router.navigate(['/student-profile', id]);
  }

  selectFilter(filter: string) {
      this.selectedFilter = filter;   
  }

}

