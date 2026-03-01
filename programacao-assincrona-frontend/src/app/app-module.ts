import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './pages/login/login';
import { Matricula } from './pages/matricula/matricula';
import { MyProfile } from "./pages/my-profile/my-profile";
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
import { BaseModal } from './components/modals/base-modal/base-modal';
import { ObservationModal } from './components/modals/observation-modal/observation-modal';
import { RegisterModal } from './components/modals/register-modal/register-modal';
import { ScoreModal } from './components/modals/score-modal/score-modal';
import { SystemStatus } from './components/system-status/system-status';
import { Observations } from './pages/observations/observations';
import { Observation } from './components/observation/observation';
import { Dashboards } from './pages/dashboards/dashboards';
import { SectionCard } from './components/section-card/section-card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StudentProfile } from './pages/student-profile/student-profile';
import { ObservationProfile } from './components/observation-profile/observation-profile';
import { MatriculaSuccess } from './pages/matricula-success/matricula-success';
import { ChartSubjects } from './components/chart-subjects/chart-subjects';

@NgModule({
  declarations: [
    App,
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
    Home,
    BaseModal,
    ObservationModal,
    RegisterModal,
    ScoreModal,
    SystemStatus,
    Observations,
    Observation,
    Dashboards,
    SectionCard,
    StudentProfile,
    ObservationProfile,
    MatriculaSuccess,
    ChartSubjects,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
