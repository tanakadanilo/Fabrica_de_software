import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Prestador } from '../model/prestador';

@Injectable({
  providedIn: 'root',
})
export class PrestadorService extends BaseService {
  public URL_PRESTADOR: string = this.URL_BACK + '/prestador';

  constructor(override http: HttpClient) {
    super(http);
  }

  getPrestador(id: number) {
    return this.http.get<Prestador[]>(this.URL_PRESTADOR + '/' + id);
  }

  getPrestadores() {
    return this.http.get<Prestador[]>(this.URL_PRESTADOR);
  }
}
