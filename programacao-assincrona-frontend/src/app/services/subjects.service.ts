import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Subject {
  disciplina: string;
  aprovados: number;
  reprovados: number;
  mediaDisciplina: number;
  piorNota: number;
}
export interface ScoreStudent{
  alunoNome: string;
  media: number;
  status: string;
}

export interface Activity {
  id?: number;
  titulo: string;
  disciplina: string;
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

  private API = 'https://programacaoassincrona-back-1.onrender.com';

  constructor(private http: HttpClient) {}

  listar(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.API}/nota/statusDisciplina`);
  }
  listarAtividades(alunoId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.API}/nota?aluno_id=${alunoId}`);
  }
  listarNotas(alunoId: number): Observable<Score[]> {
    return this.http.get<Score[]>(`${this.API}/nota/discplinaByAluno?aluno_id=${alunoId}`);
  }
  listarNotasPorDisciplina(disciplina: string): Observable<ScoreStudent[]> {
    return this.http.get<ScoreStudent[]>(`${this.API}/nota/notasDisciplina?disciplina=${disciplina}`);
  }

  atualizarNota(notaId: number, valor: number): Observable<any> {
    return this.http.patch(`${this.API}/nota?nota_id=${notaId}&valor=${valor}`, {});
  }

  criarNota(data: {titulo: string, nota: number, aluno_id: number}): Observable<any> {
    return this.http.post(`${this.API}/nota`, data);
  }
}
