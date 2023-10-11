import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../model/response';
import { Page } from '../model/page';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public URL_BACK: string = 'http://localhost:8080';
  messageService: MessageService;

  constructor(protected http: HttpClient, messageService: MessageService) {
    this.messageService = messageService;
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

  get<T>(url: string, params?: Map<string, any>): Promise<Response<any>> {
    url = this.adicionarParametrosRequisicao(url, params);
    return this.toPromisse(this.http.get<Response<T>>(url));
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
