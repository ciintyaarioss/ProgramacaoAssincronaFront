import { Component } from '@angular/core';
import { Observation } from '../../models/observation.model';

@Component({
  selector: 'app-observations',
  standalone: false,
  templateUrl: './observations.html',
  styleUrl: './observations.css',
})
export class Observations {
  observationsList: Observation[] = [];

  userType: 'admin' | 'student' = 'admin'; 

  constructor(/* ainda nao tem coisa pra colocar aq */) {}

  ngOnInit() {
    this.loadObservations();
  }

  loadObservations() {

    this.observationsList = [
      {
        id: 1,
        teacherName: 'Rafael Akira',
        studentName: 'Laura Melges',
        date: '31/01 - 21:50',
        message: 'Precisa melhorar a formatação do código.'
      },
      {
        id: 2,
        teacherName: 'Ana Luzia',
        studentName: 'João Silva',
        date: '01/02 - 10:00',
        message: 'Parabéns pela apresentação!'
      }
    ];
  }
}
