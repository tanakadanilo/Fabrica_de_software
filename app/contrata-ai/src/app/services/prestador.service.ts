import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Page } from '../model/page';
import { Prestador } from '../model/prestador';
import { Response } from '../model/response';
import { ServicoPrestadoDto } from '../model/servico-prestado-dto';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class PrestadorService extends BaseService {
  public URL_PRESTADOR: string = this.URL_BACK + '/prestador';

  constructor(override http: HttpClient, alertController: AlertController) {
    super(http, alertController);
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
