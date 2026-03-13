import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from '../../services/auth.service';
import { Activity, Score, Subject, SubjectService } from '../../services/subjects.service';
import { Observation, ObservationService } from '../../services/observation.service';

@Component({
  selector: 'app-my-profile',
  standalone: false,
  templateUrl: './my-profile.html',
  styleUrl: './my-profile.css',
})
export class MyProfile {

  
  infos = [
    'Nome: Matheus Ueno',
    'CPF: 602.066.628-07',
    'Matrícula: 2021001',
  ]

  userType: string = '';

  scoreSelected: Score ={ disciplina: 'Matemática', media: 8.5, status: false }

  subjects: Score[] = []
  observationsList: Observation[] = [];

  scoresData: Activity[] = [];
  scoresDataFiltered: Activity[] = [];
  scoresDataForPdf: Score[] = [
  ];

  showChangePasswordModal: boolean = false;
  isChangingPassword: boolean = false;
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

  openChangePasswordModal() {
    this.showChangePasswordModal = true;
  }

  onChangePasswordModalClose() {
    this.showChangePasswordModal = false;
  }

  onChangePasswordConfirm(data: { currentPassword: string, newPassword: string }) {
    const userData = this.authService.getUserData();
    const userType = this.authService.getUserType() ?? '';
    this.isChangingPassword = true;
    this.authService.updatePassword({
      cpf: userData.cpf,
      password: data.currentPassword,
      newPassword: data.newPassword,
      user_type: userType
    }).subscribe({
      next: () => {
        this.isChangingPassword = false;
        this.showChangePasswordModal = false;
        setTimeout(() => {
          this.displayStatus('success', 'Senha alterada com sucesso!', 'Sua senha foi atualizada.');
          this.cdr.detectChanges();
        }, 50);
      },
      error: () => {
        this.isChangingPassword = false;
        this.showChangePasswordModal = false;
        setTimeout(() => {
          this.displayStatus('error', 'Não foi possível alterar a senha.', 'Verifique sua senha atual e tente novamente.');
          this.cdr.detectChanges();
        }, 50);
      }
    });
  }

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  selectedFilter: string | null = 'Matemática';
  status: string = 'Sim';
  media: number = 0;
  isLoading: boolean = false;
  private pendingRequests: number = 0;

  private startRequest() {
    this.pendingRequests++;
    this.isLoading = true;
  }

  private finishRequest() {
    this.pendingRequests--;
    if (this.pendingRequests <= 0) {
      this.pendingRequests = 0;
      this.isLoading = false;
      setTimeout(() => this.cdr.detectChanges(), 30);
    }
  }
  

  selectFilter(filter: Score) {
      this.selectedFilter = filter.disciplina;
      this.status = filter.status ? 'Sim' : 'Não';
      this.media = filter.media;

      this.scoresDataFiltered = this.scoresData.filter(activity => activity.disciplina === filter.disciplina);
  }
  constructor(private authService: AuthService, private subjectService: SubjectService, private cdr: ChangeDetectorRef, private observationService: ObservationService) {}
  ngOnInit() {
    this.userType = this.authService.getUserType() ?? '';
    const userData = this.authService.getUserData();
    if (userData) {
      this.infos = [
        `Nome: ${userData.nome}`,
        `CPF: ${userData.cpf}`,
        `Matrícula: ${userData.matricula}`,
      ];
    }
    if(this.userType==='professor') {
      this.infos = [
        `Nome: ${userData.nome}`,
        `CPF: ${userData.cpf}`,
        `Disciplina: ${userData.disciplina.nome}`,
      ]

    }

    this.startRequest();
    this.subjectService.listarNotas(userData.id).subscribe({
      next: res => {
        this.subjects = res;
        this.selectedFilter = this.subjects.length > 0 ? this.subjects[0].disciplina : null;
        this.selectFilter(this.subjects[0]);
        this.media = this.subjects.length > 0 ? this.subjects[0].media : 0;
        this.status = this.subjects.length > 0 ? (this.subjects[0].status ? 'Sim' : 'Não') : 'Não';
        this.scoresDataFiltered = this.scoresData.filter(activity => activity.disciplina === this.selectedFilter);
        this.finishRequest();
      },
      error: () => this.finishRequest()
    });

    this.startRequest();
    this.subjectService.listarAtividades(userData.id).subscribe({
      next: res => {
        this.scoresData = res;
        this.finishRequest();
      },
      error: () => this.finishRequest()
    });

    this.startRequest();
    this.subjectService.listarNotas(userData.id).subscribe({
      next: res => {
        this.scoresDataForPdf = res;
        this.finishRequest();
      },
      error: () => this.finishRequest()
    });

    this.startRequest();
    this.observationService.listarObservacoesPorProfessor(userData.id).subscribe({
      next: res => {
        this.observationsList = res;
        this.finishRequest();
      },
      error: () => this.finishRequest()
    });

  }
  gerarPdf() {
    setTimeout(() => {
    
      html2canvas(this.pdfContent.nativeElement, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true
      }).then(canvas => {
      
        if (!canvas.width || !canvas.height) {
          throw new Error('Canvas vazio');
        }
      
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
      
        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * pageWidth) / canvas.width;
      
        pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, imgHeight);
        pdf.save('relatorio.pdf');
      
      }).catch(err => {
        console.error('Erro ao gerar PDF:', err);
      });
    
    }, 100);
  }


}
