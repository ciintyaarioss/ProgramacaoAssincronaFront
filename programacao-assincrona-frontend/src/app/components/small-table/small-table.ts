import { Component, Input } from '@angular/core';
import { Activity, ScoreStudent } from '../../services/subjects.service';

@Component({
  selector: 'app-small-table',
  standalone: false,
  templateUrl: './small-table.html',
  styleUrl: './small-table.css',
})
export class SmallTable {
  @Input() data: Activity[] = [];
  @Input() dataScoresForStudents: ScoreStudent[] = [];
  @Input() type: string = '';

  @Input() columnsScoresForStudents = ["atividade", "notas"];

}
