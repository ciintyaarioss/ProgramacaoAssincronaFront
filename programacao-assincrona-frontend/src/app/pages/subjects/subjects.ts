import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, SubjectService } from '../../services/subjects.service';

@Component({
  selector: 'app-subjects',
  standalone: false,
  templateUrl: './subjects.html',
  styleUrl: './subjects.css',
})
export class Subjects implements OnInit {
    subjectsData: Subject[] = [];
    subjectsDataFiltered: Subject[] = [];
    isLoading: boolean = false;

  constructor(private subjectService: SubjectService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.subjectService.listar().subscribe({
      next: res => {
        this.subjectsData = res;
        this.subjectsDataFiltered = res;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.isLoading = false; this.cdr.detectChanges(); }
    });
  }
  searchByName(name: string) {
    this.subjectsDataFiltered = this.subjectsData.filter(subject => subject.disciplina.toLowerCase().includes(name.toLowerCase()));
  }
}
