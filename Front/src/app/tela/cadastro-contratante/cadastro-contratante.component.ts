import { Component } from '@angular/core';
import { Uf } from 'src/app/exports/enum/uf';
import { Contratante } from 'src/app/exports/interface/contratante';
import { Prestador } from 'src/app/exports/interface/prestador';
import { Servico } from 'src/app/exports/interface/servico';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro-contratante.component.html',
  styleUrls: ['./cadastro-contratante.component.css']
})
export class CadastroComponent {
  contratante! : Contratante;
  ufs:any;
  ufSelecionada:any = '';
  cities:any;
  constructor(private service: BaseServiceService){
    this.ufs = Object.values(Uf);
    this.contratante = service.getContratanteVazio();
  service.getContratante(2).subscribe({
      next: (a: any) => {

        if (a.erros?.length > 0) {
          this.service.toast("erro");

        } else {
          console.log(a.data);
this.contratante = a.data
        }
      },
      error: (err) => {
        this.service.toast('senha errada');
        console.log(err);
      },
    });
  }
}
