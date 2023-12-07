import { Component, OnInit } from '@angular/core';
import { StatusServico } from 'src/app/exports/enum/status-servico';
import { Contratante } from 'src/app/exports/interface/contratante';
import { HistoricoServico } from 'src/app/exports/interface/historico-servico';
import { Prestador } from 'src/app/exports/interface/prestador';
import { AuthenticationServiceService } from 'src/app/exports/service/authentication-service.service';
import { ContratanteService } from 'src/app/exports/service/contratante.service';
import { PrestadorService } from 'src/app/exports/service/prestador.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css'],
})
export class HistoricoComponent implements OnInit {
  historicos!: HistoricoServico[];
  pessoa!: Contratante | Prestador;

  constructor(
    private contratanteService: ContratanteService,
    private usuarioService: AuthenticationServiceService,
    private prestadorService : PrestadorService,
  ) {}

  ngOnInit(): void {
    this.pessoa = this.usuarioService.getPessoa()!;
    if(this.usuarioService.getUsuario()?.prestador){
      this.prestadorService
    .getHistoricoPrestador(this.pessoa.id)
    .then((historicos) => {
      this.historicos = historicos.data;
      console.log(this.historicos);
    });
    } else {
    this.contratanteService
    .getHistoricoContratante(this.pessoa.id)
    .then((historicos) => {
      this.historicos = historicos.data;
      console.log(this.historicos);
    });
  }
  }

  getStatusDescricao(status: StatusServico): string {
    switch (status) {
      case StatusServico.EM_ANALISE:
        return 'Em Análise';
      case StatusServico.RECUSADA:
        return 'Recusada';
      case StatusServico.AGENDADA:
        return 'Agendada';
      case StatusServico.INICIADA:
        return 'Iniciada';
      case StatusServico.FINALIZADA:
        return 'Finalizada';
      case StatusServico.CANCELADA:
        return 'Cancelada';
      case StatusServico.EXPIRADA:
        return 'Expirada';
    }
  }

  getStatusBackgroundColor(status: StatusServico): string {
    switch (status) {
      case StatusServico.EM_ANALISE:
        return '#fdfd96';
      case StatusServico.AGENDADA:
        return '#acdeaa';
      case StatusServico.INICIADA:
        return '#b3e5fc';
      case StatusServico.FINALIZADA:
        return 'hsla(300, 46%, 41%, 0.562)';
      case StatusServico.CANCELADA:
        return '#e95e6c';
      case StatusServico.RECUSADA:
        return '#e95e6c';
      case StatusServico.EXPIRADA:
        return '#e95e6c';
    }
  }

  mudarStatusServico(historicoServico: HistoricoServico, statusNovo: string) {
    this.contratanteService
      .mudarStatusHistoricoServico(historicoServico.id!, statusNovo)
      .then((historico) => {
        console.log(historico);
        historicoServico.status = historico.data.status;
      });
  }
}
