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
  cpfRaw = '';

  onCpfInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const raw = input.value.replace(/\D/g, '').slice(0, 11);
    this.cpfRaw = raw;

    let formatted = raw;
    if (raw.length > 9) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`;
    } else if (raw.length > 6) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`;
    } else if (raw.length > 3) {
      formatted = `${raw.slice(0, 3)}.${raw.slice(3)}`;
    }

    input.value = formatted;
  }

  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }

  registerTeacher() {
    const nome = (document.getElementById('teacher-name') as HTMLInputElement)?.value;
    const cpf = this.cpfRaw;

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
