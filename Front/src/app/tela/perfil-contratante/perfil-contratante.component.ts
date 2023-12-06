import { Contratante } from './../../exports/interface/contratante';
import { Component } from '@angular/core';
import { Servico } from 'src/app/exports/interface/servico';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';
import { Response } from 'src/app/exports/interface/response';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratanteService } from 'src/app/exports/service/contratante.service';
import { AuthenticationServiceService } from 'src/app/exports/service/authentication-service.service';

@Component({
  selector: 'app-perfil-contratante',
  templateUrl: './perfil-contratante.component.html',
  styleUrls: ['./perfil-contratante.component.css'],
})
export class PerfilContratanteComponent extends TelaBaseComponent {
  servicos!: Servico[];
  contratante!: any;
  servicosPagina: any;
  mostrarDialog: boolean = false;
  isEditable:boolean = false;

  constructor(
    protected override service: ContratanteService,
    protected override route: ActivatedRoute,
    private authenticationService: AuthenticationServiceService,
    private navigate : Router,
  ) {
    super(service, route);
  }

  override ngOnInit(): void {
    let id = this.route.snapshot.data['id'];
    this.service.getContratante(id).then((data) => {
      this.contratante = data.data;
      if (
        this.authenticationService.getPessoa() &&
        this.authenticationService.getPessoa()?.id
      ) {
        this.isEditable =
          this.authenticationService.getPessoa()?.id == this.contratante.id;
      }
    });
  }

  editar(){
    this.navigate.navigate(['editarc/' + this.contratante.id]);
  }

  verHistorico(){
    this.navigate.navigate(['historico']);
  }

}
