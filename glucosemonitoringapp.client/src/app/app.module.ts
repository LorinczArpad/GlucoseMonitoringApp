import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//PrimeNG
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { PatientViewComponent } from './patient/patient-view/patient-view.component';
import { PatientSelectorComponent } from './patient/patient-selector/patient-selector.component';
import { JwtInterceptorService } from '../services/interceptors/jwt-interceptor.service';
import { API_BASE_URL } from '../services/httpClient/httpClient';
import { environment } from '../enviroments/enviroment';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    HeaderComponent,
    ToastModule,
  ],
  providers: [
    MessageService,
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideClientHydration(),
    {
      provide: API_BASE_URL,
      useValue: environment.apiBaseUrl,
    },
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
