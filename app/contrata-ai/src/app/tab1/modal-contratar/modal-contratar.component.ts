import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { Prestador } from 'src/app/model/prestador';
import { Response } from 'src/app/model/response';
import { ServicoPrestadoDto } from 'src/app/model/servico-prestado-dto';
import { PrestadorService } from 'src/app/services/prestador.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-modal-contratar',
  templateUrl: './modal-contratar.component.html',
  styleUrls: ['./modal-contratar.component.scss'],
})
export class ModalContratarComponent implements OnInit {
  @Input() servico!: ServicoPrestadoDto;

  prestador!: Prestador;
  messageService: MessageService;
  constructor(
    private modalController: ModalController,
    private prestadorService: PrestadorService,
    private usuarioService: UsuarioService
  ) {
    this.messageService = this.usuarioService.messageService;
  }

  async ngOnInit() {
    this.usuarioService.findByToken().then((resp: any) => {
      console.log(resp);
    });
    console.log(this.usuarioService.token);
  }

  contratar() {
    alert('contratação ainda não implementada!');
    return;
  }
  cancelar() {
    this.modalController.dismiss();
  }
}
