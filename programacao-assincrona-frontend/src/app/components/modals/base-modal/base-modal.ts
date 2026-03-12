import { Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-base-modal',
  standalone: false,
  templateUrl: './base-modal.html',
  styleUrl: './base-modal.css',
})
export class BaseModal {
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmText: string = 'Confirmar';
  @Input() isLoading: boolean = false;

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

}
