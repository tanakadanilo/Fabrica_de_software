import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Prestador } from 'src/app/exports/interface/prestador';
import { Servico } from 'src/app/exports/interface/servico';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { PrestadorService } from 'src/app/exports/service/prestador.service';
import { ServicosService } from 'src/app/exports/service/servicos.service';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent extends TelaBaseComponent {
  prestador!: Prestador[];

  categorias!: string[];

  constructor(
    override service: ServicosService,
    protected override route: ActivatedRoute,
    private prestadorService: PrestadorService,
    private navigate: Router
  ) {
    super(service, route);
    this.getCategorias();
  }

  entrarPerfil(id: number){
    this.navigate.navigate(["/perfil/" + id]);
  }

  filtrarPorCategoria(categoria: string){
    this.prestadorService.getPrestadorCategoria(categoria).then((prestadoresFiltrados)=> {
      this.prestador = prestadoresFiltrados.data.content;
    });
  }

  override ngOnInit(): void {
    this.prestadorService.getAllPrestador().then((prestadores) => {
      this.prestador = prestadores.data.content;
    })
  }

  public getCategorias(): void {
    this.service.getCategorias().then((data) => {
      this.categorias = data.data.content;
    });
  }

  contratar(servico: Servico) {
    this.service.navigate('/contratar/' + servico.id);
  }

  teste() {
    this.service.getServicoDetail(2).then((data) => {
      console.log(data);
    });
  }
}
