import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../services/servico.service';
import { Servico } from '../model/servico';
import { AlertController } from '@ionic/angular';
import { PropostaContratacao } from '../model/proposta-contratacao';
import { UsuarioService } from '../services/usuario.service';
import { ServicoPrestado } from '../model/servico-prestado';
import { PrestadorService } from '../services/prestador.service';
import { ServicoPrestadoDto } from '../model/servico-prestado-dto';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  servicosNoCarrinho: ServicoPrestadoDto[] = [];

  constructor(
    private servicoService: ServicoService,
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    private prestadorService: PrestadorService
  ) {}

  async ngOnInit() {
    this.servicosNoCarrinho = this.servicoService.servicosNoCarrinho;
  }

  ionViewWillEnter() {
    this.servicosNoCarrinho = this.servicoService.servicosNoCarrinho;
  }

  async removerDoCarrinho(servico: ServicoPrestadoDto) {
    this.servicosNoCarrinho = await this.servicoService.retirarDoCarrinho(
      servico
    );
    this.servicoService.toastSucess('removido do carrinho!');
  }

  async mostrarConfirmacao(servico: ServicoPrestadoDto) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza de que deseja excluir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.removerDoCarrinho(servico);
          },
        },
      ],
    });

    await alert.present();
  }

  contratar() {
    let contratante = this.usuarioService.usuario;
    this.servicosNoCarrinho.forEach((dto) => {
      this.servicoService.getServico(dto.id).then((servicoPrestado) => {
        this.prestadorService
          .getPrestador(dto.idPrestador)
          .then((prestador) => {
            let propostaContratacao: PropostaContratacao = {
              contratante: contratante,
              servicoPrestado: servicoPrestado.data,
              prestador: prestador.data,
              dataContratacao: new Date()
            };
            this.servicoService.contratarServico(propostaContratacao);
          });
      });
    });
    this.servicoService.toastSucess('contratado');
  }
}
