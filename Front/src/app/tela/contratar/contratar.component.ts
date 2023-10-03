import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';

@Component({
  selector: 'app-contratar',
  templateUrl: './contratar.component.html',
  styleUrls: ['./contratar.component.css'],
})
export class ContratarComponent implements OnInit {
  servico: any = '';

  constructor(
    private service: BaseServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.data['id'];
    this.service.getServicoPrestado(id).subscribe({
      next: (a: any) => {
        if (a.erros?.lenght > 0) {
        } else {
          this.servico = a.data;
          console.log(this.servico);
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }

  abrirPerfilPrestador() {
    this.service.navigate('/perfil/' + this.servico.prestador.id);
  }
}
