import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginBody {
  cpf: string;
  password: string;
  user_type: 'admin' | 'aluno' | 'professor';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private keyUserType = 'user_role';
  private keyUserData = 'user_data';


  private apiUrl = 'https://programacaoassincrona-back.onrender.com';

  constructor(private http: HttpClient) { }

  login(data: LoginBody): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data).pipe(
      tap(() => {
        this.setUserType(data.user_type);
        this.setUserData(data);
      })
    );
  }

  setUserData(userData: any) {
    localStorage.setItem(this.keyUserData, JSON.stringify(userData));
  }
  getUserData(): any {
    const data = localStorage.getItem(this.keyUserData);
    return data ? JSON.parse(data) : null;
  }
  setUserType(type: 'admin' | 'aluno' | 'professor') {
    localStorage.setItem(this.keyUserType, type);
  }

  getUserType(): string | null {
    return localStorage.getItem(this.keyUserType);
  }

  isAdmin(): boolean {
    return this.getUserType() === 'admin';
  }

  isStudent(): boolean {
    return this.getUserType() === 'aluno';
  }

  isTeacher(): boolean {
    return this.getUserType() === 'professor';
  }

  logout() {
    localStorage.removeItem(this.keyUserType);
    window.location.reload();
  }
}
