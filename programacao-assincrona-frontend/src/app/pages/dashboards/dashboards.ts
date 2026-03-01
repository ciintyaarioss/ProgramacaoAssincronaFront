import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Aluno, StudentService } from '../../services/student.service';
import { Subject, SubjectService } from '../../services/subjects.service';
import { Observation, ObservationService } from '../../services/observation.service';

@Component({
  selector: 'app-dashboards',
  standalone: false,
  templateUrl: './dashboards.html',
  styleUrl: './dashboards.css',
})
export class Dashboards implements OnInit {
  studentsData: Aluno[] = [

  ];
  observationsData: Observation[] = [

  ];
  subjectSelected: Subject = {
  disciplina: '',
  reprovados: 0,
  aprovados: 0,
  mediaDisciplina: 0
  };
  subjectsData: Subject[] = [

  ];
  adminStudentsData : Aluno[] = [

  ];
    constructor(private subjectService: SubjectService, private studentService: StudentService, private observationsService: ObservationService,private cdr: ChangeDetectorRef) {
  }

  selectSubject(subject: Subject) {
    this.subjectSelected = subject;

  }
onSelectChange(event: Event) {
  const select = event.target as HTMLSelectElement;
  const selectedIndex = select.selectedIndex;

  const subject = this.subjectsData[selectedIndex - 1];

  if (subject) {
    this.selectSubject(subject);
  }
}
  ngOnInit() {
    this.observationsService.listarObservacoes().subscribe(res => {
      this.observationsData = res;
      this.cdr.detectChanges(); 
    });

    this.studentService.listarAlunoAtivos().subscribe(res => {
      this.adminStudentsData = res;
      this.cdr.detectChanges(); 
    });
    this.subjectService.listar().subscribe(res => {
      this.subjectsData = res;
      this.cdr.detectChanges(); 
    });
  }

}
