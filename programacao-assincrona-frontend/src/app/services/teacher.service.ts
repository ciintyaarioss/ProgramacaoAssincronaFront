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

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private API = 'https://programacaoassincrona-back.onrender.com/';

  constructor(private http: HttpClient) {}

  listarProfessores(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.API}professor/list`);
  }


}