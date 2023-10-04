import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Prestador } from '../interface/prestador';
import { Endereco } from '../interface/endereco';
import { Contato } from '../interface/contato';

@Injectable({
  providedIn: 'root',
})
export class PrestadorService extends BaseServiceService {
  readonly URL_PRESTADOR = this.URL_BACK + '/prestador';
  constructor(
    protected override http: HttpClient,
    messageService: MessageService,
    protected override router: Router
  ) {
    super(http, messageService, router);
  }

  getPrestador(id: number) {
    return this.get(this.URL_PRESTADOR + '/' + id);
  }
  getPrestadorVazio(): Prestador {
    let endereco: Endereco = this.getEnderecoVazio();
    let contato: Contato = this.getContatoVazio();
    return {
      id: 0,
      nome: '',
      contato: contato,
      cpfCnpj: '',
      endereco: endereco,
      foto: '',
      servicosPrestados: '',
      historicoServicosPrestados: '',
      portfolio: '',
      disponibilidades: '',
      descricaoAdicional: '',
      especializacao: '',
    };
  }
}
