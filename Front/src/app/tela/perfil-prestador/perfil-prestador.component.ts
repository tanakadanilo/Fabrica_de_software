import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { PrestadorService } from 'src/app/exports/service/prestador.service';
import { Servico } from 'src/app/exports/interface/servico';
import { Prestador } from 'src/app/exports/interface/prestador';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';
import { ServicosService } from 'src/app/exports/service/servicos.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.css'],
})
export class PerfilPrestadorComponent extends TelaBaseComponent {
  servicos!: Servico[];
  servicosPagina: any;
  mostrarDialog: boolean = false;

  //prestador temporário para testes
  prestador!: Prestador;

  constructor(
    override service: PrestadorService,
    route: ActivatedRoute,
    private servicoService: ServicosService
  ) {
    super(service, route);
  }

  override ngOnInit() {
    let id: number = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.carregarPrestador(id);
    this.carregarServicos();
  }

  carregarPrestador(id: number) {
    this.service.getPrestador(id).then((data) => {
      this.prestador = data.data;
    });
  }

  carregarServicos() {
    this.servicoService.getServicos().then((data) => {
      this.servicos = data.data.content;
      this.servicosPagina = this.servicos.slice(0, 5);
    });
  }
  mudarPagina(event: PageEvent) {
    this.servicosPagina = this.servicos.slice(
      event.first,
      event.first + event.rows
    );
  }

  showDialog() {
    this.mostrarDialog = true;
  }
}
