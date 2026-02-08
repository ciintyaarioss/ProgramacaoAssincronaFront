import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './pages/login/login';
import { Matricula } from './pages/matricula/matricula';
import { MyProfile } from './pages/my-profile/my-profile';
import { Table } from './components/table/table';
import { Students } from './pages/students/students';
import { Subjects } from './pages/subjects/subjects';
import { Teachers } from './pages/teachers/teachers';
import { Card } from './components/card/card';
import { SmallTable } from './components/small-table/small-table';
import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Tab } from './components/tab/tab';
import { Home } from './pages/home/home';

@NgModule({
  declarations: [
    App,
    Login,
    Matricula,
    MyProfile,
    Table,
    Students,
    Subjects,
    Teachers,
    Card,
    SmallTable,
    Header,
    Sidebar,
    Tab,
    Home
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
