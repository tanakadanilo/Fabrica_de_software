import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropostaContratacao } from 'src/app/exports/interface/contratacaoServico';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { ServicosService } from 'src/app/exports/service/servicos.service';

@Component({
  selector: 'app-contratar',
  templateUrl: './contratar.component.html',
  styleUrls: ['./contratar.component.css'],
})
export class ContratarComponent implements OnInit {
  servicosLista!: any[];
  constructor(
    private service: ServicosService,
    private route: ActivatedRoute,
    private serviceService: BaseServiceService
  ) {}
  servicos!: PropostaContratacao[];
  date: Date = new Date();

  ngOnInit(): void {
       this.servicos = this.service.servicosListados;
       console.log(this.servicos);
}

  abrirPerfilPrestador() {
    this.service.navigate('/perfil/' + this.servicos[0].prestador.id);
  }
}
