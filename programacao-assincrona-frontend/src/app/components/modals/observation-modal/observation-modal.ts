import { Component } from '@angular/core';

@Component({
  selector: 'app-observation-modal',
  standalone: false,
  templateUrl: './observation-modal.html',
  styleUrl: './observation-modal.css',
})
export class ObservationModal {
  isOpen: boolean = true;

  closeModal() {
    this.isOpen = false;
  }

  sendObservation() {
    this.isOpen = false;
  }

}
