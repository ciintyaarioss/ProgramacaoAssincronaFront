import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  @Input() data: any[] = [];
  @Input() type: string = '';

  @Input() columnsStudentsForTeacher = ["nome", "cpf", "matricula", "Detalhes"];
  @Input() columnsStudentsForAdmin = ["nome", "cpf", "matricula", "Ações"];

  @Input() columnsSubjectsForAdmin = ["nome",  "reprovados", "média"];
  @Input() columnsSubjectsForTeacher = ["nome",  "reprovados", "média"];

  @Input() columnsTeacherForStudents = ["nome",  "disciplina", "matricula"];
  @Input() columnsTeacherForAdmin = ["nome",  "disciplina", "matricula"];
  



}
