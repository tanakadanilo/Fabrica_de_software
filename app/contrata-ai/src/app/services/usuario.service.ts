import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends BaseService {
  public URL_USUARIO: string = this.URL_BACK + '/login';

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
      });
    });
  }

  isLogado() {
    return this.token ? true : false;
  }
}
