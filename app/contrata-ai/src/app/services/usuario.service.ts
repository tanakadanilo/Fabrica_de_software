import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Response } from '../model/response';
import { Contratante } from '../model/contratante';
import { Uf } from '../enum/uf';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends BaseService {
  public URL_USUARIO: string = this.URL_BACK + '/login';
  public URL_CONTRATANTE: string = this.URL_BACK + '/contratante';

  token?: string;
  usuario: any;
  constructor(override http: HttpClient, messageService: MessageService) {
    super(http, messageService);
  }

  getUsuarios(): Promise<Response<any>> {
    return this.get<any>(this.URL_USUARIO);
  }

  findByToken(): Promise<Response<any>> {
    return this.get<any>(this.URL_USUARIO + '/findbytoken?token=' + this.token);
  }

  async login(login: Map<string, any>): Promise<void> {
    let url = this.adicionarParametrosRequisicao(
      this.URL_USUARIO + '/login',
      login
    );
    await this.get<any>(url).then((response: Response<any>) => {
      this.get<any>(
        this.URL_USUARIO + '/findbytoken?token=' + response.data
      ).then((response: Response<any>) => {
        this.usuario = response.data.pessoa;
        console.log(response);
      });
    });
  }

  isLogado() {
    return this.token ? true : false;
  }

  getContratanteDesconhecido(): Contratante {
    return {
      nome: 'Unknown User',
      contato: {
        contato: 'Unknown',
        email: 'Unknown@Unknown.com',
        telefone: 'Unknown',
      },
      cpf: 'Unknown',
      endereco: {
        cep: 'Unknown',
        logradouro: 'Unknown',
        numero: 'Unknown',
        cidade: 'Unknown',
        quadra: 'Unknown',
        lote: 'Unknown',
        uf: Uf.AC,
        bairro: 'Unknown',
        complemento: 'Unknown',
      },
      foto: 'Unknown.Unknown',
    };
  }

  getUsuarioVazio(): Usuario {
    return {
      id: undefined,
      password: '',
      username: '',
      nome: '',
      prestador: false,
    };
  }
  getContratanteVazio(): Contratante {
    return {
      id: undefined,
      nome: '',
      contato: {
        contato: '',
        email: '',
        telefone: '',
      },
      cpf: '',
      endereco: {
        cep: '',
        logradouro: '',
        numero: '',
        cidade: '',
        quadra: '',
        lote: '',
        uf: Uf.AM,
        bairro: '',
        complemento: '',
      },
      foto: '',
    };
  }

  async criarUsuario(usuario: Usuario): Promise<Response<Usuario>> {
    if (!usuario) {
      this.toastError(['Informe todos os dados!']);
      throw Error;
    }
    return this.post<Usuario>(this.URL_USUARIO, usuario);
  }

  async criarContratante(contratante: Contratante) {
    if (!contratante) {
      this.toastError(['Informe todos os dados!']);
      return;
    }
    return this.post(this.URL_CONTRATANTE, contratante);
  }
}
