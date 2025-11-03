import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

import { PatientViewComponent } from './patient/patient-view/patient-view.component';
import { PatientSelectorComponent } from './patient/patient-selector/patient-selector.component';


@NgModule({
  declarations: [
    AppComponent,
    PatientSelectorComponent,
    PatientViewComponent,

  ],
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    HeaderComponent
  ],
  providers: [ 
    provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })],
  bootstrap: [AppComponent]
})
export class AppModule { }
