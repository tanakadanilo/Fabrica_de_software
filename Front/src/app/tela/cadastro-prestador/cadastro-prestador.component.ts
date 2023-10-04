import { Prestador } from 'src/app/exports/interface/prestador';
import { Component } from '@angular/core';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { Uf } from 'src/app/exports/enum/uf';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.component.html',
  styleUrls: ['./cadastro-prestador.component.css'],
})
export class CadastroPrestadorComponent extends TelaBaseComponent {
  prestador!: Prestador;
  ufs: any;
  ufSelecionada: any = '';
  cities: any;
  constructor(override service: BaseServiceService, protected override route: ActivatedRoute) {
    super(service, route);
    this.ufs = Object.values(Uf);
    this.prestador = service.getPrestadorVazio();
    service.getPrestador(2).subscribe({
      next: (a: any) => {
        if (a.erros?.length > 0) {
          this.toastError(a.erros);
        } else {
          console.log(a.data);
          this.prestador = a.data;
        }
      },
      error: (err) => {
        this.toastError(err);
        console.log(err);
      },
    });
  }
}
