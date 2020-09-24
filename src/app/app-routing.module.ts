import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from "./component/landing/landing.component";
import { UserComponent } from "./component/user/user.component";
import { OrderComponent } from "./component/order/order.component";
import { LoginComponent } from "./component/auth/login/login.component";
import { RegisterComponent } from "./component/auth/register/register.component";
import { AdminComponent } from "./component/admin/admin.component";
import { AuthGuard } from "./auth.guard";
import { AdminGuard } from "./admin.guard";
import { OnlyGuestGuard } from "./only-guest.guard";

const routes: Routes = [
  {path: '', component: LandingComponent, canActivate: [OnlyGuestGuard]},
  {path: 'main', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [OnlyGuestGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [OnlyGuestGuard]},
  {path: 'orders', component: OrderComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
