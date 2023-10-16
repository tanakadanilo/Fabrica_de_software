import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Prestador } from '../model/prestador';
import { MessageService } from 'primeng/api';
import { Page } from '../model/page';
import { Response } from '../model/response';
import { ServicoPrestadoDto } from '../model/servico-prestado-dto';

@Injectable({
  providedIn: 'root',
})
export class PrestadorService extends BaseService {
  public URL_PRESTADOR: string = this.URL_BACK + '/prestador';

  constructor(override http: HttpClient, messageService: MessageService) {
    super(http, messageService);
  }

  getPrestador(id: number): Promise<Response<Prestador>> {
    return this.get<Prestador>(this.URL_PRESTADOR + '/' + id);
  }

  getPrestadores(categoria?: string): Promise<Response<Page<Prestador>>> {
    let params: Map<string, any> = new Map([
      ['categoria', categoria ? categoria : ''],
    ]);

    return this.get<Page<Prestador>>(this.URL_PRESTADOR, params);
  }
  carregarServicosPrestado(
    id: number
  ): Promise<Response<ServicoPrestadoDto[]>> {
    return this.get<ServicoPrestadoDto[]>(
      this.URL_BACK + '/servicoprestado/prestador/' + id
    );
  }
}
