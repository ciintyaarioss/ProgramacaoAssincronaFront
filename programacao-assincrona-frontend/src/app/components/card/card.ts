import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() title: string = '';
  @Input() value!: string | number;
  @Input() bgColor: string = '#FAFAFA';
  @Input() titleColor: string = '#E2857E';
  @Input() valueColor: string = '#616161';
  @Input() fontSize: string = '50px';
  @Input() marginTopP : string = '0px';
}
