import { Component } from '@angular/core';

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

export class HistoricoComponent {
  Status = Status;

  list : serv[] = [
    {
  nome: 'Erick',
  cidade: 'Goiânia',
  area: 'Medicina',
  servico: 'Consertar dedo quebrado',
  valor: '100,00',
  data: '12/12/2023',
  status: Status.EM_ANALISE,
  },
  {
    nome: 'Erick',
    cidade: 'Goiânia',
    area: 'Medicina',
    servico: 'Consertar dedo quebrado',
    valor: '100,00',
    data: '12/12/2023',
    status: Status.EM_ANALISE,
    },
    {
      nome: 'Erick',
      cidade: 'Goiânia',
      area: 'Medicina',
      servico: 'Consertar dedo quebrado',
      valor: '100,00',
      data: '12/12/2023',
      status: Status.EM_ANALISE,
      },
      {
        nome: 'Erick',
        cidade: 'Goiânia',
        area: 'Medicina',
        servico: 'Consertar dedo quebrado',
        valor: '100,00',
        data: '12/12/2023',
        status: Status.EM_ANALISE,
        },
        {
          nome: 'Erick',
          cidade: 'Goiânia',
          area: 'Medicina',
          servico: 'Consertar dedo quebrado',
          valor: '100,00',
          data: '12/12/2023',
          status: Status.EM_ANALISE,
          },
          {
            nome: 'Erick',
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
