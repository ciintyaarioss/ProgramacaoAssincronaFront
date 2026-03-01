import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { Activity, Score, Subject, SubjectService } from '../../services/subjects.service';
import { AuthService } from '../../services/auth.service';
import { Observation, ObservationService } from '../../services/observation.service';

@Component({
  selector: 'app-student-profile',
  standalone: false,
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile  implements OnInit {
  infos = [
    'Nome: Matheus Ueno',
    'CPF: 602.066.628-07',
    'Matrícula: 2021001',
    'Situação Geral: Pendente ',
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

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private subjectService: SubjectService,
    private cdr: ChangeDetectorRef,
    private observationService: ObservationService) {}

  ngOnInit() {
    this.userType = this.authService.getUserType() ?? '';

    const params = this.route.snapshot.queryParamMap;
    const id = Number(params.get('id'));
    const nome = params.get('nome');
    const cpf = params.get('cpf');
    const matricula = params.get('matricula');

    this.infos = [
      `Nome: ${nome}`,
      `CPF: ${cpf}`,
      `Matrícula: ${matricula}`,
      `Situação Geral: Pendente`,
    ];


    
    this.subjectService.listarAtividades(id).subscribe(res => {
      this.scoresData = res;
      this.cdr.detectChanges(); // Força a detecção de mudanças após atualizar os dados
    });

    this.subjectService.listarNotas(id).subscribe(res => {
      this.scoresDataForPdf = res;
      this.cdr.detectChanges(); // Força a detecção de mudanças após atualizar os dados
    });

    this.observationService.listarObservacoesPorAluno(id).subscribe(res => {
      this.observationsList = res;
      this.cdr.detectChanges(); // Força a detecção de mudanças após atualizar os dados
     }
    );


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