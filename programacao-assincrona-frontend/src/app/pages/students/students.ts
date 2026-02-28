import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Aluno, StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {

  userType: string = '';
  typeTable: string = '';


  constructor(private authService: AuthService, private studentService: StudentService) {

  }
  studentsData : Aluno[] = [

  ];


  
  selectedFilter: string | null = 'matriculados';
  ngOnInit() {
  this.userType = this.authService.getUserType();

  if (this.userType === 'admin') {
    this.typeTable = 'students-for-admin';
  } else if (this.userType === 'professor') {
    this.typeTable = 'students-for-teacher';
  } else {
    this.typeTable = 'students-for-student';
  }
  if (this.userType === 'professor') {
      this.studentService.listarAlunos().subscribe({
    next: (res) => {
      this.studentsData = res;
      console.log('Alunos listados', res);
    }
  });


  }
  if (this.userType === 'admin') {
      this.studentService.listarAlunoAtivos().subscribe({
    next: (res) => {
      this.studentsData = res;   
      console.log('Alunos listados', res);}
    })


  }
}
  selectFilter(filter: string) {
      this.selectedFilter = filter;
      if (filter === 'matriculados') {
        this.studentService.listarAlunoAtivos().subscribe({
          next: (res) => {
            this.studentsData = res;
            console.log('Alunos listados', res);
          }
        }); 
    }else{
      this.studentService.listarAlunoDesativos().subscribe({
        next: (res) => {
          this.studentsData = res;  
    }  });
  }

}

}

