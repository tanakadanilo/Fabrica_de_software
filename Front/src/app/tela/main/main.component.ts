import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Servico } from 'src/app/exports/interface/servico';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { TelaBaseComponent } from 'src/app/exports/tela/tela-base/tela-base.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent extends TelaBaseComponent {
  usuarios: any = [
    {
      nome: 'aaaaaaaaaaaaa',
    },
    {
      nome: 'aaaaaaaaaaaaa',
    },
    {
      nome: 'aaaaaaaaaaaaa',
    },
    {
      nome: 'aaaaaaaaaaaaa',
    },
  ];

  categorias!: string[];

  constructor(override service: BaseServiceService) {
    super(service);
    this.getCategorias();
  }

  // private dividirServicos(servicos: Servico[]) {
  //   let colunas = 5;
  //   let totalLinhas = Math.ceil(servicos.length / colunas);

  //   for (let i = 0; i < totalLinhas; i++) {
  //     this.servicosDivididos[i] = servicos.slice(
  //       i * colunas,
  //       i * colunas + colunas
  //     );
  //   }
  // }
  public getCategorias(): void {
    this.service.getCategorias().subscribe({
      next: (a: any) => {
        if (a.erros?.lenght > 0) {
          this.toastError(a.erros);
        } else {
          console.log(a.data);
          this.categorias = a.data.content;
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }

  contratar(servico: Servico) {
    this.service.navigate('/contratar/' + servico.id);
  }

  teste() {
    this.service.getServicoDetail(2).subscribe((r) => {
      console.log(r);
    });
  }
}
