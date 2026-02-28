import { Component, Input, OnChanges } from '@angular/core';
import { Aluno } from '../../services/student.service';
import { StudentService } from '../../services/student.service';
@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table implements OnChanges {
  @Input() dataStudent: Aluno[] = [];
  @Input() dataSubject: any[] = [];
  @Input() dataTeacher: any[] = []
  @Input() dataScores: any[] = []

  @Input() type: string = '';
  @Input() pdfMode = false;


  constructor(private studentService: StudentService) {

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
        this.studentService.listarAlunoAtivos().subscribe({
          next: (res) => {
            this.dataStudent = res;   
            console.log('Alunos listados', res);
          }
        });
      }
    });
  }



}
