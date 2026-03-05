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
    subjectsDataFiltered: Subject[] = []
  constructor(private subjectService: SubjectService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subjectService.listar().subscribe(res => {
      this.subjectsData = res;
      this.subjectsDataFiltered = res;
      this.cdr.detectChanges();
    });
  }
  searchByName(name: string) {
    this.subjectsDataFiltered = this.subjectsData.filter(subject => subject.disciplina.toLowerCase().includes(name.toLowerCase()));
  }
}
