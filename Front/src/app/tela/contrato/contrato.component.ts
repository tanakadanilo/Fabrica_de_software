import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from 'primeng/toast';
import { PropostaContratacao } from 'src/app/exports/interface/contratacaoServico';
import { Contratante } from 'src/app/exports/interface/contratante';
import { Prestador } from 'src/app/exports/interface/prestador';
import { ServicoPrestado } from 'src/app/exports/interface/servico-prestado';
import { AuthenticationServiceService } from 'src/app/exports/service/authentication-service.service';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { PrestadorService } from 'src/app/exports/service/prestador.service';
import { ServicosService } from 'src/app/exports/service/servicos.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css']
})
export class ContratoComponent implements OnInit{
  propostaContrato : PropostaContratacao[] = [];

  constructor(
    private service : ServicosService,
    private prestadorService : PrestadorService,
    private baseService : BaseServiceService,
    private navigate : Router,
    private authenticationService:AuthenticationServiceService
  ){}

  servicos!: ServicoPrestado[];
  date: Date = this.service.date;
  valorTotal!: number;

  ngOnInit(): void {
    this.valorTotal = this.baseService.valorTotal;
    console.log(this.valorTotal);
      this.service.getServicoDetail(this.service.servicosListados[0].id).then( variavel => {
        this.prestadorService.getPrestador(variavel.data.idPrestador).then( (variavel2: { data: Prestador; }) => {
          this.service.servicosListados.forEach(variavel3 => {
          if(this.propostaContrato){
            this.propostaContrato.push({ prestador : variavel2.data, 
                                    contratante : this.authenticationService.getPessoa() as Contratante,
                                    servicoPrestado : variavel3,
                                    dataContratacao : this.date
                                  });
                                }
        });
      })
    })
  }

  contratar() {
    this.propostaContrato.forEach(variavel => {
      this.service.adicionarNoHistorico(variavel).then(variavel => {
        console.log(variavel);
      });
    });


    this.baseService.toastSuccess([
      "A proposta foi enviada com sucesso",
      "Um email será enviado para o prestador e ele entrará em contato para definir os pontos faltantes caso aceite."
]);

    this.navigate.navigate(['']);

}
  
}
