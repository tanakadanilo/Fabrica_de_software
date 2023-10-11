import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Prestador } from 'src/app/model/prestador';
import { ServicoPrestadoDto } from 'src/app/model/servico-prestado-dto';
import { PrestadorService } from 'src/app/services/prestador.service';

@Component({
  selector: 'app-modal-prestador',
  templateUrl: './modal-prestador.component.html',
  styleUrls: ['./modal-prestador.component.scss'],
})
export class ModalPrestadorComponent implements OnInit {
  @Input() dados!: Prestador;

  cardList!: ServicoPrestadoDto[];
  prestador!: Prestador;

  name?: string;

  constructor(
    private modalCtrl: ModalController,
    private prestadorService: PrestadorService
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  async ngOnInit() {
    await this.prestadorService
      .carregarServicosPrestado(this.dados.id)
      .then((a) => {
        this.cardList = a.data;
      });
  }
}
