import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-register-modal',
  standalone: false,
  templateUrl: './register-modal.html',
  styleUrl: './register-modal.css',
})
export class RegisterModal {
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{nome: string, cpf: string, disciplina: string}>();
  
  isOpenDrop = false;
  selected = '';

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }

  registerTeacher() {
    const nome = (document.getElementById('teacher-name') as HTMLInputElement)?.value;
    const cpf = (document.getElementById('teacher-cpf') as HTMLInputElement)?.value;
    
    if (nome && cpf && this.selected) {
      this.confirm.emit({ nome, cpf, disciplina: this.selected });
    } else {
      alert('Preencha todos os campos');
      return;
    }
    
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
