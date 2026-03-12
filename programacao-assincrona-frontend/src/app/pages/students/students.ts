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
  isLoading: boolean = false;


  constructor(private authService: AuthService, private studentService: StudentService, private router: Router,  private cdr: ChangeDetectorRef) {}
  studentsData : Aluno[] = [];
  studentsDataFiltered : Aluno[] = [];
  
  selectedFilter: string | null = 'matriculados';
  
  ngOnInit() {

    this.userType = this.authService.getUserType() ?? '';

    if (this.userType === 'admin') {
      this.typeTable = 'students-for-admin';
      this.isLoading = true;
      this.studentService.listarAlunoAtivos().subscribe({
        next: res => {
          this.studentsData = res;
          this.studentsDataFiltered = res;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => { this.isLoading = false; this.cdr.detectChanges(); }
      });

    } else if (this.userType === 'professor') {
      this.typeTable = 'students-for-teacher';
      this.isLoading = true;
      this.studentService.listarAlunos().subscribe({
        next: res => {
          this.studentsData = res;
          this.studentsDataFiltered = res;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => { this.isLoading = false; this.cdr.detectChanges(); }
      });
      return;
    } else {
      this.typeTable = 'students-for-student';
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
      this.isLoading = true;
      this.cdr.detectChanges();
      if (filter === 'matriculados') {
        this.studentService.listarAlunoAtivos().subscribe({
          next: res => {
            this.studentsData = res;
            this.studentsDataFiltered = res;
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: () => { this.isLoading = false; this.cdr.detectChanges(); }
        });
      } else {
        this.studentService.listarAlunoDesativos().subscribe({
          next: res => {
            this.studentsData = res;
            this.studentsDataFiltered = res;
            this.isLoading = false;
            this.cdr.detectChanges();
          },
          error: () => { this.isLoading = false; this.cdr.detectChanges(); }
        });
      }
    }
  }

}

