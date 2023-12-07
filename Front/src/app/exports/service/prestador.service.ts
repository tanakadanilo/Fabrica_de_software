import { Injectable } from '@angular/core';
import { BaseServiceService } from './base-service.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Prestador } from '../interface/prestador';
import { Endereco } from '../interface/endereco';
import { Contato } from '../interface/contato';
import { Response } from '../interface/response';
import { Observable } from 'rxjs';
import { Paginavel } from '../interface/paginavel';
import { ResponsePaginada } from '../interface/response-paginada';
import { HistoricoServico } from '../interface/historico-servico';

@Injectable({
  providedIn: 'root',
})
export class PrestadorService extends BaseServiceService {
  readonly URL_PRESTADOR = this.URL_BACK + '/prestador';

  constructor(
    protected override http: HttpClient,
    messageService: MessageService,
    protected override router: Router
  ) {
    super(http, messageService, router);
  }

  override toPromissePaginavel(
    observable: Observable<Response<Paginavel<Prestador>>>
  ): Promise<Response<any>> {
    return super.toPromissePaginavel(observable);
  }

  override toPromisse<T>(
    observable: Observable<Response<T>>
  ): Promise<Response<T>> {
    return super.toPromisse(observable);
  }

  override toPromisseList(
    observable: Observable<Response<Prestador[]>>
  ): Promise<Response<Prestador[]>> {
    return super.toPromisse(observable);
  }

  getPrestador(id: number): Promise<Response<Prestador>> {
    return this.toPromisse(
      this.http.get<Response<Prestador>>(this.URL_PRESTADOR + '/' + id)
    );
  }

  getAllPrestador(): Promise<Response<Paginavel<Prestador>>> {
    return this.toPromissePaginavel(
      this.http.get<Response<Paginavel<Prestador>>>(this.URL_PRESTADOR)
    );
  }

  getPrestadorCategoria(
    categoria: string
  ): Promise<Response<Paginavel<Prestador>>> {
    return this.toPromissePaginavel(
      this.http.get<Response<Paginavel<Prestador>>>(
        this.URL_PRESTADOR + '?categoria=' + categoria
      )
    );
  }

  getPrestadorVazio(): Prestador {
    let endereco: Endereco = this.getEnderecoVazio();
    let contato: Contato = this.getContatoVazio();
    return {
      id: 0,
      nome: '',
      contato: contato,
      cpfCnpj: '',
      endereco: endereco,
      foto: '',
      servicosPrestados: [],
      historicoServicosPrestados: '',
      portfolio: '',
      disponibilidades: '',
      descricaoAdicional: '',
      especializacao: '',
      usuario: { login: '', password: null, username: '', prestador: true }
    };
  }

  cadastrarPrestador(prestador: Prestador) {
    return this.toPromisse(
      this.http.post<Response<Prestador>>(this.URL_PRESTADOR, prestador)
    );
  }

  alterarPrestador(prestador: Prestador) : Promise<Response<Prestador>>{
    return this.toPromisse(
      this.http.put<Response<Prestador>>(this.URL_PRESTADOR, prestador)
    );
  }

  getHistoricoPrestador(idPrestador : number): Promise<Response<HistoricoServico[]>> {
    return this.toPromisse<HistoricoServico[]>(
      this.http.get<Response<HistoricoServico[]>>(
        this.URL_PRESTADOR + '/historico?idPrestador=' + idPrestador
      )
    );
  }
}
