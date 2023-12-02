import { Prestador } from 'src/app/exports/interface/prestador';
import { Component } from '@angular/core';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { Uf } from 'src/app/exports/enum/uf';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';
import { ActivatedRoute } from '@angular/router';
import { PrestadorService } from 'src/app/exports/service/prestador.service';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.component.html',
  styleUrls: ['./cadastro-prestador.component.css'],
})
export class CadastroPrestadorComponent extends TelaBaseComponent {
  prestador!: Prestador;
  ufs!: Uf[];
  ufSelecionada: Uf = Uf.AM;
  cities: any;
  constructor(
    override service: PrestadorService,
    protected override route: ActivatedRoute
  ) {
    super(service, route);
  }

  override ngOnInit(): void {
    this.ufs = Object.values(Uf);
    this.prestador = this.service.getPrestadorVazio();
    this.service.getPrestadorVazio();
  }

  cadastrar(){
    if(!this.service.base64String){
      this.service.toastError(["Informe a imagem de perfil!"]);
      return;
    }
    this.prestador.endereco.uf = Uf[this.prestador.endereco.uf];
    this.prestador.foto = this.service.base64String;
    this.service.cadastrarPrestador(this.prestador).then(x=>{
      console.log(x);
    })
  }
}
