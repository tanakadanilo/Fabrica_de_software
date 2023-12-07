import { Component, OnInit } from '@angular/core';
import { ContratanteService } from 'src/app/exports/service/contratante.service';

interface serv{
  nome:any;
  cidade:any;
  area:any;
  servico:any;
  valor:any;
  data:any;
  status: Status; 
}

enum Status{
  EM_ANALISE,
  AGENDADA,
  INICIADA,
  FINALIZADA,
  CANCELADA,
  RECUSADA,
  EXPIRADA,
}
@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})

export class HistoricoComponent implements OnInit{
  Status = Status;
  
  constructor(
    private contratanteService : ContratanteService,
  ){}
  
  ngOnInit(): void {
    
  }


  list : serv[] = [
    {
  nome: 'erick',
  cidade: 'Goiânia',
  area: 'Medicina',
  servico: 'Consertar dedo quebrado',
  valor: '100,00',
  data: '12/12/2023',
  status: Status.EM_ANALISE,
  },
  ]

  getStatusDescricao(status: Status): string {
    switch (status) {
      case Status.EM_ANALISE:
        return 'Em Análise';
      case Status.RECUSADA:
        return 'Recusada';
      case Status.AGENDADA:
        return 'Agendada';
      case Status.INICIADA:
        return 'Iniciada';
      case Status.FINALIZADA:
        return 'Finalizada';
      case Status.CANCELADA:
        return 'Cancelada';
      case Status.EXPIRADA:
        return 'Expirada';
    }
  }

  getStatusBackgroundColor(status: Status): string {
    switch (status) {
      case Status.EM_ANALISE:
        return '#fdfd96';
      case Status.AGENDADA:
        return '#acdeaa';
      case Status.INICIADA:
        return '#b3e5fc';
      case Status.FINALIZADA:
        return 'hsla(300, 46%, 41%, 0.562)';
      case Status.CANCELADA:
        return '#e95e6c';
      case Status.RECUSADA:
        return '#e95e6c';
      case Status.EXPIRADA:
        return '#e95e6c';
    }
  }
  aceitar() {
    this.list[0].status = this.Status.AGENDADA;
  }
  recusar() {
    this.list[0].status = this.Status.RECUSADA;
  }
  cancelar() {
    this.list[0].status = this.Status.CANCELADA;
  }
  finalizar() {
    this.list[0].status = this.Status.FINALIZADA;
  }
}
