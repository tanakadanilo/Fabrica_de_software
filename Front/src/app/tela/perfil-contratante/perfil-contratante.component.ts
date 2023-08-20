import { Contratante } from './../../exports/interface/contratante';
import { Component } from '@angular/core';
import { Servico } from 'src/app/exports/interface/servico';

@Component({
  selector: 'app-perfil-contratante',
  templateUrl: './perfil-contratante.component.html',
  styleUrls: ['./perfil-contratante.component.css']
})
export class PerfilContratanteComponent {
  servicos!: Servico[];
  contratante!: Contratante;
  servicosPagina: any;
  mostrarDialog: boolean = false;

}
