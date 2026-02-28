import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aluno {
  nome: string;
  senha: string;
  cpf: string;
  matricula: string;
  ativo?: boolean;
  id?: number;
}




@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private apiUrl = 'https://programacaoassincrona-back.onrender.com';

  constructor(private http: HttpClient) { }

  criarAluno(aluno: Aluno): Observable<any> {
    return this.http.post(`${this.apiUrl}/aluno/adicionar`, aluno);
  }

  listarAlunoDesativos(): Observable<Aluno[]>{
    return this.http.get<Aluno[]>(`${this.apiUrl}/aluno/listarDesativo`);
  }

}
