import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItemGroup } from 'primeng/api';
import { PropostaContratacao } from 'src/app/exports/interface/contratacaoServico';
import { Prestador } from 'src/app/exports/interface/prestador';
import { ServicoPrestado } from 'src/app/exports/interface/servico-prestado';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { PrestadorService } from 'src/app/exports/service/prestador.service';
import { ServicosService } from 'src/app/exports/service/servicos.service';

@Component({
  selector: 'app-contratar',
  templateUrl: './contratar.component.html',
  styleUrls: ['./contratar.component.css'],
})
export class ContratarComponent implements OnInit {
  
  servicosLista!: any[];
  prestador! : Prestador;
  valorTotal = 0;
  constructor(
    private service: ServicosService,
    private prestadorService : PrestadorService,
    private navigate : Router,
    private baseService : BaseServiceService,
  ) {}
  servicos!: ServicoPrestado[];
  date: Date = new Date();

  ngOnInit(): void {
        this.servicos = this.service.servicosListados;
        this.servicos.forEach( servico => {
        this.valorTotal += servico.valor;
      })
      this.baseService.valorTotal = this.valorTotal;
      this.service.getServicoDetail(this.servicos[0].id!).then( variavel => {
        this.prestadorService.getPrestador(variavel.data.idPrestador).then( variavel2 => {
          this.prestador = variavel2.data;
        });
      })
}

  verContrato(){
    this.navigate.navigate(['contrato']);
    this.service.date = this.date;
  }

}
