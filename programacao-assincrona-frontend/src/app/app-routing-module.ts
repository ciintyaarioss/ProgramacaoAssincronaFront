import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Matricula } from './pages/matricula/matricula';
import { MyProfile } from "./pages/my-profile/my-profile";
import { Students } from './pages/students/students';
import { Subjects } from './pages/subjects/subjects';
import { Teachers } from './pages/teachers/teachers';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'matricula', component: Matricula },
  { path: 'my-profile', component: MyProfile },
  { path: 'students', component: Students},
  { path: 'subjects', component: Subjects},
  { path: 'teachers', component: Teachers}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
