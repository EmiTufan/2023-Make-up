import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { VerifyEmailComponent } from "./verify-email-adress/verify-email/verify-email.component";
import { JwtInterceptor } from "src/interceptor/token.interceptor";
import { ForgetPasswordComponent } from './forget-password/forget-password/forget-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { AngularTypewriterEffectModule } from 'angular-typewriter-effect';
import { CarouselModule } from 'ngx-owl-carousel-o';
import {NgTiltModule} from '@geometricpanda/angular-tilt';
import { LightgalleryModule } from 'lightgallery/angular';
import { ImgGaleryComponent } from './img-gallery/img-galery/img-galery.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { HeaderComponent } from './dashboard/header/header/header.component';
import { SideNavComponent } from './dashboard/side-nav/side-nav.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
  // * MATERIAL IMPORTS
import { MatSidenavModule } from '@angular/material/sidenav';  
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatNativeDateModule} from '@angular/material/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MenuDashboardComponent } from './dashboard/menu-dashboard/menu-dashboard.component';
import { CalendarDashboardComponent } from './dashboard/calendar-dashboard/calendar-dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';

import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { SettingsDashboardComponent } from './dashboard/settings-dashboard/settings-dashboard.component';

import {Angular2ImageGalleryModule} from 'angular2-image-gallery';
import { DashboardClientComponent } from './dashboard-client/dashboard-client/dashboard-client.component';
import { HeaderClientComponent } from './dashboard-client/header-client/header-client.component';
import { SideNavClientComponent } from './dashboard-client/side-nav-client/side-nav-client.component';
import { AppointmentsNavClientComponent } from './dashboard-client/appointments-nav-client/appointments-nav-client.component'
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { MatTimepickerModule } from 'mat-timepicker';
import { MatInputModule } from '@angular/material/input';
import { LoginAdminComponent } from './login-admin/login-admin/login-admin.component';
import { MatAlertModule } from '@lhn/mat-alert';
import { NgToastModule } from 'ng-angular-popup';
import { HistoryOrderComponent } from './dashboard-client/history/history-order/history-order.component' 
import {MatTabsModule} from '@angular/material/tabs';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    VerifyEmailComponent,
    ForgetPasswordComponent,
    ImgGaleryComponent,
    HeaderComponent,
    SideNavComponent,
    HomeDashboardComponent,
    MenuDashboardComponent,
    CalendarDashboardComponent,
    SettingsDashboardComponent,
    DashboardClientComponent,
    HeaderClientComponent,
    SideNavClientComponent,
    AppointmentsNavClientComponent,
    LoginAdminComponent,
    HistoryOrderComponent,
    
  ],
  imports: [
    NgxMaskModule.forRoot(),
    BrowserModule,
    MatAlertModule,
    FullCalendarModule,
    MatSliderModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularTypewriterEffectModule,
    CarouselModule,
    NgTiltModule,
    LightgalleryModule,
    NgxPaginationModule,
    Angular2ImageGalleryModule,
    MatTimepickerModule,
    MatInputModule,
      // * MATERIAL IMPORTS
    NgxMatTimepickerModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    ImageCropperModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatDialogModule,
    MatDatepickerModule,
    MatButtonModule,
    NgToastModule,
    MatTabsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: JwtInterceptor },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
