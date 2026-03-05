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

  subjects: Score[] = [

  ]
  observationsList: Observation[] = [];

  scoresData: Activity[] = [

  ];

  scoresDataFiltered: Activity[] = [

  ];

  scoresDataForPdf: Score[] = [

  ];

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  selectedFilter: string | null = 'Matemática';
  status: string = 'Sim';
  media: number = 0;
  

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

    this.subjectService.listarNotas(userData.id).subscribe(res => {
      this.subjects = res;
      this.selectedFilter = this.subjects.length > 0 ? this.subjects[0].disciplina : null;
      this.selectFilter(this.subjects[0]);
      this.cdr.detectChanges(); 
    
      this.media = this.subjects.length > 0 ? this.subjects[0].media : 0;
      this.status = this.subjects.length > 0 ? (this.subjects[0].status ? 'Sim' : 'Não') : 'Não';
      this.scoresDataFiltered = this.scoresData.filter(activity => activity.disciplina === this.selectedFilter);
      this.cdr.detectChanges();
    });

    this.subjectService.listarAtividades(userData.id).subscribe(res => {
      this.scoresData = res;
      console.log(this.subjects[0])
      this.cdr.detectChanges(); 
    });

    this.subjectService.listarNotas(userData.id).subscribe(res => {
      this.scoresDataForPdf = res;
      this.cdr.detectChanges();
    });

    this.observationService.listarObservacoesPorProfessor(userData.id).subscribe(res => {
      this.observationsList = res;
      this.cdr.detectChanges(); 
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
