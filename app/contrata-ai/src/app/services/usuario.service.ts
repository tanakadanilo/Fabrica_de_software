import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../model/response';
import { BaseService } from './base.service';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends BaseService {
  public URL_USUARIO: string = this.URL_BACK + '/login';

  token?: string;
  usuario: any;
  constructor(override http: HttpClient, alertController: AlertController) {
    super(http, alertController);
  }

  getUsuarios(): Promise<Response<any>> {
    return this.get<any>(this.URL_USUARIO);
  }

  findByToken(): Promise<Response<any>> {
    return this.get<any>(this.URL_USUARIO + '/findbytoken?token=' + this.token);
  }

  async login(
    login: Map<string, any>,
    handler: any,
    master: any
  ): Promise<any> {
    let url = this.adicionarParametrosRequisicao(
      this.URL_USUARIO + '/login',
      login
    );
    await this.get<any>(url).then((response: Response<any>) => {
      this.get<any>(
        this.URL_USUARIO + '/findbytoken?token=' + response.data
      ).then(async (response: Response<any>) => {
        this.usuario = response.data.pessoa;
        const alert = await this.alertController.create({
          header: 'Sucesso',
          message: 'Login bem sucedido',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              handler: handler.call(this, this.usuario),
            },
          ],
        });
        await alert.present();
      });
    });
  }

  isLogado() {
    return this.token ? true : false;
  }

  criarLogin(username: string, password: string, isPrestador: boolean) {
    return this.toPromisse<Response<Usuario>>(
      this.post<Response<Usuario>>(this.URL_USUARIO, {
        username: username,
        password: password,
        prestador: isPrestador,
      })
    );
  }

  alterarLogin(
    id: number,
    username: string,
    password: string,
    isPrestador: boolean
  ) {
    return this.toPromisse<Response<Usuario>>(
      this.post<Response<Usuario>>(this.URL_USUARIO, {
        id: id,
        username: username,
        password: password,
        prestador: isPrestador,
      })
    );
  }
}
