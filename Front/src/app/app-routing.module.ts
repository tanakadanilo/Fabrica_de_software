import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { RegisterPrestadorComponent } from './register-prestador/register-prestador.component';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch:'full' },
  { path: 'login', component: LoginComponent},
  { path: 'recovery', component: RecoveryComponent},
  { path: 'main', component: MainComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'registerp', component: RegisterPrestadorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
