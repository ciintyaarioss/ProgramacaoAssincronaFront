import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
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

  userType: string = '';
  observationsList: Observation[] = [];
  subjects = [
    { nome: 'Matemática', media: 8.5, status: 'Aprovado' },
    { nome: 'Português', media: 7.2, status: 'Aprovado' },
    { nome: 'Ciências', media: 5.9, status: 'Reprovado' },
  ]

  scoresData: Activity[] = [

  ];

  scoresDataForPdf: Score[] = [

  ];

  alunoId: number = 0;
  showObservationModal: boolean = false;

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private subjectService: SubjectService,
    private cdr: ChangeDetectorRef,
    private observationService: ObservationService,
    private studentService: StudentService) {}

  ngOnInit() {
    this.userType = this.authService.getUserType() ?? '';

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.alunoId = id;

    if (!id) {
      console.error('ID do aluno não encontrado');
      return;
    }

    this.studentService.getAlunoById(id).subscribe({
      next: (aluno: Aluno) => {
        this.infos = [
          `Nome: ${aluno.nome || ''}`,
          `CPF: ${aluno.cpf || ''}`,
          `Matrícula: ${aluno.matricula || ''}`,
          `Situação Geral: ${aluno.ativo === 'S' ? 'Ativo' : 'Pendente'}`,
        ];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar aluno:', err);
      }
    });

    
    this.subjectService.listarAtividades(id).subscribe(res => {
      this.scoresData = res;
      this.cdr.detectChanges();
    });

    this.subjectService.listarNotas(id).subscribe(res => {
      this.scoresDataForPdf = res;
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
        alert('Observação cadastrada com sucesso!');
      },
      error: () => {
        alert('Erro ao cadastrar observação');
      }
    });
  }

  onObservationModalClose() {
    this.showObservationModal = false;
  }

  excluirObservacao(id: number) {
    if (!confirm('Tem certeza que deseja excluir esta observação?')) {
      return;
    }

    this.observationService.excluirObservacao(id).subscribe({
      next: () => {
        this.carregarObservacoes(this.alunoId);
        alert('Observação excluída com sucesso!');
      },
      error: () => {
        alert('Erro ao excluir observação');
      }
    });
  }

  selectedFilter: string | null = null;

  selectFilter(filter: string) {
      this.selectedFilter = filter;
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
