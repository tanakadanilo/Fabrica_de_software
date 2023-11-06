import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Page } from '../model/page';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public URL_BACK: string = 'http://localhost:8080';
  public alertController: AlertController;

  constructor(protected http: HttpClient, alertController: AlertController) {
    this.alertController = alertController;
  }

  adicionarParametrosRequisicao(
    url: string,
    params?: Map<string, any>
  ): string {
    if (params && params.size > 0) {
      //  * algum parametro para ser colocado na requisição
      url += '?' + this.mapToQueryString(params);
    }
    return url;
  }

  toPromisse<T>(observable: Observable<Response<any>>): Promise<Response<T>> {
    return new Promise<Response<any>>((resolve, reject?) => {
      observable.subscribe(
        (data) => {
          if (data.erros.length > 0) {
            this.toastError(data.erros);
            return;
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

  toPromissePaginavel<T>(
    observable: Observable<Response<Page<T>>>
  ): Promise<Response<any>> {
    return new Promise<Response<any>>((resolve, reject?) => {
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
  async toast(message: string, header?: string) {
    const alert = await this.alertController.create({
      header: header ? header : 'Sucesso',
      message: message,
      buttons: ['OK']
    });
    return await alert.present();
  }
  async toastError(messages: string[]) {
    console.log(messages);
    messages.forEach((message) => {
      this.toast(message, 'error');
    });
  }
  async toastSucess(message: string) {
    console.log(message);
    await this.toast(message, 'sucess');

  }

  get<T>(url: string, params?: Map<string, any>): Promise<Response<T>> {
    url = this.adicionarParametrosRequisicao(url, params);
    return this.toPromisse<T>(this.http.get<Response<T>>(url));
  }

  post(url: string, obj: any) {
    return this.http.post(url, obj);
  }

  put(url: string, obj: any) {
    return this.http.put(url, obj);
  }

  delete(url: string, obj: any) {
    return this.http.delete(url, obj);
  }

  private mapToQueryString(paramsMap: Map<string, string | number>): string {
    const queryParams = [];
    for (const [key, value] of paramsMap) {
      queryParams.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      );
    }
    return queryParams.join('&');
  }
}
