import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.css',
})

export class Header {
  userName: string = 'Maria Silva';
  userType: string = 'Admin';
  imageUser: string = 'icon_admin.svg'
}
