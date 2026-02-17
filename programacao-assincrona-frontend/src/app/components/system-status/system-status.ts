import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-system-status',
  standalone: false,
  templateUrl: './system-status.html',
  styleUrl: './system-status.css',
})
export class SystemStatus {
  @Input() type: 'success' | 'error' = 'success';
  @Input() title: string = '';
  @Input() description: string = '';
}
