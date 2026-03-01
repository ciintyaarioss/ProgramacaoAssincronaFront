import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, SubjectService } from '../../services/subjects.service';

@Component({
  selector: 'app-subjects',
  standalone: false,
  templateUrl: './subjects.html',
  styleUrl: './subjects.css',
})
export class Subjects implements OnInit {
    subjectsData: Subject[] = [

  ];

  constructor(private subjectService: SubjectService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    // Aqui você pode carregar os dados das disciplinas, por exemplo, chamando um serviço
    this.subjectService.listar().subscribe(res => {
      this.subjectsData = res;
      this.cdr.detectChanges(); // Força a detecção de mudanças após atualizar os dados
    });
  }
}
