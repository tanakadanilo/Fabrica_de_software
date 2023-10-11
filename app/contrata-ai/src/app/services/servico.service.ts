import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { MessageService } from 'primeng/api';
import { Response } from '../model/response';
import { Prestador } from '../model/prestador';

@Injectable({
  providedIn: 'root',
})
export class ServicoService extends BaseService {
  public URL_SERVICOS: string = this.URL_BACK + '/servico';

  constructor(override http: HttpClient, messageService: MessageService) {
    super(http, messageService);
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
}
