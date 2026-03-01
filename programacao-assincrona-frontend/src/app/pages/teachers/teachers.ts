import { ChangeDetectorRef, Component } from '@angular/core';
import { Professor } from '../../services/teacher.service';
import { ProfessorService } from '../../services/teacher.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-teachers',
  standalone: false,
  templateUrl: './teachers.html',
  styleUrl: './teachers.css',
})
export class Teachers implements OnInit {
  teachersData: Professor[] = [
  ];
  constructor(private teacherService: ProfessorService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Aqui você pode carregar os dados dos professores, por exemplo, chamando um serviço
    this.teacherService.listarProfessores().subscribe(res => {
      this.teachersData = res;
      this.cdr.detectChanges(); // Força a detecção de mudanças após atualizar os dados
    });
  }
}
