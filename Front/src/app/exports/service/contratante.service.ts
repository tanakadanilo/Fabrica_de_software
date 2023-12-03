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

  override toPromisse(
    observable: Observable<Response<any>>
  ): Promise<Response<Contratante>> {
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
      usuario: { login: '', password: '', username: '', prestador: true },
    };
  }
  cadastrarContratante(Contratante: Contratante) {
    return this.toPromisse(
      this.http.post<Response<Prestador>>(this.URL_CONTRATANTE, Contratante)
    );
  }
}
