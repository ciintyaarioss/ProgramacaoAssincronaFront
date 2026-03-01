import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-observation-modal',
  standalone: false,
  templateUrl: './observation-modal.html',
  styleUrl: './observation-modal.css',
})
export class ObservationModal {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<string>();

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }

  sendObservation() {
    const text = (document.getElementById('obs-text') as HTMLTextAreaElement)?.value;
    if (text && text.trim()) {
      this.confirm.emit(text.trim());
    } else {
      alert('Digite uma observação');
      return;
    }
    this.isOpen = false;
  }
}
