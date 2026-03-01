import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-observation-profile',
  standalone: false,
  templateUrl: './observation-profile.html',
  styleUrl: './observation-profile.css',
})
export class ObservationProfile {
  @Input() date: string = '06/02 - 17:10';
  @Input() text: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  @Input() isChecked: boolean = false;
}
