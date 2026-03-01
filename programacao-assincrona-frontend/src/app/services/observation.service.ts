import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

export interface Observation {
id: number;
  aluno: string;
  professor: string;
  text: string;
  data: Date;
}

@Injectable({
  providedIn: 'root'
})

export class ObservationService {

  private API = 'https://programacaoassincrona-back.onrender.com';

  constructor(private http: HttpClient) {}

  listarObservacoes(): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.API}/observacao`);
  }
  listarObservacoesPorAluno(alunoId: number): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.API}/observacao?aluno_id=${alunoId}`);
  }
  listarObservacoesPorProfessor(professorId: number): Observable<Observation[]> {
    return this.http.get<Observation[]>(`${this.API}/observacao?professor_id=${professorId}`);
  }

}