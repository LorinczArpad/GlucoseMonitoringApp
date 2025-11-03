import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { AppComponent } from './app.component';
import { PatientSelectorComponent } from './patient/patient-selector/patient-selector.component';

const routes: Routes = [


    { path: 'login', component: LoginComponent },
    { path: 'patient-selector', component: PatientSelectorComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },

    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    
    { path: '**', component: AppComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
