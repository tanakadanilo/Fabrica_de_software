import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { PrestadorService } from 'src/app/exports/service/prestador.service';
import { Servico } from 'src/app/exports/interface/servico';
import { Prestador } from 'src/app/exports/interface/prestador';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';
import { ServicosService } from 'src/app/exports/service/servicos.service';
import { MultiSelectModule } from 'primeng/multiselect';

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

  constructor(
    override service: PrestadorService,
    route: ActivatedRoute,
    private servicoService: ServicosService,
    private navigate: Router
  ) {
    super(service, route);
  }

  override ngOnInit() {
    let id: number = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.carregarPrestador(id);
    this.carregarServicos();
    // Aqui você pode acessar e manipular os dados da lista de áreas de atuação e serviços prestados
    if (this.prestador) {
      // Acessa as áreas de atuação
      //const areasDeAtuacao: string = this.prestador.especializacao;
      // const servicosPrestados: string[] = this.prestador.servicosPrestados;
      
      // Faça o que precisar com as áreas de atuação e serviços prestados
      //console.log('Áreas de Atuação:', areasDeAtuacao);
      //console.log('Serviços Prestados:', this.servicosPrestados);
    }
  }

  carregarPrestador(id: number) {
    this.service.getPrestador(id).then((data) => {
      this.prestador = data.data;
      console.log(this.prestador);
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

  servicoSelecionado: { [key: string]: Servico } = {};

  enviarServicosSelecionados(): void {
    this.servicoService.servicosListados = Object.keys(this.servicoSelecionado).filter(servico => 
      this.servicoSelecionado[servico]);
      console.log(this.servicoSelecionado);
      //this.navigate.navigate(["/contratar"]);
  }
}