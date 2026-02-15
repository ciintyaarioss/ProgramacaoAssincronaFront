import { Component } from '@angular/core';

@Component({
  selector: 'app-score-modal',
  standalone: false,
  templateUrl: './score-modal.html',
  styleUrl: './score-modal.css',
})
export class ScoreModal {
  isOpen: boolean = true;

  closeModal() {
    this.isOpen = false;
  }

  sendScore() {
    this.isOpen = false;
  }
}
