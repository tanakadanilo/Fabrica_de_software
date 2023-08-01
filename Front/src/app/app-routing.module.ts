import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './tela/perfil/perfil.component';
import { MainComponent } from './tela/main/main.component';
import { LoginComponent } from './tela/login/login.component';

const routes: Routes = [
  { path: 'perfil', component: PerfilComponent },
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
