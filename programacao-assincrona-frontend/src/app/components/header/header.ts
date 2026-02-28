import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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

  constructor(private authService: AuthService) {
    const userData = this.authService.getUserData();
    const userRole = this.authService.getUserType();
    if (userData) {
      this.userName = userData.nome || this.userName;
      this.userType = userRole.charAt(0).toUpperCase() + userRole.slice(1); // Capitaliza o tipo
      console.log('Dados  do usuário:', userData);
    }
  }
}
