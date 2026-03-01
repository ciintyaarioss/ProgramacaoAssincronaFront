import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from '../../services/auth.service';
import { Activity, Score, SubjectService } from '../../services/subjects.service';

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
    'Situação Geral: Pendente ',
  ]



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

  selectedFilter: string | null = 'Matemática';

  selectFilter(filter: string) {
      this.selectedFilter = filter;
  }
  constructor(private authService: AuthService, private subjectService: SubjectService, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    const userData = this.authService.getUserData();
    if (userData) {
      this.infos = [
        `Nome: ${userData.nome}`,
        `CPF: ${userData.cpf}`,
        `Matrícula: ${userData.matricula}`,
        `Situação Geral: Pendente`,
      ];
    }

    this.subjectService.listarAtividades(userData.id).subscribe(res => {
      this.scoresData = res;
      this.cdr.detectChanges(); // Força a detecção de mudanças após atualizar os dados
    });

    this.subjectService.listarNotas(userData.id).subscribe(res => {
      this.scoresDataForPdf = res;
      this.cdr.detectChanges(); // Força a detecção de mudanças após atualizar os dados
    });

  }
gerarPdf() {
  setTimeout(() => { // garante renderização do Angular

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
