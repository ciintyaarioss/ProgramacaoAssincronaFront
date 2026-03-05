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


  constructor(private authService: AuthService, private studentService: StudentService, private router: Router,  private cdr: ChangeDetectorRef) {}
  studentsData : Aluno[] = [];
  studentsDataFiltered : Aluno[] = [];
  
  selectedFilter: string | null = 'matriculados';
  
  ngOnInit() {

    this.userType = this.authService.getUserType() ?? '';

    if (this.userType === 'admin') {
      this.typeTable = 'students-for-admin';
      this.studentService.listarAlunoAtivos().subscribe(res => {
        this.studentsData = res;
        this.studentsDataFiltered = res;

        this.cdr.detectChanges();
      });

    } else if (this.userType === 'professor') {
        this.studentService.listarAlunos().subscribe(res => {
        this.studentsData = res;
        this.studentsDataFiltered = res;

        this.cdr.detectChanges();
      });
      this.typeTable = 'students-for-teacher';
    } else {
      this.typeTable = 'students-for-student';
    }

    if (this.userType === 'professor') {
      this.studentService.listarAlunos().subscribe(res => {
        this.studentsData = res;
        this.studentsDataFiltered = res;
        this.cdr.detectChanges();
      });
      return;
    }
    this.selectFilter(this.selectedFilter!);

  }

  searchByName(name: string) {
    this.studentsDataFiltered = this.studentsData.filter(student => student.nome.toLowerCase().includes(name.toLowerCase()));
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
          this.studentsDataFiltered = res;
          this.cdr.detectChanges();

        });
      } else {
        this.studentService.listarAlunoDesativos().subscribe(res => {
          this.studentsData = res;
          this.studentsDataFiltered = res;

          this.cdr.detectChanges();

        });
      }
    }
  }

}

