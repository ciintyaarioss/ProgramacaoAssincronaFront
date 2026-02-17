import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private key = 'user_role'

  constructor() { }

  setUserType(type: 'admin' | 'student' | 'teacher') {
    localStorage.setItem(this.key, type);
    window.location.reload();
  }

  getUserType(): string {
    return localStorage.getItem(this.key) || 'student';
  }

  isAdmin(): boolean {
    return this.getUserType() === 'admin';
  }

  isStudent(): boolean {
    return this.getUserType() === 'student';
  }
  
  isTeacher(): boolean {
    return this.getUserType() === 'teacher';
  }
}