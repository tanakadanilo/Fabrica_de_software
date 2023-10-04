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
    this.prestador = this.service.getPrestadorVazio();

    this.service
      .getPrestador(parseInt(this.route.snapshot.paramMap.get('id')!))
      .subscribe({
        next: (a: any) => {
          if (a.erros?.lenght > 0) {
          } else {
            this.prestador = a.data;
          }
        },
        error(err) {
          console.log(err);
        },
      });
    this.servicoService.getServicos().subscribe({
      next: (a: any) => {
        if (a.erros?.lenght > 0) {
        } else {
          this.servicos = a.data.content;
          this.servicosPagina = this.servicos.slice(0, 5);
          console.log(this.servicosPagina);
        }
      },
      error(err) {
        console.log(err);
      },
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
