import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/authGuard/auth.guard";
import { IsLoginGuard } from "src/authGuard/is-login.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { VerifyEmailComponent } from "./verify-email-adress/verify-email/verify-email.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password/forget-password.component";
import { HomeDashboardComponent } from "./dashboard/home-dashboard/home-dashboard.component";
import { MenuDashboardComponent } from "./dashboard/menu-dashboard/menu-dashboard.component";
import { CalendarDashboardComponent } from "./dashboard/calendar-dashboard/calendar-dashboard.component";
import { SettingsDashboardComponent } from "./dashboard/settings-dashboard/settings-dashboard.component";
import { DashboardClientComponent } from "./dashboard-client/dashboard-client/dashboard-client.component";
import { AppointmentsNavClientComponent } from "./dashboard-client/appointments-nav-client/appointments-nav-client.component";
import { LoginAdminComponent } from "./login-admin/login-admin/login-admin.component";
import { TokenAdminGuard } from "src/authGuard/token-admin.guard";
import { HistoryOrderComponent } from "./dashboard-client/history/history-order/history-order.component";
const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [IsLoginGuard] },
  {
    path: "client",
    component: DashboardClientComponent,
    canActivate: [AuthGuard],

    children: [
      {
        path: "appointment",
        component: AppointmentsNavClientComponent,
        
      },{
        path: "history",
        component: HistoryOrderComponent,
        
      },
    ],
    
  },
  { path: "", component: HomeComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [TokenAdminGuard],
    children: [
      {
        path: "home",
        component: HomeDashboardComponent,
      },
      {
        path: "",
        component: MenuDashboardComponent,
      },

      {
        path: "appointment",
        component: CalendarDashboardComponent,
      },
      {
        path: "settings",
        component: SettingsDashboardComponent,
      },
    ],
  },
  {
    path: "verify",
    component: VerifyEmailComponent,
    children: [{ path: "email-adress/:id", component: VerifyEmailComponent }],
  },
  {
    path: "forget-password",
    component: ForgetPasswordComponent,
    children: [{ path: "password/:id", component: ForgetPasswordComponent }],
  },
  {
    path: "admin/login/cusotmer-service",
    component: LoginAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [LoginComponent, HomeComponent];
