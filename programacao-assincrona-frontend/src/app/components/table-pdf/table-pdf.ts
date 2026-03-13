import { Component, Input } from '@angular/core';
import { Score } from '../../services/subjects.service';

@Component({
  selector: 'app-table-pdf',
  standalone: false,
  templateUrl: './table-pdf.html',
  styleUrl: './table-pdf.css',
})
export class TablePdf {
  @Input() dataScores: Score[] = [
    {disciplina: "", status:true, media:4}
  ]
  @Input() nome: string = ""
  @Input() cpf: string = ""
  @Input() matricula: string = ""


}
