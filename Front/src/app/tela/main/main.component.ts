import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Servico } from 'src/app/exports/interface/servico';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  images: string[] = [
    'assets/images/images.jpeg',
    'assets/images/images.jpeg',
    'assets/images/images.jpeg',
    'assets/images/images.jpeg',
    'assets/images/images.jpeg',
    'assets/images/images.jpeg',
    'assets/images/images.jpeg',
    'assets/images/images.jpeg',
    'assets/images/images.jpeg',
    'assets/images/images.jpeg',
  ];
  servicosDivididos: Servico[][] = this.getServicos();
  constructor(private service: BaseServiceService, private router: Router) {}

  private dividirServicos(servicos: Servico[]) {
    let colunas = 3;
    let totalLinhas = Math.ceil(servicos.length / colunas);

    for (let i = 0; i < totalLinhas; i++) {
      this.servicosDivididos[i] = servicos.slice(
        i * colunas,
        i * colunas + colunas
      );
    }
  }
  public getServicos(): Servico[][] {
    this.service.getServicos().subscribe({
      next: (a: any) => {
        if (a.erros?.lenght > 0) {
        } else {
          console.log(a.data);
          this.dividirServicos(a.data);
        }
      },
      error(err) {
        console.log(err);
      },
    });

    return [
      [
        {
          id: 1,
          area: 'área de atuação',
          descricao: 'descricao do servico',
          especialidade: 'especialidade',
        },
      ],
    ];
  }

  contratar(servico: Servico) {
    this.router.navigate(['/contratar/' + servico.id]);
  }
}
