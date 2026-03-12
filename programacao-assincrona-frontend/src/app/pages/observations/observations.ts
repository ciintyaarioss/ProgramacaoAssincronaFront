import { ChangeDetectorRef, Component } from '@angular/core';
import { Observation, ObservationService } from '../../services/observation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-observations',
  standalone: false,
  templateUrl: './observations.html',
  styleUrl: './observations.css',
})
export class Observations {
  observationsList: Observation[] = [];
  isLoading: boolean = false;

  userType: 'admin' | 'aluno' | 'professor' = 'admin'; 

  constructor(private observationService: ObservationService, private cdr: ChangeDetectorRef, private authService: AuthService) {}

  ngOnInit() {
    this.userType = this.authService.getUserType() as 'admin' | 'aluno' | 'professor';
    this.loadObservations();
  }

  loadObservations() {
    this.isLoading = true;
    this.cdr.detectChanges();
    if (this.userType === 'admin') {
      this.observationService.listarObservacoes().subscribe({
        next: res => {
          this.observationsList = res;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => { this.isLoading = false; this.cdr.detectChanges(); }
      });
    }
    if (this.userType === 'aluno') {
      this.observationService.listarObservacoesPorAluno(this.authService.getUserData().id).subscribe({
        next: res => {
          this.observationsList = res;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => { this.isLoading = false; this.cdr.detectChanges(); }
      });
    }

    if (this.userType === 'professor') {
      this.observationService.listarObservacoesPorProfessor(this.authService.getUserData().id).subscribe({
        next: res => {
          this.observationsList = res;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: () => { this.isLoading = false; this.cdr.detectChanges(); }
      });
    }
  }

  excluirObservacao(id: number) {
    this.observationService.excluirObservacao(id).subscribe(() => {
      this.observationsList = this.observationsList.filter(obs => obs.id !== id);
      this.cdr.detectChanges();
    });
  }

}
