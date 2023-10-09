import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public URL_BACK: string = 'http://localhost:8080';

  constructor(protected http: HttpClient) {}

  adicionarParametrosRequisicao(url: string, page?: number, size?: number) {
    return url + `?size=${size ? size : '10'}&page=${page ? page : '0'}`;
  }
  get(url: string, size?: number, page?: number) {
    url = this.adicionarParametrosRequisicao(url, page, size);
    return this.http.get(url);
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
}
