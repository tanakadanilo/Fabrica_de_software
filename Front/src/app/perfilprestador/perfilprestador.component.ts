import { Component } from '@angular/core';
import { Prestador } from '../exports/model/prestador';
import { ServiceService } from '../exports/service/service.service';

@Component({
  selector: 'app-perfilprestador',
  templateUrl: './perfilprestador.component.html',
  styleUrls: ['./perfilprestador.component.css']
})
export class PerfilprestadorComponent {

  texto: any = "Qualquer coisa"
  constructor(private service: ServiceService) {}
  p!: Prestador
  editarCampos: boolean = (this.service.usuario) ? this.p.nome == this.service.usuario.nome : false
  async showDialog(servico: any) {
    let contratar: any = await this.service.showDialog(servico);
    if (contratar) {
      this.service.contratarServico(servico).subscribe((response: any) => {
        if (response.erros.lenght > 0) {
          this.service.toastError(response.erros[0]);
          return;
        }
        this.service.toastSucess(
          'Serviço contratado com sucesso! Entraremos em contato por email!'
        );

      })
    }
  }
}
