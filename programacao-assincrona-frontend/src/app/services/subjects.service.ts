import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Subject {
  disciplina: string;
  aprovados: number;
  reprovados: number;
  mediaDisciplina: number;
}

export interface Activity {
  id: number;
  titulo: string;
  valor: number;
}

export interface Score {
  status: boolean;
  media: number;
  disciplina: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private API = 'https://programacaoassincrona-back.onrender.com';

  constructor(private http: HttpClient) {}

  listar(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.API}/nota/disciplina`);
  }
  listarAtividades(alunoId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.API}/nota?aluno_id=${alunoId}`);
  }
  listarNotas(alunoId: number): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.API}/nota/discplinaByAluno?aluno_id=${alunoId}`);
  }
}