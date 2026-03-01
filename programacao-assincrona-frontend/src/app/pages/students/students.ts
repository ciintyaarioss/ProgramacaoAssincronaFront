import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Aluno, StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {

  userType: string = '';
  typeTable: string = '';


  constructor(private authService: AuthService, private studentService: StudentService, private router: Router,  private cdr: ChangeDetectorRef  // 👈 injeta
) {

  }
  studentsData : Aluno[] = [];


  
  selectedFilter: string | null = 'matriculados';
  ngOnInit() {

    this.userType = this.authService.getUserType() ?? '';



    if (this.userType === 'admin') {
      this.typeTable = 'students-for-admin';
      this.studentService.listarAlunoAtivos().subscribe(res => {
        this.studentsData = res;
        this.cdr.detectChanges(); // 👈 força atualização
      });

    } else if (this.userType === 'professor') {
        this.studentService.listarAlunos().subscribe(res => {
        this.studentsData = res;
        this.cdr.detectChanges(); // 👈 força atualização
      });
      this.typeTable = 'students-for-teacher';
    } else {
      this.typeTable = 'students-for-student';
    }

    if (this.userType === 'professor') {
      this.studentService.listarAlunos().subscribe(res => {
        this.studentsData = res;
      });
      return;
    }
    this.selectFilter(this.selectedFilter!);
  }
  goToStudent(id: number) {
    this.router.navigate(['/student-profile', id]);
  }

selectFilter(filter: string) {
  this.selectedFilter = filter;


  if (this.userType === 'admin') {
    if (filter === 'matriculados') {
      this.studentService.listarAlunoAtivos().subscribe(res => {
        this.studentsData = res;
        this.cdr.detectChanges(); // 👈 força atualização

      });
    } else {
      this.studentService.listarAlunoDesativos().subscribe(res => {
        this.studentsData = res;
        this.cdr.detectChanges(); // 👈 força atualização

      });
    }
  }
}

}

