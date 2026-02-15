import { Component } from '@angular/core';

@Component({
  selector: 'app-register-modal',
  standalone: false,
  templateUrl: './register-modal.html',
  styleUrl: './register-modal.css',
})
export class RegisterModal {
  isOpen: boolean = true;
  isOpenDrop = false;
  selected = '';

  closeModal() {
    this.isOpen = false;
  }

  registerTeacher() {
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isOpenDrop = !this.isOpenDrop;
  }

  select(value: string) {
    this.selected = value;
    this.isOpenDrop = false;
  }

}
