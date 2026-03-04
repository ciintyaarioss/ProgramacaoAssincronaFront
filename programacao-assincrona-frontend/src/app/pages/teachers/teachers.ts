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
  teachersDataFiltered: Professor[] = [];
  isAdmin: boolean = false;
  showRegisterModal: boolean = false;

  showStatus: boolean = false;
  statusType: 'success' | 'error' = 'success';
  statusTitle: string = '';
  statusDescription: string = '';

  displayStatus(type: 'success' | 'error', title: string, description: string) {
    this.statusType = type;
    this.statusTitle = title;
    this.statusDescription = description;
    this.showStatus = true;
  }

  onStatusClose() {
    this.showStatus = false;
  }

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
      this.teachersDataFiltered = res;
      this.cdr.detectChanges();
    });
  }

  openRegisterModal() {
    this.showRegisterModal = true;
  }

  onRegisterSuccess(data: {nome: string, cpf: string, disciplina: string}) {
    this.teacherService.criarProfessor({
      nome: data.nome,
      cpf: data.cpf,
      disciplina: data.disciplina
    }).subscribe({
      next: () => {
        this.showRegisterModal = false;
        this.loadTeachers();
        this.displayStatus('success', 'Cadastro realizado com sucesso!', 'Informe as credenciais de acesso ao seu professor para o primeiro login');
      },
      error: () => {
        this.showRegisterModal = false;
        this.displayStatus('error', 'Não foi possível completar o cadastro.', 'Tente novamente mais tarde!');
      }
    });
  }

  searchByName(name: string) {
    this.teachersDataFiltered = this.teachersData.filter(teacher => teacher.nome.toLowerCase().includes(name.toLowerCase()));
  }

  onModalClose() {
    this.showRegisterModal = false;
  }
}
