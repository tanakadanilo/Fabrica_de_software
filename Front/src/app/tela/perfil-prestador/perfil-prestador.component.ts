import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { PrestadorService } from 'src/app/exports/service/prestador.service';
import { Servico } from 'src/app/exports/interface/servico';
import { Prestador } from 'src/app/exports/interface/prestador';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';
import { ServicosService } from 'src/app/exports/service/servicos.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectItemGroup } from 'primeng/api';
import { ServicoPrestado } from 'src/app/exports/interface/servico-prestado';
import { AuthenticationServiceService } from 'src/app/exports/service/authentication-service.service';

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
  prestador!: Prestador;
  isEditable: boolean = false;
  constructor(
    override service: PrestadorService,
    route: ActivatedRoute,
    private servicoService: ServicosService,
    private navigate: Router,
    private authenticationService: AuthenticationServiceService
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
      if (
        this.authenticationService.getPessoa() &&
        this.authenticationService.getPessoa()?.id
      ) {
        this.isEditable =
          this.authenticationService.getPessoa()?.id == this.prestador.id;
      }
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

  servicoSelecionado!: ServicoPrestado[];

  enviarServicosSelecionados(): void {
    if(!this.servicoSelecionado || this.servicoSelecionado.length === 0){ 
      this.servicoService.toastError(["Nenhum serviço selecionado!"]);
      return;
    }
    this.servicoService.servicosListados = this.servicoSelecionado;
    this.navigate.navigate(['contratar']);
  }

  editar(){
    this.navigate.navigate(['editarp/' + this.prestador.id]);
  }

  verHistorico(){
    this.navigate.navigate(['historico']);
  }
}
