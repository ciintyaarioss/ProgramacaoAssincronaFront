import { Component, Input, OnChanges } from '@angular/core';
import { Aluno } from '../../services/student.service';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import {  Professor } from '../../services/teacher.service';
import { Score, Subject } from '../../services/subjects.service';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnChanges {
  @Input() dataStudent: Aluno[] = [];
  @Input() dataSubject: Subject[] = [];
  @Input() dataTeacher: Professor[] = []
  @Input() dataScores: Score[] = []

  @Input() type: string = '';
  @Input() pdfMode = false;


  constructor(private studentService: StudentService, private router: Router) {

  }

  ngOnChanges() {
  console.log('Data recebida no Table:', this.dataStudent);
}

  @Input() columnsStudentsForTeacher = ["nome", "cpf", "matricula", "Detalhes"];
  @Input() columnsStudentsForAdmin = ["nome", "cpf", "matricula", "Ações"];

  @Input() columnsSubjectsForAdmin = ["nome",  "reprovados", "média"];
  @Input() columnsSubjectsForTeacher = ["nome",  "reprovados", "média"];

  @Input() columnsTeacherForStudents = ["nome",  "disciplina", "matricula"];
  @Input() columnsTeacherForAdmin = ["nome",  "disciplina", "matricula"];

  @Input() columnsScoresForPdf = [  "disciplina", "média final", "status"];

  acionarAluno(id: number) {
    this.studentService.acionarAluno(id).subscribe({
      next: (res) => {
        console.log('Aluno acionado', res);
      }
    });
  }
  goToStudent(aluno: Aluno) {
    aluno.senha = '';
    this.router.navigate(['/student-profile'], {queryParams: aluno});
  }



}
