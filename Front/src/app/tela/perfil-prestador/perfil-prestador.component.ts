import { Component } from '@angular/core';
import { Servico } from 'src/app/exports/interface/servico';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { Prestador } from 'src/app/exports/interface/prestador';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil-prestador.component.html',
  styleUrls: ['./perfil-prestador.component.css'],
})
export class PerfilPrestadorComponent {
  servicos!: Servico[];
  prestador!: Prestador;

  constructor(private servico: BaseServiceService) {
    servico.getPrestador(2).subscribe({
      next: (a: any) => {
        if (a.erros?.lenght > 0) {
        } else {
          console.log(a.data);
          this.prestador = a.data;
        }
      },
      error(err) {
        console.log(err);
      },
    });
    servico.getServicos().subscribe({
      next: (a: any) => {
        if (a.erros?.lenght > 0) {
        } else {
          console.log(a.data);
          this.servicos = a.data;
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
