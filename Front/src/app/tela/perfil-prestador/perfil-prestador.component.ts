import { Component } from '@angular/core';
import { Servico } from 'src/app/exports/interface/servico';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { Prestador } from 'src/app/exports/interface/prestador';
import { ActivatedRoute } from '@angular/router';

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
  //prestador!: Prestador;
  servicosPagina: any;
  mostrarDialog: boolean = false;


  //prestador temporário para testes
  prestador: any = {
      nome: 'Roberto Carlos',
      cpfCnpj: '06004122106',
      contato: {
        telefone: '40028922',
        email: 'daniloRuimNoLol@gmail.com'
      },
      endereco: {
        cidade: 'Maragoji'
      }
    }

  constructor(private servico: BaseServiceService, private route: ActivatedRoute) {
    servico.getPrestador(parseInt(route.snapshot.paramMap.get('id')!)).subscribe({
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
          this.servicos = a.data.content;
          this.servicosPagina = this.servicos.slice(0, 5);
          console.log(this.servicosPagina)
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
