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
  CANCELADA
}
@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})

export class HistoricoComponent implements OnInit{
  Status = Status;
  list!: []

  constructor(
    private contratanteService : ContratanteService,
  ){}

  ngOnInit(): void {
    
  }



  getStatusDescricao(status: Status): string {
    switch (status) {
      case Status.EM_ANALISE:
        return 'Em Análise';
      case Status.AGENDADA:
        return 'Agendada';
      case Status.INICIADA:
        return 'Iniciada';
      case Status.FINALIZADA:
        return 'Finalizada';
      case Status.CANCELADA:
        return 'Cancelada';
      default:
        return '';
    }
  }

  getStatusBackgroundColor(status: Status): string {
    switch (status) {
      case Status.EM_ANALISE:
        return 'lightyellow';
      case Status.AGENDADA:
        return 'lightgreen';
      case Status.INICIADA:
        return 'lightblue';
      case Status.FINALIZADA:
        return 'lightgray';
      case Status.CANCELADA:
        return 'lightred';
      default:
        return '';
    }
  }
}
