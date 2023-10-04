import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Uf } from '../enum/uf';
import { Contato } from '../interface/contato';
import { Contratante } from '../interface/contratante';
import { Endereco } from '../interface/endereco';
import { Prestador } from '../interface/prestador';

import { Response } from '../interface/response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseServiceService {
  readonly URL_BACK = 'http://localhost:8080';
  readonly URL_ENVIAR_EMAIL = this.URL_BACK + '/email/enviar';
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

  toPromisse(observable: Observable<Response<any>>): Promise<Response<any>> {
    return new Promise<Response<Contratante>>((resolve, reject?) => {
      observable.subscribe(
        (data) => {
          if (data.erros.length > 0) {
            this.toastError(data.erros);
          }
          resolve(data);
        },
        (error) => {
          if (reject) {
            reject(error);
          } else {
            this.toastError(error);
          }
        }
      );
    });
  }

  toastError(messages: string[]) {
    console.log(messages);
    messages.forEach((message) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
      });
    });
  }

  post(url: string, body?: any) {
    return this.http.post(url, body ? body : new Object());
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
  getContratante(id: number): Promise<Response<Contratante>> {
    return this.toPromisse(
      this.http.get<Response<Contratante>>(this.URL_CONTRATANTE + '/' + id)
    );
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

  enviarEmail(destinatario: string, assunto: string, corpo: string) {
    this.post(
      `${this.URL_ENVIAR_EMAIL}?to=${
        destinatario ? encodeURIComponent(destinatario) : ''
      }&subject=${assunto ? encodeURIComponent(assunto) : ''}&body=${
        corpo ? encodeURIComponent(corpo) : ''
      }`,
      null
    ).subscribe({
      next: (a: any) => {
        if (a.erros?.lenght > 0) {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: '' + a.erros,
          });
        } else {
          console.log(a.data);
          this.messageService.add({
            severity: 'Success',
            summary: 'Email Enviado!',
            detail: '' + a.data,
          });
        }
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
