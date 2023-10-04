import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ServicosService extends BaseServiceService {
  readonly URL_SERVICOS = this.URL_BACK + '/servico';
  readonly URL_SERVICOS_PRESTADOS = this.URL_SERVICOS + 'prestado';

  constructor(
    protected override http: HttpClient,
    messageService: MessageService,
    protected override router: Router
  ) {
    super(http, messageService, router);
  }

  getServicos() {
    return this.get(this.URL_SERVICOS);
  }

  getServico(id: number) {
    return this.get(this.URL_SERVICOS + '/' + id);
  }
  getServicoDetail(id: number) {
    return this.get(this.URL_SERVICOS_PRESTADOS + '/detail/' + id);
  }
  getServicoPrestado(id: number) {
    return this.get(this.URL_SERVICOS_PRESTADOS + '/' + id);
  }
  getCategorias() {
    return this.get(this.URL_SERVICOS + '/' + 'categorias');
  }
}
