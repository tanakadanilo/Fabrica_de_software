import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilPrestadorComponent } from './tela/perfil-prestador/perfil-prestador.component';
import { MainComponent } from './tela/main/main.component';
import { LoginComponent } from './tela/login/login.component';
import { CadastroComponent } from './tela/cadastro-contratante/cadastro-contratante.component';
import { CadastroPrestadorComponent } from './tela/cadastro-prestador/cadastro-prestador.component';
import { BaseResolver } from './exports/resolver/base-resolver';
import { ContratarComponent } from './tela/contratar/contratar.component';
import { PerfilContratanteComponent } from './tela/perfil-contratante/perfil-contratante.component';
import { AvaliarComponent } from './tela/avaliar/avaliar.component';
import { HistoricoComponent } from './tela/historico/historico.component';
import { FinalizarContratacaoComponent } from './tela/finalizar-contratacao/finalizar-contratacao.component';
import { RecuperarSenhaComponent } from './tela/recuperar-senha/recuperar-senha.component';
import { ContratoComponent } from './tela/contrato/contrato.component';
import { EditarPerfilContratanteComponent } from './tela/editar-perfil-contratante/editar-perfil-contratante.component';
import { EditarPerfilPrestadorComponent } from './tela/editar-perfil-prestador/editar-perfil-prestador.component';


const routes: Routes = [
  {
    path: 'perfil/:id',
    component: PerfilPrestadorComponent,
    resolve: {
      id: BaseResolver,
    },
  },
  {
    path: 'perfilu/:id',
    component: PerfilContratanteComponent,
    resolve: {
      id: BaseResolver,
    },
  },
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'cadastrar', component: CadastroComponent, pathMatch: 'full' },
  {
    path: 'contratar',
    component: ContratarComponent,
    pathMatch: 'full',
  },
  {
    path: 'avaliar/:id',
    component: AvaliarComponent,
    pathMatch: 'full',
    resolve: {
      id: BaseResolver,
    },
  },
  {
    path: 'historico',
    component: HistoricoComponent,
    pathMatch: 'full',
    resolve: {
      id: BaseResolver,
    },
  },
  {
    path: 'contratado/:id',
    component:FinalizarContratacaoComponent,
    pathMatch: 'full',
    resolve: {
      id: BaseResolver,
    },
  },
  {
    path: 'cadastrarp',
    component: CadastroPrestadorComponent,
    pathMatch: 'full',
  },
  {
    path: 'recuperar',
    component: RecuperarSenhaComponent,
    pathMatch: 'full',
  },
  {
    path: 'contrato',
    component: ContratoComponent,
    pathMatch: 'full',
  },
  {
    path: 'editarc/:id',
    component: EditarPerfilContratanteComponent,
    pathMatch: 'full',
  },
  {
    path: 'editarp/:id',
    component: EditarPerfilPrestadorComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
