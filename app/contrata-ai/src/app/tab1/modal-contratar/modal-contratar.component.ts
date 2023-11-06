import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Prestador } from 'src/app/model/prestador';
import { ServicoPrestadoDto } from 'src/app/model/servico-prestado-dto';
import { ServicoService } from 'src/app/services/servico.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-contratar',
  templateUrl: './modal-contratar.component.html',
  styleUrls: ['./modal-contratar.component.scss'],
})
export class ModalContratarComponent implements OnInit {
  @Input() servico!: ServicoPrestadoDto;
  @Input() modal!: ModalController;

  prestador!: Prestador;
  alertController: AlertController;
  constructor(
    private modalController: ModalController,
    private usuarioService: UsuarioService,
    private servicoService: ServicoService
  ) {
    this.alertController = this.servicoService.alertController;
  }

  async ngOnInit() {
    if (this.usuarioService.token) {
      this.usuarioService.findByToken().then((resp: any) => {
        console.log(resp);
      });
      console.log(this.usuarioService.token);
    }
  }

  async contratar() {
    this.servicoService.adicionarAoCarrinho(this.servico)
    await this.modal.dismiss();
    await this.modalController.dismiss();
    this.servicoService.toastSucess("adicionado ao carrinho!")
  }
  cancelar() {
    this.modalController.dismiss();
  }
}
