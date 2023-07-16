import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  readonly URL_BACK = 'http://localhost:8080'
  readonly URL_SERVICOS = this.URL_BACK + "/servico"

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(url);
  }
  getServicos() {
    return this.get(this.URL_SERVICOS);
  }
}
