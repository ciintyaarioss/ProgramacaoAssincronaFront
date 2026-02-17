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

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'matricula', component: Matricula },
  { 
    path: 'home', 
    component: Home,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'teacher', 'student'] } 
  },
  { 
    path: 'students', 
    component: Students,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'teacher'] } 
  },
  { 
    path: 'observations', 
    component: Observations, 
    canActivate: [roleGuard],
    data: { roles: ['admin', 'student'] }
  },
  { 
    path: 'subjects', 
    component: Subjects,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'teacher', 'student'] } 
  },    
  { 
    path: 'dashboards', 
    component: Dashboards,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'teacher'] } 
  },
  { 
    path: 'teachers', 
    component: Teachers,
    canActivate: [roleGuard],
    data: { roles: ['admin', 'teacher', 'student'] } 
  },    
  { 
    path: 'my-profile', 
    component: MyProfile,
    canActivate: [roleGuard],
    data: { roles: ['teacher', 'student'] } 
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
