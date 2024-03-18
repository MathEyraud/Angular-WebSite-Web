
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {loginGuard} from "./guard/login.guard";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'public',
    loadChildren: () => import('../app/public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../app/views/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [loginGuard]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
