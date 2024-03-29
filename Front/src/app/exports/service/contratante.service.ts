import { Contratante } from 'src/app/exports/interface/contratante';
import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { Response } from '../interface/response';
import { Endereco } from '../interface/endereco';
import { Contato } from '../interface/contato';
import { Observable } from 'rxjs';
import { Prestador } from '../interface/prestador';
import { HistoricoServico } from '../interface/historico-servico';
import { StatusServico } from '../enum/status-servico';

@Injectable({
  providedIn: 'root',
})
export class ContratanteService extends BaseServiceService {
  readonly URL_CONTRATANTE = this.URL_BACK + '/contratante';

  constructor(
    protected override http: HttpClient,
    messageService: MessageService,
    protected override router: Router
  ) {
    super(http, messageService, router);
  }

  override toPromisse<T>(
    observable: Observable<Response<any>>
  ): Promise<Response<T>> {
    return super.toPromisse(observable);
  }

  getContratante(id: number): Promise<Response<Contratante>> {
    return this.toPromisse(
      this.http.get<Response<Contratante>>(this.URL_CONTRATANTE + '/' + id)
    );
  }
  getContratanteVazio(): Contratante {
    let endereco: Endereco = this.getEnderecoVazio();
    let contato: Contato = this.getContatoVazio();
    return {
      id: 0,
      nome: '',
      contato: contato,
      cpfCnpj: '',
      endereco: endereco,
      foto: '',
      usuario: { login: '', password: null, username: '', prestador: true },
    };
  }
  cadastrarContratante(Contratante: Contratante) {
    return this.toPromisse(
      this.http.post<Response<Prestador>>(this.URL_CONTRATANTE, Contratante)
    );
  }

  getHistoricoContratante(id: number): Promise<Response<HistoricoServico[]>> {
    return this.toPromisse<HistoricoServico[]>(
      this.http.get<Response<HistoricoServico[]>>(
        this.URL_CONTRATANTE + '/historico/' + id
      )
    );
  }

  mudarStatusHistoricoServico(
    id: number,
    statusServico: string,
  ): Promise<Response<HistoricoServico>> {
    return this.toPromisse<HistoricoServico>(
      this.http.get<Response<HistoricoServico>>(
        this.URL_BACK +
          '/contratar/alterarstatus?id=' +
          id +
          '&status=' +
          statusServico
      )
    );
  }

  alterarContratante(contratante: Contratante) : Promise<Response<Contratante>>{
    return this.toPromisse(
      this.http.put<Response<Contratante>>(this.URL_CONTRATANTE, contratante)
    );
  }
}
