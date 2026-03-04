import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Disciplina {
  id: number;
  nome: string;
}

export interface Professor {
  id: number;
  nome: string;
  senha: string;
  cpf: string;
  matricula: string;
  disciplina: Disciplina;
}

export interface ProfessorRequest {
  nome: string;
  cpf: string;
  disciplina: string;
  adminId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private API = 'https://programacaoassincrona-back-1.onrender.com';

  constructor(private http: HttpClient) {}

  listarProfessores(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.API}/professor/list`);
  }

  criarProfessor(request: ProfessorRequest): Observable<any> {
    return this.http.post(
      `${this.API}/professor`,
      {
        nome: request.nome,
        cpf: request.cpf,
        disciplina: request.disciplina,
        adminId: request.adminId
      }
    );
  }
}
