import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilPrestadorComponent } from './tela/perfil-prestador/perfil-prestador.component';
import { MainComponent } from './tela/main/main.component';
import { LoginComponent } from './tela/login/login.component';
import { CadastroComponent } from './tela/cadastro-contratante/cadastro-contratante.component';

const routes: Routes = [
  { path: 'perfil', component: PerfilPrestadorComponent },
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'cadastrar', component: CadastroComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
