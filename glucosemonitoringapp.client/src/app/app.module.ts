import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//PrimeNG
import { CommonModule } from '@angular/common';

import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    RouterModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
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
