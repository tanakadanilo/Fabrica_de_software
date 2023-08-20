import { Prestador } from 'src/app/exports/interface/prestador';
import { Component } from '@angular/core';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { Uf } from 'src/app/exports/enum/uf';

@Component({
  selector: 'app-cadastro-prestador',
  templateUrl: './cadastro-prestador.component.html',
  styleUrls: ['./cadastro-prestador.component.css']
})
export class CadastroPrestadorComponent {
  prestador! : Prestador;
  ufs:any;
  ufSelecionada:any = '';
  cities:any;
  constructor(private service: BaseServiceService){
    this.ufs = Object.values(Uf);
    this.prestador = service.getPrestadorVazio();
  service.getPrestador(2).subscribe({
      next: (a: any) => {

        if (a.erros?.length > 0) {
          this.service.toast("erro");

        } else {
          console.log(a.data);
this.prestador = a.data
        }
      },
      error: (err) => {
        this.service.toast('senha errada');
        console.log(err);
      },
    });
  }
}
