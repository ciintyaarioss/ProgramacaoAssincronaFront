import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-system-status',
  standalone: false,
  templateUrl: './system-status.html',
  styleUrl: './system-status.css',
})
export class SystemStatus implements OnInit, OnDestroy {
  @Input() type: 'success' | 'error' = 'success';
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() closed = new EventEmitter<void>();

  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit() {
    this.timer = setTimeout(() => {
      this.close();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onBackdropClick() {
    this.close();
  }

  close() {
    this.closed.emit();
  }
}
