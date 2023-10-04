import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Response } from '../interface/response';
import { Servico } from '../interface/servico';
import { Observable } from 'rxjs';
import { Paginavel } from '../interface/paginavel';

@Injectable({
  providedIn: 'root',
})
export class ServicosService extends BaseServiceService {
  readonly URL_SERVICOS = this.URL_BACK + '/servico';
  readonly URL_SERVICOS_PRESTADOS = this.URL_SERVICOS + 'prestado';

  constructor(
    protected override http: HttpClient,
    messageService: MessageService,
    protected override router: Router
  ) {
    super(http, messageService, router);
  }

  override toPromissePaginavel(
    observable: Observable<Response<Paginavel<Servico>>>
  ): Promise<Response<any>> {
    return super.toPromissePaginavel(observable);
  }

  override toPromisse(
    observable: Observable<Response<Servico>>
  ): Promise<Response<Servico>> {
    return super.toPromisse(observable);
  }

  getServicos(): Promise<Response<Paginavel<Servico>>> {
    return this.toPromissePaginavel(
      this.http.get<Response<Paginavel<Servico>>>(this.URL_SERVICOS)
    );
  }

  getServico(id: number): Promise<Response<Servico>> {
    return this.toPromisse(
      this.http.get<Response<Servico>>(this.URL_SERVICOS + '/' + id)
    );
  }
  getServicoDetail(id: number): Promise<Response<Servico>> {
    return this.toPromisse(
      this.http.get<Response<Servico>>(
        this.URL_SERVICOS_PRESTADOS + '/detail/' + id
      )
    );
  }
  getServicoPrestado(id: number): Promise<Response<Servico>> {
    return this.toPromisse(
      this.http.get<Response<Servico>>(this.URL_SERVICOS_PRESTADOS + '/' + id)
    );
  }
  getCategorias(): Promise<Response<Paginavel<string>>> {
    return new Promise<Response<Paginavel<string>>>((resolve, reject?) => {
      this.http
        .get<Response<Paginavel<string>>>(
          this.URL_SERVICOS + '/' + 'categorias'
        )
        .subscribe(
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
}
