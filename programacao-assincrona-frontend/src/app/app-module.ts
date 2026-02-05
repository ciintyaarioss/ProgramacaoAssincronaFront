import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './pages/login/login';
import { Matricula } from './pages/matricula/matricula';
import { MyProfile } from './pages/my-profile/my-profile';
import { Table } from './components/table/table';
import { Students } from './pages/students/students';

@NgModule({
  declarations: [
    App,
    Login,
    Matricula,
    MyProfile,
    Table,
    Students
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
