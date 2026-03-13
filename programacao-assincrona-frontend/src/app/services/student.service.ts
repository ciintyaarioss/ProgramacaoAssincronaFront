import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Aluno {
  nome: string;
  senha: string;
  cpf: string;
  matricula: string;
  ativo?: string;
  id?: number;
    [key: string]: any;

}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'https://programacaoassincrona-back-1.onrender.com';

  constructor(private http: HttpClient) { }

  criarAluno(aluno: Aluno): Observable<any> {
    aluno.cpf = aluno.cpf.replace(/\D/g, '');
    const params = new HttpParams()
      .set('nome', aluno.nome)
      .set('senha', aluno.senha)
      .set('cpf', aluno.cpf)
      .set('matricula', aluno.matricula);

 return this.http.post(
   `${this.apiUrl}/aluno/adicionar`,
    null,
    {
      params: {
        nome: aluno.nome,
        senha: aluno.senha,
        cpf: aluno.cpf,
        matricula: aluno.matricula
      },
      responseType: 'text'
    }
  );
}  
  
  listarAlunoDesativos(): Observable<Aluno[]>{
    return this.http.get<Aluno[]>(`${this.apiUrl}/aluno/listarDesativo`);
  }
  listarAlunoAtivos(): Observable<Aluno[]>{
    return this.http.get<Aluno[]>(`${this.apiUrl}/aluno/listarAtivo`);
  }
  listarAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.apiUrl}/aluno/listar`);
  }
  acionarAluno(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/aluno?alunoId=${id}`, {});
  }
  deletarAluno(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/aluno/deletar?id=${id}`); 
  }

  getAlunoByMatricula(matricula: string): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/aluno/listarMatricula?matricula=${matricula}`);
  }
}
