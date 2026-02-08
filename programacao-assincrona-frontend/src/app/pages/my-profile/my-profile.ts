import { Component, ElementRef, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  scoresData = [
    { id: 1, atividade: 'Matemática',notas: 8.5 },
    { id: 2, atividade: 'Português', notas: 7.2},
    { id: 3, atividade: 'Ciências', notas: 9.0},
    { id: 4, atividade: 'História', notas: 8.0},
    { id: 5, atividade: 'Geografia', notas: 7.5},

  ];

  scoresDataForPdf = [
    { id: 1, disciplina: 'Matemática', mediaFinal: 8.5, status: 'Aprovado' },
    { id: 2, disciplina: 'Português', mediaFinal: 7.2, status: 'Aprovado' },
    { id: 3, disciplina: 'Ciências', mediaFinal: 5.9, status: 'Reprovado' },
  ];

  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  selectedFilter: string | null = null;

  selectFilter(filter: string) {
      this.selectedFilter = filter;
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
