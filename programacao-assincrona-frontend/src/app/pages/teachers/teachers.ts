import { ChangeDetectorRef, Component } from '@angular/core';
import { Professor, ProfessorService } from '../../services/teacher.service';
import { AuthService } from '../../services/auth.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-teachers',
  standalone: false,
  templateUrl: './teachers.html',
  styleUrl: './teachers.css',
})
export class Teachers implements OnInit {
  teachersData: Professor[] = [];
  isAdmin: boolean = false;
  showRegisterModal: boolean = false;

  constructor(
    private teacherService: ProfessorService, 
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadTeachers();
  }

  loadTeachers() {
    this.teacherService.listarProfessores().subscribe(res => {
      this.teachersData = res;
      this.cdr.detectChanges();
    });
  }

  openRegisterModal() {
    this.showRegisterModal = true;
  }

  onRegisterSuccess(data: {nome: string, cpf: string, disciplina: string}) {
    const adminId = this.authService.getUserData()?.id;
    if (!adminId) {
      alert('Erro: Admin não identificado');
      return;
    }

    this.teacherService.criarProfessor({
      nome: data.nome,
      cpf: data.cpf,
      disciplina: data.disciplina,
      adminId: adminId
    }).subscribe({
      next: () => {
        this.showRegisterModal = false;
        this.loadTeachers();
        alert('Professor cadastrado com sucesso!');
      },
      error: () => {
        alert('Erro ao cadastrar professor');
      }
    });
  }

  onModalClose() {
    this.showRegisterModal = false;
  }
}
