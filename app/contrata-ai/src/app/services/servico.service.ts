import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ServicoService extends BaseService {
  public URL_SERVICOS: string = this.URL_BACK + "/servicos";

  constructor(override http: HttpClient) {
    super(http);
  }

  getServicos() {
    return this.get(this.URL_SERVICOS);
  }

  editarServico(servico: any) {
    return this.put(this.URL_SERVICOS, servico);
  }
}
