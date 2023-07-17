import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './tela/perfil/perfil.component';
import { MainComponent } from './tela/main/main.component';


const routes: Routes = [{ path: 'perfil', component: PerfilComponent },
{ path: '', component: MainComponent , pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
