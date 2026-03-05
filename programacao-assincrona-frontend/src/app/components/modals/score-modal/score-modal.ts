import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Activity } from '../../../services/subjects.service';

@Component({
  selector: 'app-score-modal',
  standalone: false,
  templateUrl: './score-modal.html',
  styleUrl: './score-modal.css',
})
export class ScoreModal implements OnInit {
  @Input() isOpen: boolean = true;
  @Input() activity: Activity | null = null;
  @Input() isEditMode: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{titulo: string, valor: number}>();

  activityName: string = '';
  activityScore: string = '';

  ngOnInit() {
    if (this.isEditMode && this.activity) {
      this.activityName = this.activity.titulo;
      this.activityScore = this.activity.valor.toString();
    }
  }

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }

  sendScore() {
    this.confirm.emit({
      titulo: this.activityName,
      valor: parseFloat(this.activityScore)
    });
    this.isOpen = false;
  }
}
