import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { RegisterPrestadorComponent } from './register-prestador/register-prestador.component';
import { RegisterComponent } from './register/register.component';
import { PerfiluserComponent } from './perfiluser/perfiluser.component';
import { PerfilprestadorComponent } from './perfilprestador/perfilprestador.component';
import { LoggoutComponent } from './exports/loggout/loggout.component';


const routes: Routes = [
  { path: '', component: MainComponent, pathMatch:'full' },
  { path: 'loggout', component: LoggoutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'recovery', component: RecoveryComponent},
  { path: 'main', component: MainComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'registerp', component: RegisterPrestadorComponent},
  { path: 'userprofile', component: PerfiluserComponent},
  { path: 'perfilprestador', component: PerfilprestadorComponent},]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
