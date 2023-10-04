import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Uf } from 'src/app/exports/enum/uf';
import { Contratante } from 'src/app/exports/interface/contratante';
import { Paginavel } from 'src/app/exports/interface/paginavel';
import { Response } from 'src/app/exports/interface/response';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { ContratanteService } from 'src/app/exports/service/contratante.service';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-contratante.component.html',
  styleUrls: ['./cadastro-contratante.component.css'],
})
export class CadastroComponent extends TelaBaseComponent {
  contratante!: Contratante;
  ufs: Uf[];
  ufSelecionada: Uf = Uf.AC;
  constructor(
    override service: ContratanteService,
    protected override route: ActivatedRoute
  ) {
    super(service, route);
    this.ufs = Object.values(Uf);
    this.contratante = service.getContratanteVazio();
  }
}
