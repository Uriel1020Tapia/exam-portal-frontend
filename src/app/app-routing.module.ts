import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from './guards/authAdminGuard';
import { AuthPublicGuard } from './guards/authPublicGuard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path:'signup',
    component:SignupComponent,
    pathMatch:"full"
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch:"full"
  },
  {
    path:'home',
    component:HomeComponent,
    pathMatch:"full"
  },
  {
    path:'admin-dashboard',
    component:AdminDashboardComponent,
    pathMatch:"full",
    canActivate: [AuthAdminGuard],
    data:{
      role:'ADMIN'
    }
  },
  {
    path:'user-dashboard',
    component:UserDashboardComponent,
    pathMatch:"full",
    canActivate: [AuthPublicGuard],
    data:{
      role:'NORMAL'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
