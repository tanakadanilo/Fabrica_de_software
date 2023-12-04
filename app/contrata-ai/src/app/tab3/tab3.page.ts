import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../services/servico.service';
import { Servico } from '../model/servico';
import { AlertController } from '@ionic/angular';
import { PropostaContratacao } from '../model/proposta-contratacao';
import { UsuarioService } from '../services/usuario.service';
import { ServicoPrestado } from '../model/servico-prestado';
import { PrestadorService } from '../services/prestador.service';
import { ServicoPrestadoDto } from '../model/servico-prestado-dto';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  servicosNoCarrinho: ServicoPrestadoDto[] = [];
  valorTotal: number = 0.0;
  constructor(
    private servicoService: ServicoService,
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    private prestadorService: PrestadorService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.servicosNoCarrinho = this.servicoService.servicosNoCarrinho;
    this.valorTotal = 0.0;
  }

  ionViewWillEnter() {
    this.servicosNoCarrinho = this.servicoService.servicosNoCarrinho;
    this.valorTotal = 0.0;
    this.servicosNoCarrinho.forEach((servico) => {
      this.valorTotal += servico.valor;
    });
    console.log(this.servicosNoCarrinho);
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

  async contratar() {
    let contratante = this.usuarioService.usuario;
    if (!contratante) {
      const alert = await this.alertController.create({
        header: 'Login',
        message: 'Faça login para continuar',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              this.router.navigate(['/tabs/tab2']);
            },
          },
        ],
      });
      await alert.present();
      return;
    }
    if (this.servicosNoCarrinho.length == 0) {
      const alert = await this.alertController.create({
        header: 'Serviço',
        message: 'Selecione algum serviço para continuar',
        buttons: [
          {
            text: 'Ok',
            role: 'cancel',
            handler: () => {
              this.router.navigate(['/tabs/tab1']);
            },
          },
        ],
      });
      await alert.present();
      return;
    }
    this.servicosNoCarrinho.forEach((dto) => {
      this.servicoService.getServico(dto.id).then((servicoPrestado) => {
        this.prestadorService
          .getPrestador(dto.idPrestador)
          .then((prestador) => {
            let propostaContratacao: PropostaContratacao = {
              contratante: contratante,
              servicoPrestado: servicoPrestado.data,
              prestador: prestador.data,
              dataContratacao: new Date(),
            };
            this.servicoService.contratarServico(propostaContratacao);
          });
      });
    });
    this.servicoService.toastSucess('Serviço(s) contratados com sucesso, as partes receberão um e-mail informativo em breve!');
  }
}
