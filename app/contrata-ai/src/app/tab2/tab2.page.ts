import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { ModalCadastroComponent } from './modal-cadastro/modal-cadastro.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  alertController: AlertController;

  usuario: string = '';
  senha: string = '';

  constructor(
    private service: UsuarioService,
    private modalController: ModalController
  ) {
    this.alertController = service.alertController;
  }

  ngOnInit() { }
  login() {
    const login = new Map([
      ['username', this.usuario ? this.usuario : ''],
      ['password', this.senha ? this.senha : ''],
    ]);
    this.service.login(login);
  }
  async cadastrar() {
    const modal = await this.modalController.create({
      component: ModalCadastroComponent,
    });

    return await modal.present();
  }
}
