import { Component } from '@angular/core';
import { Servico } from 'src/app/exports/interface/servico';
import { InputText } from 'primeng/inputtext';
import { BaseServiceService } from 'src/app/exports/service/base-service.service';
import { Prestador } from 'src/app/exports/interface/prestador';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  servicos!: Servico[];
  prestador : Prestador;

  constructor(private servico: BaseServiceService) {
    this.prestador = servico.getPrestadorVazio();
    
    servico.getServicos().subscribe({
      next: (a: any) => {
        if (a.erros?.lenght > 0) {

        } else {
          console.log(a.data);
          this.servicos = (a.data);
        }
      }
      , error(err) {

        console.log(err);

      }
    });
  }

}
