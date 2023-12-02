import { Component, OnInit } from '@angular/core';
import { PropostaContratacao } from 'src/app/exports/interface/contratacaoServico';
import { Prestador } from 'src/app/exports/interface/prestador';
import { ServicoPrestado } from 'src/app/exports/interface/servico-prestado';
import { ContratanteService } from 'src/app/exports/service/contratante.service';
import { PrestadorService } from 'src/app/exports/service/prestador.service';
import { ServicosService } from 'src/app/exports/service/servicos.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit{
  propostaContrato! : PropostaContratacao;

  constructor(
    private contratanteService : ContratanteService,
    private service : ServicosService,
    private prestadorService : PrestadorService,
  ){}

  servicos!: ServicoPrestado[];
  date: Date = this.service.date;

  ngOnInit(): void {
      this.service.getServicoDetail(this.service.servicosListados[0].id).then( variavel => {
        this.prestadorService.getPrestador(variavel.data.idPrestador).then( (variavel2: { data: Prestador; }) => {
          this.propostaContrato = { prestador : variavel2.data, 
                                    contratante : this.contratanteService.user,
                                    servicoPrestado : this.service.servicosListados,
                                    dataContratacao : this.date
                                  };
                                  console.log(this.propostaContrato.prestador.endereco);
        });
      })
      
  }

  
}
