import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-observation',
  standalone: false,
  templateUrl: './observation.html',
  styleUrl: './observation.css',
})
export class Observation {
  @Input() teacherName: string = '';
  @Input() studentName: string = '';
  @Input() message: string = '';
  @Input() type: 'admin' | 'student' = 'student';
  
  @Input() selectable: boolean = false;
  @Input() date: string = '';
  
  @Output() selectionChange = new EventEmitter<boolean>();

  onCheckChange(event: any) {
    this.selectionChange.emit(event.target.checked);
  }
}
