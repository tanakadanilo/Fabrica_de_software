import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilPrestadorComponent } from './tela/perfil-prestador/perfil-prestador.component';
import { MainComponent } from './tela/main/main.component';
import { LoginComponent } from './tela/login/login.component';
import { CadastroComponent } from './tela/cadastro-contratante/cadastro-contratante.component';
import { ContratarComponent } from './tela/contratar/contratar.component';
import { BaseResolver } from './exports/resolver/base-resolver';

const routes: Routes = [
  {
    path: 'perfil/:id',
    component: PerfilPrestadorComponent,
    resolve: {
      id: BaseResolver,
    },
  },
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'cadastrar', component: CadastroComponent, pathMatch: 'full' },
  {
    path: 'contratar/:id',
    component: ContratarComponent,
    pathMatch: 'full',
    resolve: {
      id: BaseResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
