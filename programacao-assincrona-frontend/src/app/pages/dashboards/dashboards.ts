import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Aluno, StudentService } from '../../services/student.service';
import { Activity, ScoreStudent, Subject, SubjectService } from '../../services/subjects.service';
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
  scoresData: Activity[] = [];
  scoresForStudentsData: ScoreStudent[] = [];
  
  observationsData: Observation[] = [

  ];
  subjectSelected: Subject = {
  disciplina: '',
  reprovados: 0,
  aprovados: 0,
  mediaDisciplina: 0,
  piorNota: 0

  };

  highestAverageSubject: Subject = {
    disciplina: '',
    reprovados: 0,
    aprovados: 0,
    mediaDisciplina: 0,
    piorNota: 0
  };

  lowestAverageSubject: Subject = {
    disciplina: '',
    reprovados: 0,
    aprovados: 0,
    mediaDisciplina: 0,
    piorNota: 0
  };
  subjectsData: Subject[] = [

  ];
  subjectsNames: string[] = [];
  subjectsAverages: number[] = [];
  subjectsApproved: number[] = [];
  subjectsFailed: number[] = [];
  adminStudentsData : Aluno[] = [];

  
  constructor(private subjectService: SubjectService, private studentService: StudentService, private observationsService: ObservationService,private cdr: ChangeDetectorRef) {
  }

  
  selectSubject(subject: Subject) {
    this.subjectSelected = subject;
    this.subjectService.listarNotasPorDisciplina(subject.disciplina).subscribe(res => {
      this.scoresForStudentsData = res;
      this.cdr.detectChanges(); 
    }
    );

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

      this.subjectsNames = this.subjectsData.map(s => s.disciplina);
      this.subjectsApproved = this.subjectsData.map(s => s.aprovados);
      this.subjectsFailed = this.subjectsData.map(s => s.reprovados);
      this.subjectsAverages = this.subjectsData.map(s => s.mediaDisciplina);
      console.log(this.subjectsNames);
      console.log(this.subjectsAverages);
      
      this.highestAverageSubject = this.subjectsData.reduce((prev, current) => (prev.mediaDisciplina > current.mediaDisciplina) ? prev : current);
      this.lowestAverageSubject = this.subjectsData.reduce((prev, current) => (prev.mediaDisciplina < current.mediaDisciplina) ? prev : current);
      this.cdr.detectChanges(); 
    });
  }

}
