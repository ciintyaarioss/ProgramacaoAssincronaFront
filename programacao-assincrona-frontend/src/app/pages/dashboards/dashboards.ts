import { Component } from '@angular/core';
import { Aluno } from '../../services/student.service';

@Component({
  selector: 'app-dashboards',
  standalone: false,
  templateUrl: './dashboards.html',
  styleUrl: './dashboards.css',
})
export class Dashboards {
  studentsData: Aluno[] = [

  ];

  adminStudentsData : Aluno[] = [

  ];

}
