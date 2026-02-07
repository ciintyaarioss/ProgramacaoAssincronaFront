import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: false,
  templateUrl: './tab.html',
  styleUrl: './tab.css',
})

export class Tab {
  @Input() icon: string = '';
  @Input() name: string = '';
  @Input() link: string = '';
  @Input() sidebarOpen: boolean = true;
}
