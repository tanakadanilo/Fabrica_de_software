import { Component } from '@angular/core';
import { Servico } from 'src/app/exports/interface/servico';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { Prestador } from 'src/app/exports/interface/prestador';

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
export class PerfilPrestadorComponent {
  servicos!: Servico[];
  prestador!: Prestador;
  servicosPagina: any;
  mostrarDialog: boolean = false;

  constructor(private servico: BaseServiceService) {
    servico.getPrestador(2).subscribe({
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
    servico.getServicos().subscribe({
      next: (a: any) => {
        if (a.erros?.lenght > 0) {
        } else {
          this.servicos = a.data;
          this.servicosPagina = this.servicos.slice(0, 5);
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
