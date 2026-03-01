import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleGuard } from './guard/auth.guard';
import { Login } from './pages/login/login';
import { Matricula } from './pages/matricula/matricula';
import { MyProfile } from "./pages/my-profile/my-profile";
import { Students } from './pages/students/students';
import { Subjects } from './pages/subjects/subjects';
import { Teachers } from './pages/teachers/teachers';
import { Home } from './pages/home/home';
import { Observations } from './pages/observations/observations';
import { Dashboards } from './pages/dashboards/dashboards';
import { StudentProfile } from './pages/student-profile/student-profile';
import { MatriculaSuccess } from './pages/matricula-success/matricula-success';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login)
  },
  { path: 'matricula', component: Matricula },
  { path: 'matricula-success', component: MatriculaSuccess },
  { 
    path: 'home', 
    component: Home,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'professor', 'aluno'] } 
  },
  { 
    path: 'students', 
    component: Students,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'professor'] } 
  },
  { 
    path: 'observations', 
    component: Observations, 
    canActivate: [roleGuard],
    data: { roles: ['admin', 'aluno'] }
  },
  { 
    path: 'subjects', 
    component: Subjects,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'professor', 'aluno'] } 
  },    
  { 
    path: 'teachers', 
    component: Teachers,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'professor', 'aluno'] } 
  },    
  { 
    path: 'my-profile', 
    component: MyProfile,
    canActivate: [roleGuard],
    data: { roles: ['professor', 'aluno'] } 
  },
  { 
    path: 'dashboards', 
    component: Dashboards,
    canActivate: [roleGuard],
    data: { roles: ['professor', 'admin'] } 
  },
  { 
    path: 'student-profile/:matricula', 
    component: StudentProfile,
    canActivate: [roleGuard],
    data: { roles: ['professor', 'admin'] } 
  },

  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
