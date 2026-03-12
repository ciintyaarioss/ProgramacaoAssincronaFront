import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

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

  isVisible: boolean = false;
  isClosing: boolean = false;

  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = true;
      this.cdr.detectChanges();
    }, 30);

    this.timer = setTimeout(() => {
      this.startClose();
    }, 10000);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  onBackdropClick() {
    this.startClose();
  }

  startClose() {
    if (this.isClosing) return;
    this.isClosing = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.closed.emit();
    }, 500);
  }
}
