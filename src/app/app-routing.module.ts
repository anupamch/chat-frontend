import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenicationComponent } from './myComponents/authenication/authenication.component';
import { DashboardComponent } from './myComponents/dashboard/dashboard.component';
import { CanActivateViaAuthGuard } from './myComponents/guard/canActivateViaAuthGuard';


const routes: Routes = [
  {path:'',redirectTo:"login",pathMatch:'full'},
  {path:'login',component:AuthenicationComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[CanActivateViaAuthGuard]},
  {path:'logout/:islogout',component:AuthenicationComponent,canActivate:[CanActivateViaAuthGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
