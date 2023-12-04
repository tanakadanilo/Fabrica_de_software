import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { ModalCadastroComponent } from './modal-cadastro/modal-cadastro.component';
import { Response } from '../model/response';
import { Router } from '@angular/router';
import { ServicoService } from '../services/servico.service';

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
    private modalController: ModalController,
    private router: Router,
    private servicoService: ServicoService
  ) {
    this.alertController = service.alertController;
  }

  ngOnInit() {}
  async login() {
    const login = new Map([
      ['username', this.usuario ? this.usuario : ''],
      ['password', this.senha ? this.senha : ''],
    ]);
    const handlerLogin = () => {
      if (this.servicoService.servicosNoCarrinho.length > 0) {
        this.router.navigate(['/tabs/tab3']);
        return;
      } else {
        this.router.navigate(['/tabs/tab1']);
        return;
      }
    };
    this.service.login(login, handlerLogin);
  }
  async cadastrar() {
    const modal = await this.modalController.create({
      component: ModalCadastroComponent,
    });

    return await modal.present();
  }
}
