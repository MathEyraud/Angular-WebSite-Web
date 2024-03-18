import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientsComponent } from "../clients/clients.component";
import { InsertClientComponent } from "../clients/insert-client/insert-client.component";
import { ContentDashboardComponent } from "../content-dashboard/content-dashboard.component";
import { ThemesInfosComponent } from "../themes/themes-infos/themes-infos.component";
import { ThemesComponent } from "../themes/themes.component";
import { DashboardComponent } from "./dashboard.component";
import { TrainersComponent } from "../trainers/trainers.component";
import { InsertTrainerComponent } from "../trainers/insert-trainer/insert-trainer.component";
import { TrainingsComponent } from "../trainings/trainings.component";
import { InsertTrainingComponent } from "../trainings/insert-training/insert-training.component";
import { SessionsComponent } from "../sessions/sessions.component";
import { InsertSessionComponent } from "../sessions/insert-session/insert-session.component";
import { SessionInfosComponent } from "../sessions/session-infos/session-infos.component";


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {path: '', component: ContentDashboardComponent},
      {path: 'catalogues/themes', component: ThemesComponent},
      {path: 'clients', component: ClientsComponent},
      {path: 'catalogues/themes/infos/:id', component: ThemesInfosComponent},
      {path: 'clients/insert', component: InsertClientComponent},
      {path: 'clients/:id', component: InsertClientComponent},
      {path: 'clients/employe/:id', component: InsertClientComponent},
      {path: 'clients/particulier/:id', component: InsertClientComponent},
      {path: 'clients/company/:id', component: InsertClientComponent},
      {path: 'trainers', component: TrainersComponent},
      {path: 'trainings', component: TrainingsComponent},
      {path: 'sessions', component: SessionsComponent},
      {path: 'sessions/infos/:id', component: SessionInfosComponent},
      {path: 'InsertSessionComponent/interSession/:id', component: InsertSessionComponent},
      {path: 'InsertSessionComponent/intraSession/:id', component: InsertSessionComponent},
      {path: 'InsertSessionComponent', component: InsertSessionComponent},
      {path: 'InsertTrainerComponent/:id', component: InsertTrainerComponent},
      {path: 'InsertTrainingComponent/:id', component: InsertTrainingComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
