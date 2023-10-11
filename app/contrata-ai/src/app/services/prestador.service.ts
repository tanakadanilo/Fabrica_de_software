import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Prestador } from '../model/prestador';
import { MessageService } from 'primeng/api';
import { Page } from '../model/page';
import { Response } from '../model/response';

@Injectable({
  providedIn: 'root',
})
export class PrestadorService extends BaseService {
  public URL_PRESTADOR: string = this.URL_BACK + '/prestador';

  constructor(override http: HttpClient, messageService: MessageService) {
    super(http, messageService);
  }

  getPrestador(id: number): Promise<Response<Prestador>> {
    return this.get<Response<Prestador>>(this.URL_PRESTADOR + '/' + id);
  }

  getPrestadores(categoria?: string): Promise<Response<Page<Prestador>>> {
    let params: Map<string, any> = new Map([
      ['categoria', categoria ? categoria : ''],
    ]);

    return this.get<Response<Page<Prestador>>>(this.URL_PRESTADOR, params);
  }
}
