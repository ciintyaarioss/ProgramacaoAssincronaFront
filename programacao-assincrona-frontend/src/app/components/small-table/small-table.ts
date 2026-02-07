import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-table',
  standalone: false,
  templateUrl: './small-table.html',
  styleUrl: './small-table.css',
})
export class SmallTable {
  @Input() data: any[] = [];
  @Input() type: string = '';

  @Input() columnsScoresForStudents = ["atividade", "notas"];

}
