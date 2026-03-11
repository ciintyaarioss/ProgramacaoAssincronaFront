import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity, Score, Subject, SubjectService } from '../../services/subjects.service';
import { AuthService } from '../../services/auth.service';
import { Observation, ObservationService } from '../../services/observation.service';
import { Aluno, StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-profile',
  standalone: false,
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile  implements OnInit {
  infos = [
    'Nome: ',
    'CPF: ',
    'Matrícula: ',
    'Situação Geral: ',
  ]
  status: string = 'Sim';
  media: number = 0;
  userType: string = '';
  observationsList: Observation[] = [];

  subjects: Score[] = [
  ]
  scoresDataFiltered: Activity[] = []
  scoresData: Activity[] = [
  ];

  scoresDataForPdf: Score[] = [
  ];

  alunoId: number = 0;
  showObservationModal: boolean = false;
  showScoreModal: boolean = false;
  showAddScoreModal: boolean = false;
  selectedActivity: Activity | null = null;

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

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private subjectService: SubjectService,
    private cdr: ChangeDetectorRef,
    private observationService: ObservationService,
    private studentService: StudentService) {}

  goBack() {
    this.router.navigate(['/students']);
  }

  ngOnInit() {
    this.userType = this.authService.getUserType() ?? '';

    const matricula = this.route.snapshot.paramMap.get('matricula');

    if (!matricula) {
      console.error('Matrícula do aluno não encontrada');
      return;
    }

    this.studentService.getAlunoByMatricula(matricula).subscribe({
      next: (aluno: Aluno) => {
        this.alunoId = aluno.id || 0;
        this.infos = [
          `Nome: ${aluno.nome || ''}`,
          `CPF: ${aluno.cpf || ''}`,
          `Matrícula: ${aluno.matricula || ''}`,
        ];
        this.cdr.detectChanges();

        if (this.alunoId) {
          this.carregarDadosAluno(this.alunoId);
        }
      },
      error: (err) => {
        console.error('Erro ao buscar aluno:', err);
      }
    });
  }

  carregarDadosAluno(id: number) {
    this.subjectService.listarAtividades(id).subscribe(res => {
      this.scoresData = res;
      this.cdr.detectChanges();
    });

    this.subjectService.listarNotas(id).subscribe(res => {
      this.scoresDataForPdf = res;
      this.media = this.subjects.length > 0 ? this.subjects[0].media : 0;
      this.status = this.subjects.length > 0 ? (this.subjects[0].status ? 'Sim' : 'Não') : 'Não';
      this.scoresDataFiltered = this.scoresData.filter(activity => activity.disciplina === this.selectedFilter);
      this.cdr.detectChanges();
    });

      this.subjectService.listarNotas(this.alunoId).subscribe(res => {
      this.subjects = res;
      this.selectFilter(this.subjects[0]);
      this.cdr.detectChanges(); 
    
      this.selectedFilter = this.subjects.length > 0 ? this.subjects[0].disciplina : null;

      this.cdr.detectChanges();
    });

    this.carregarObservacoes(id);
  }

  carregarObservacoes(alunoId: number) {
    this.observationService.listarObservacoesPorAluno(alunoId).subscribe(res => {
      this.observationsList = res;
      this.cdr.detectChanges();
    });
  }

  openObservationModal() {
    this.showObservationModal = true;
  }

  onObservationConfirm(text: string) {
    const professorId = this.authService.getUserData()?.id;
    if (!professorId) {
      alert('Professor não identificado');
      return;
    }

    this.observationService.criarObservacao({
      text: text,
      aluno_id: this.alunoId,
      professor_id: professorId
    }).subscribe({
      next: () => {
        this.showObservationModal = false;
        this.carregarObservacoes(this.alunoId);
        this.displayStatus('success', 'Observação enviada com sucesso!', 'Peça ao seu aluno que veja a aba "Observações" no menu lateral!');
      },
      error: () => {
        this.showObservationModal = false;
        this.displayStatus('error', 'Não foi possível enviar a observação!', 'Tente novamente mais tarde!');
      }
    });
  }

  onObservationModalClose() {
    this.showObservationModal = false;
  }

  openEditScoreModal(activity: Activity) {
    this.selectedActivity = activity;
    this.showScoreModal = true;
  }

  onScoreEditConfirm(data: {titulo: string, valor: number}) {
    if (!this.selectedActivity?.id) {
      alert('ID da nota não encontrado');
      return;
    }

    this.subjectService.atualizarNota(this.selectedActivity.id, data.valor).subscribe({
      next: () => {
        this.showScoreModal = false;
        this.selectedActivity = null;
        this.carregarDadosAluno(this.alunoId);
        this.displayStatus('success', 'Nota editada com sucesso!', 'Peça ao seu aluno que veja a aba "Perfil" no menu lateral!');
      },
      error: () => {
        this.showScoreModal = false;
        this.displayStatus('error', 'Não foi possível enviar a nota!', 'Tente novamente mais tarde!');
      }
    });
  }

  onScoreModalClose() {
    this.showScoreModal = false;
    this.selectedActivity = null;
  }

  openAddScoreModal() {
    this.showAddScoreModal = true;
  }

  onAddScoreConfirm(data: {titulo: string, valor: number}) {
    this.subjectService.criarNota({
      titulo: data.titulo,
      nota: data.valor,
      aluno_id: this.alunoId
    }).subscribe({
      next: () => {
        this.showAddScoreModal = false;
        this.carregarDadosAluno(this.alunoId);
        this.displayStatus('success', 'Nota enviada com sucesso!', 'Peça ao seu aluno que veja a aba "Perfil" no menu lateral!');
      },
      error: () => {
        this.showAddScoreModal = false;
        this.displayStatus('error', 'Não foi possível enviar a nota!', 'Tente novamente mais tarde!');
      }
    });
  }

  onAddScoreModalClose() {
    this.showAddScoreModal = false;
  }

  excluirObservacao(id: number) {
    this.observationService.excluirObservacao(id).subscribe({
      next: () => {
        this.carregarObservacoes(this.alunoId);
        this.displayStatus('success', 'Observação excluída com sucesso!', '');
      },
      error: () => {
        this.displayStatus('error', 'Não foi possível excluir a observação!', 'Tente novamente mais tarde!');
      }
    });
  }

  selectedFilter: string | null = null;

  selectFilter(filter: Score) {
      this.selectedFilter = filter.disciplina;
      this.status = filter.status ? 'Sim' : 'Não';
      this.media = filter.media;

      this.scoresDataFiltered = this.scoresData.filter(activity => activity.disciplina === filter.disciplina);
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
