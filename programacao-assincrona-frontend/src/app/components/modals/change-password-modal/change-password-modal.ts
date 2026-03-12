import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-change-password-modal',
  standalone: false,
  templateUrl: './change-password-modal.html',
  styleUrl: './change-password-modal.css',
})
export class ChangePasswordModal {
  @Input() isOpen: boolean = true;
  @Input() isLoading: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{ currentPassword: string, newPassword: string }>();

  currentPassword: string = '';
  newPassword: string = '';

  closeModal() {
    this.currentPassword = '';
    this.newPassword = '';
    this.close.emit();
  }

  send() {
    this.confirm.emit({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    });
    this.currentPassword = '';
    this.newPassword = '';
  }
}
