import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { AppComponent } from './app.component';
import { PatientSelectorComponent } from './patient/patient-selector/patient-selector.component';
import { PatientViewComponent } from './patient/patient-view/patient-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'patient-selector', component: PatientSelectorComponent },
  { path: 'patient-view/:id', component: PatientViewComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
