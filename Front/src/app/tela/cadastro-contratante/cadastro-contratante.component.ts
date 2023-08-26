import { Component } from '@angular/core';
import { Uf } from 'src/app/exports/enum/uf';
import { Contratante } from 'src/app/exports/interface/contratante';
import { Prestador } from 'src/app/exports/interface/prestador';
import { Servico } from 'src/app/exports/interface/servico';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-contratante.component.html',
  styleUrls: ['./cadastro-contratante.component.css'],
})
export class CadastroComponent extends TelaBaseComponent {
  contratante!: Contratante;
  ufs: any;
  ufSelecionada: any = '';
  cities: any;
  constructor(override service: BaseServiceService) {
    super(service);
    this.ufs = Object.values(Uf);
    this.contratante = service.getContratanteVazio();
    service.getContratante(2).subscribe({
      next: (a: any) => {
        if (a.erros?.length > 0) {
          this.toastError(a.erros);
        } else {
          console.log(a.data);
          this.contratante = a.data;
        }
      },
      error: (err) => {
        this.toastError(err);
        console.log(err);
      },
    });
  }
}
