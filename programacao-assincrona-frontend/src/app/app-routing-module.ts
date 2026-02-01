import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Matricula } from './pages/matricula/matricula';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'matricula', component: Matricula }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
