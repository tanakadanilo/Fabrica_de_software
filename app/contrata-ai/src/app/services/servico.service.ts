import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Response } from '../model/response';
import { Servico } from '../model/servico';
import { BaseService } from './base.service';
import { ServicoPrestadoDto } from '../model/servico-prestado-dto';

@Injectable({
  providedIn: 'root',
})
export class ServicoService extends BaseService {
  public URL_SERVICOS: string = this.URL_BACK + '/servico';
  iconeCarrinho: string = 'cart-outline';
  public servicosNoCarrinho: ServicoPrestadoDto[] = [];

  constructor(override http: HttpClient, alertController: AlertController) {
    super(http, alertController);
  }

  getServicos(categoria: string): Promise<Response<any>> {
    categoria = categoria ? categoria : '';
    return this.toPromisse(
      this.http.get<Response<any>>(
        this.URL_SERVICOS + '?size=100&nomeCategoria=' + categoria
      )
    );
  }

  editarServico(servico: any) {
    return this.put(this.URL_SERVICOS, servico);
  }

  criarServico(servico: any) {
    return this.post(this.URL_SERVICOS, servico);
  }

  adicionarAoCarrinho(servico: ServicoPrestadoDto) {
    this.servicosNoCarrinho.push(servico);
    this.iconeCarrinho = 'cart'
  }

  async retirarDoCarrinho(servico: Servico) {
    this.servicosNoCarrinho = this.servicosNoCarrinho.filter((servicoNaLista) => { servicoNaLista.id == servico.id });
    if (this.servicosNoCarrinho.length == 0) {
      this.iconeCarrinho = 'cart-outline'
    }
    return this.servicosNoCarrinho;
  }

}
