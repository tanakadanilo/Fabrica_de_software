import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Prestador } from 'src/app/model/prestador';
import { Response } from 'src/app/model/response';
import { ServicoPrestadoDto } from 'src/app/model/servico-prestado-dto';
import { PrestadorService } from 'src/app/services/prestador.service';

@Component({
  selector: 'app-modal-contratar',
  templateUrl: './modal-contratar.component.html',
  styleUrls: ['./modal-contratar.component.scss'],
})
export class ModalContratarComponent implements OnInit {
  @Input() servico!: ServicoPrestadoDto;

  prestador!: Prestador;
  constructor(
    private modalController: ModalController,
    private prestadorService: PrestadorService
  ) {}

  async ngOnInit() {
  }

  contratar() {
    alert("contratação ainda não implementada!");
    return;
  }
  cancelar() {
    this.modalController.dismiss();
  }
}
