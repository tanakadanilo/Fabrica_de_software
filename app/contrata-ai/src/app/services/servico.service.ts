import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicoService extends BaseService {
  public URL_SERVICOS: string = this.URL_BACK + "/servico";

  constructor(override http: HttpClient) {
    super(http);
  }

  getServicos(categoria:string) {
    return this.http.get<any[]>(this.URL_SERVICOS+"?size=100&nomeCategoria=" +categoria)

  }

  private handleError(error: any): Observable<any> {
    console.error('Ocorreu um erro:', error);
    return throwError(error); // Retorna um Observable com o erro
  }

  editarServico(servico: any) {
    return this.put(this.URL_SERVICOS, servico);
  }

  criarServico(servico: any) {
    return this.post(this.URL_SERVICOS, servico);
  }
}
