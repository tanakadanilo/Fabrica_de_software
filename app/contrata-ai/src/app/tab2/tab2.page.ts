import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { ModalCadastroComponent } from './modal-cadastro/modal-cadastro.component';
import { Response } from '../model/response';
import { Router } from '@angular/router';
import { ServicoService } from '../services/servico.service';
import { Contratante } from '../model/contratante';
import { ContratanteService } from '../services/contratante.service';
import { HistoricoServico } from '../model/historico-servico';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  alertController: AlertController;
  isLoggado: boolean = false;
  usuario: string = '';
  senha: string = '';
  contratante?: Contratante;
  historicos!: HistoricoServico[];
  isVisualizarDetalhesHistorico: boolean = false;
  historicoSelecionado!: HistoricoServico;

  constructor(
    private service: UsuarioService,
    private modalController: ModalController,
    private router: Router,
    private servicoService: ServicoService,
    private contratanteService: ContratanteService
  ) {
    this.alertController = service.alertController;
  }

  ngOnInit() {}

  async login() {
    const login = new Map([
      ['username', this.usuario ? this.usuario : ''],
      ['password', this.senha ? this.senha : ''],
    ]);
    const handlerLogin: { [key: string]: any } = (contratante: any) => {
      this.isLoggado = true;
      this.contratante = contratante;
      this.listarHistoricos();
      if (this.servicoService.servicosNoCarrinho.length > 0) {
        this.router.navigate(['/tabs/tab3']);
        return;
      } else {
        this.router.navigate(['/tabs/tab1']);
        return;
      }
    };
    await this.service.login(login, handlerLogin, this);
  }
  async cadastrar() {
    const modal = await this.modalController.create({
      component: ModalCadastroComponent,
    });

    return await modal.present();
  }

  editar() {
    if (!this.contratante?.contato.email) {
      this.service.toastError(['Informe o email!']);
      return;
    }
    this.contratanteService.editar(this.contratante!).then((contratante) => {
      this.contratante = contratante.data;
    });
  }

  confirmarMudancaDadosAcesso() {
    this.service
      .alterarLogin(
        this.contratante!.usuario!.id!,
        this.usuario,
        this.senha,
        this.contratante!.usuario!.prestador
      )
      .then((x) => {
        this.service.toastSucess('Dados alterados com sucesso!');
        this.modalController.dismiss();
      });
  }
  cancelarMudancaDadosAcesso() {
    this.usuario = '';
    this.senha = '';
    this.modalController.dismiss();
  }

  listarHistoricos() {
    this.contratanteService
      .listarHistorico(this.contratante!)
      .then((historicos) => {
        this.historicos = historicos.data;
      });
  }

  fecharModal() {
    this.modalController.dismiss();
  }
  fecharModalDetalhes() {
    this.isVisualizarDetalhesHistorico = false;
  }

  abrirModalDetalhesHistorico(historicoSelecionado: HistoricoServico) {
    this.isVisualizarDetalhesHistorico = true;
    this.historicoSelecionado = historicoSelecionado;
  }

  avaliarServico() {}
}
