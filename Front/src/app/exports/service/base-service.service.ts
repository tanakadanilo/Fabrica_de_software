import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prestador } from '../interface/prestador';
import { MessageService } from 'primeng/api';
import { Endereco } from '../interface/endereco';
import { Uf } from '../enum/uf';
import { Contratante } from '../interface/contratante';
import { Contato } from '../interface/contato';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BaseServiceService {
  readonly URL_BACK = 'http://localhost:8080';
  readonly URL_SERVICOS = this.URL_BACK + '/servico';
  readonly URL_SERVICOS_PRESTADOS = this.URL_SERVICOS + 'prestado';
  readonly URL_PRESTADOR = this.URL_BACK + '/prestador';
  readonly URL_CONTRATANTE = this.URL_BACK + '/contratante';

  user: any = '';

  messageService: MessageService;

  constructor(
    private http: HttpClient,
    messageService: MessageService,
    private router: Router
  ) {
    this.messageService = messageService;
  }

  get(url: string) {
    return this.http.get(url);
  }
  getServicos() {
    return this.get(this.URL_SERVICOS);
  }
  getPrestador(id: number) {
    return this.get(this.URL_PRESTADOR + '/' + id);
  }
  getContratante(id: number) {
    return this.get(this.URL_CONTRATANTE + '/' + id);
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
    return this.get(this.URL_SERVICOS + '/' + "categorias");
  }
  getContatoVazio() {
    return {
      contato: '',
      email: '',
      telefone: '',
    };
  }
  getEnderecoVazio() {
    return {
      bairro: '',
      cep: '',
      cidade: '',
      complemento: '',
      logradouro: '',
      lote: '',
      numero: '',
      quadra: '',
      uf: Uf.AC,
    };
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
    };
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

  setUser(user: any) {
    this.user = user;
    console.log('loggou coroi');
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
}
