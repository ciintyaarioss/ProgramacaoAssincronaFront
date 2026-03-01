import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matricula-success',
  standalone: false,
  templateUrl: './matricula-success.html',
  styleUrl: './matricula-success.css',
})
export class MatriculaSuccess {
constructor(    private router: Router
) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
