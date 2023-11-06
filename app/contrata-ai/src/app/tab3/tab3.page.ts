
import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../services/servico.service';
import { Servico } from '../model/servico';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  servicosNoCarrinho: Servico[] = [];

  constructor(private servicoService: ServicoService, private alertController: AlertController) { }

  async ngOnInit() {
    this.servicosNoCarrinho = this.servicoService.servicosNoCarrinho;
  }

  ionViewWillEnter() {
    this.servicosNoCarrinho = this.servicoService.servicosNoCarrinho;
  }

  removerDoCarrinho(servico: Servico) {
    this.servicosNoCarrinho = this.servicoService.retirarDoCarrinho(servico);
  }

  async mostrarConfirmacao(servico: Servico) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza de que deseja excluir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.removerDoCarrinho(servico);
          }
        }
      ]
    });

    await alert.present();
  }
}
